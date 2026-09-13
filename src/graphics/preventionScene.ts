import * as THREE from "three";
import { gsap } from "../hooks/useMotion";
import {
  preventionModelBuilders,
  type PreventionObjectId,
} from "./preventionModels";

export type PreventionScene = { dispose: () => void };
export type PreventionViewport = {
  id: PreventionObjectId;
  element: HTMLElement;
};

/** Four independent scenes share a single canvas and WebGL context. */
export function createPreventionScene(
  host: HTMLElement,
  targets: PreventionViewport[],
  availability: (ready: boolean) => void,
): PreventionScene {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.autoClear = false;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);

  const views = targets.map(({ id, element }) => {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1.9, 1.9, 1.9, -1.9, 0.1, 30);
    camera.position.set(
      id === "powder" ? 2.6 : 1.6,
      id === "powder" ? 4.3 : 1.4,
      8,
    );
    camera.lookAt(0, 0, 0);
    scene.add(new THREE.HemisphereLight(0xfffdf4, 0x93a59b, 1.65));
    const key = new THREE.DirectionalLight(0xffeed7, 2.7);
    key.position.set(-3, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc6dbed, 0.9);
    fill.position.set(4, 1, 2);
    scene.add(fill);
    const model = preventionModelBuilders[id]();
    const rig = new THREE.Group();
    rig.add(model);
    scene.add(rig);
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(3.4, 2.1),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: { tint: { value: new THREE.Color(0x667965) } },
        vertexShader: `varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `uniform vec3 tint; varying vec2 vUv;
          void main() { float d = length((vUv - 0.5) * 2.0);
            float falloff = 1.0 - smoothstep(0.12, 0.98, d);
            gl_FragColor = vec4(tint, falloff * falloff * 0.13);
            #include <tonemapping_fragment>
            #include <colorspace_fragment>
          }`,
      }),
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.58;
    ground.receiveShadow = true;
    scene.add(ground);
    return {
      id,
      element,
      scene,
      camera,
      rig,
      ground,
      key,
      motion: { progress: 0 },
      pointer: new THREE.Vector2(),
      tilt: new THREE.Vector2(),
    };
  });

  let disposed = false;
  let lost = false;
  let visible = false;
  let firstFrame = false;
  let elapsed = 0;
  let lastTime = 0;
  let width = 0;
  let height = 0;

  const render = (time: number) => {
    if (disposed || lost || !width || !height) return;
    if (lastTime) elapsed += Math.min((time - lastTime) / 1000, 0.05);
    lastTime = time;
    const parent = host.getBoundingClientRect();
    renderer.setScissorTest(false);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    renderer.setScissorTest(true);
    views.forEach((view, index) => {
      const rect = view.element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = rect.left - parent.left;
      const y = parent.bottom - rect.bottom;
      renderer.setViewport(x, y, rect.width, rect.height);
      renderer.setScissor(x, y, rect.width, rect.height);
      const aspect = rect.width / rect.height;
      view.camera.left = -1.85 * aspect;
      view.camera.right = 1.85 * aspect;
      view.camera.top = 1.85;
      view.camera.bottom = -1.85;
      view.camera.updateProjectionMatrix();
      const progress = view.motion.progress;
      view.tilt.lerp(view.pointer, 0.075);
      // Scroll controls each object's own rotation, lift, and depth.
      view.rig.rotation.y =
        (progress - 0.5) * (index % 2 ? -1.05 : 0.95) + view.tilt.x * 0.17;
      view.rig.rotation.x = (progress - 0.5) * 0.26 + view.tilt.y * 0.1;
      view.rig.rotation.z =
        Math.sin(progress * Math.PI) * (index % 2 ? -0.08 : 0.08);
      view.rig.position.y =
        (0.5 - progress) * 0.32 +
        Math.sin(elapsed * 0.85 + index * 1.4) * 0.032;
      view.rig.position.z = Math.sin(progress * Math.PI) * 0.25;
      view.rig.scale.setScalar(0.92 + Math.sin(progress * Math.PI) * 0.08);
      renderer.render(view.scene, view.camera);
      view.element.dataset.scrollProgress = progress.toFixed(3);
    });
    if (!firstFrame) {
      firstFrame = true;
      availability(true);
    }
  };

  const sync = () => {
    if (disposed) return;
    const running = visible && !document.hidden && !lost;
    host.dataset.motion = running ? "playing" : "paused";
    lastTime = 0;
    renderer.setAnimationLoop(running ? render : null);
    if (running) render(performance.now());
  };

  const resize = new ResizeObserver(() => {
    const rect = host.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    if (visible && !document.hidden) render(performance.now());
  });
  resize.observe(host);
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    sync();
  });
  observer.observe(host);
  const scrolls = views.map((view) =>
    gsap.to(view.motion, {
      progress: 1,
      ease: "none",
      scrollTrigger: {
        trigger: view.element,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.85,
        invalidateOnRefresh: true,
      },
    }),
  );

  const pointerMove = (event: PointerEvent) => {
    if (event.pointerType === "touch") return;
    views.forEach((view) => {
      const rect = view.element.getBoundingClientRect();
      const inside =
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom;
      view.pointer.set(
        inside ? ((event.clientX - rect.left) / rect.width - 0.5) * 2 : 0,
        inside ? ((event.clientY - rect.top) / rect.height - 0.5) * 2 : 0,
      );
    });
  };
  const leave = () => views.forEach((view) => view.pointer.set(0, 0));
  const interaction = host.parentElement!;
  interaction.addEventListener("pointermove", pointerMove);
  interaction.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", sync);
  const contextLost = (event: Event) => {
    event.preventDefault();
    lost = true;
    availability(false);
    sync();
  };
  const contextRestored = () => {
    lost = false;
    firstFrame = false;
    sync();
  };
  renderer.domElement.addEventListener("webglcontextlost", contextLost);
  renderer.domElement.addEventListener("webglcontextrestored", contextRestored);

  return {
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      scrolls.forEach((scroll) => {
        scroll.scrollTrigger?.kill();
        scroll.kill();
      });
      resize.disconnect();
      observer.disconnect();
      interaction.removeEventListener("pointermove", pointerMove);
      interaction.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      renderer.domElement.removeEventListener("webglcontextlost", contextLost);
      renderer.domElement.removeEventListener(
        "webglcontextrestored",
        contextRestored,
      );
      const geometries = new Set<THREE.BufferGeometry>();
      const materials = new Set<THREE.Material>();
      views.forEach(({ scene, element }) => {
        scene.traverse((object) => {
          if (!(object instanceof THREE.Mesh)) return;
          if (object instanceof THREE.InstancedMesh) object.dispose();
          geometries.add(object.geometry);
          (Array.isArray(object.material)
            ? object.material
            : [object.material]
          ).forEach((material) => materials.add(material));
        });
        delete element.dataset.scrollProgress;
      });
      geometries.forEach((geometry) => geometry.dispose());
      materials.forEach((material) => material.dispose());
      renderer.dispose();
      renderer.domElement.remove();
      delete host.dataset.motion;
      delete host.dataset.scrollProgress;
    },
  };
}
