import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type ServiceScene = {
  select: (index: number) => void;
  setMotion: (enabled: boolean) => void;
  dispose: () => void;
};

/** Four small, original service sculptures share one lazy-loaded renderer. */
export function createServiceScene(host: HTMLElement): ServiceScene {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 40);
  camera.position.set(0, 2.3, 7.6);
  camera.lookAt(0, 0.15, 0);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8c9dbe, 3));
  const key = new THREE.DirectionalLight(0xfff4e7, 4.2);
  key.position.set(4, 7, 5);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xa5c6ff, 2);
  fill.position.set(-4, 3, -2);
  scene.add(fill);

  const blue = new THREE.MeshStandardMaterial({
    color: 0x285bc2,
    roughness: 0.28,
    metalness: 0.12,
  });
  const orange = new THREE.MeshStandardMaterial({
    color: 0xed754a,
    roughness: 0.3,
    metalness: 0.07,
  });
  const white = new THREE.MeshStandardMaterial({
    color: 0xfffdf6,
    roughness: 0.65,
  });
  const pale = new THREE.MeshStandardMaterial({
    color: 0xa8c4e5,
    roughness: 0.32,
    metalness: 0.1,
  });
  const ink = new THREE.MeshStandardMaterial({
    color: 0x234066,
    roughness: 0.4,
  });
  const materials = [blue, orange, white, pale, ink];

  function box(
    group: THREE.Group,
    size: [number, number, number],
    at: [number, number, number],
    material: THREE.Material,
    radius = 0.05,
  ) {
    const mesh = new THREE.Mesh(
      new RoundedBoxGeometry(...size, 3, radius),
      material,
    );
    mesh.position.set(...at);
    group.add(mesh);
    return mesh;
  }
  function sphere(
    group: THREE.Group,
    radius: number,
    at: [number, number, number],
    material: THREE.Material,
  ) {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(radius, 28, 20),
      material,
    );
    mesh.position.set(...at);
    group.add(mesh);
    return mesh;
  }
  function tube(
    group: THREE.Group,
    points: THREE.Vector3[],
    radius: number,
    material: THREE.Material,
  ) {
    const curve = new THREE.CatmullRomCurve3(points);
    const mesh = new THREE.Mesh(
      new THREE.TubeGeometry(curve, 36, radius, 10, false),
      material,
    );
    group.add(mesh);
    return mesh;
  }
  const models = [
    new THREE.Group(),
    new THREE.Group(),
    new THREE.Group(),
    new THREE.Group(),
  ];

  // Open book: two covers, layered paper and a gently turning leaf.
  const book = models[0];
  for (const direction of [-1, 1]) {
    const half = new THREE.Group();
    book.add(half);
    half.rotation.z = direction * -0.12;
    box(half, [1.15, 0.09, 1.6], [direction * 0.57, -0.18, 0], blue);
    box(half, [1.05, 0.16, 1.47], [direction * 0.56, -0.045, 0], white, 0.025);
    for (let row = 0; row < 5; row++)
      box(
        half,
        [0.73 - (row % 2) * 0.12, 0.009, 0.015],
        [direction * 0.54, 0.043, -0.47 + row * 0.18],
        pale,
        0.004,
      );
  }
  const leaf = new THREE.Group();
  book.add(leaf);
  box(leaf, [1.02, 0.018, 1.44], [0.52, 0.09, 0], white, 0.008);
  leaf.rotation.z = 0.2;
  book.rotation.x = 0.35;
  const bookmark = box(
    book,
    [0.14, 0.025, 0.55],
    [0.78, 0.055, 0.7],
    orange,
    0.01,
  );
  bookmark.rotation.x = -0.12;

  // Housing: ceramic house with a clear roof, window and open doorway.
  const house = models[1];
  box(house, [1.6, 1.35, 1.35], [0, -0.05, 0], white, 0.09);
  const roofShape = new THREE.Shape();
  roofShape.moveTo(-1.05, 0.55);
  roofShape.lineTo(0, 1.4);
  roofShape.lineTo(1.05, 0.55);
  roofShape.lineTo(0.83, 0.42);
  roofShape.lineTo(0, 1.06);
  roofShape.lineTo(-0.83, 0.42);
  roofShape.closePath();
  const roof = new THREE.Mesh(
    new THREE.ExtrudeGeometry(roofShape, {
      depth: 1.65,
      bevelEnabled: true,
      bevelThickness: 0.035,
      bevelSize: 0.035,
      bevelSegments: 3,
      steps: 1,
    }),
    blue,
  );
  roof.position.z = -0.82;
  house.add(roof);
  box(house, [0.4, 0.7, 0.06], [0.25, -0.36, 0.7], orange, 0.04);
  box(house, [0.37, 0.36, 0.06], [-0.38, 0.06, 0.7], pale, 0.04);
  box(house, [0.025, 0.35, 0.02], [-0.38, 0.06, 0.74], white, 0.005);
  box(house, [0.35, 0.025, 0.02], [-0.38, 0.06, 0.74], white, 0.005);
  box(house, [2.2, 0.12, 1.9], [0, -0.8, 0], pale, 0.05);
  sphere(house, 0.026, [0.36, -0.34, 0.75], white);

  // Safety: softly bevelled shield with a raised checkmark.
  const shield = models[2];
  const outline = new THREE.Shape();
  outline.moveTo(0, 1.25);
  outline.bezierCurveTo(0.3, 1.03, 0.72, 0.88, 0.95, 0.85);
  outline.lineTo(0.9, -0.1);
  outline.bezierCurveTo(0.78, -0.75, 0.28, -1.03, 0, -1.22);
  outline.bezierCurveTo(-0.28, -1.03, -0.78, -0.75, -0.9, -0.1);
  outline.lineTo(-0.95, 0.85);
  outline.bezierCurveTo(-0.72, 0.88, -0.3, 1.03, 0, 1.25);
  const shieldMesh = new THREE.Mesh(
    new THREE.ExtrudeGeometry(outline, {
      depth: 0.23,
      bevelEnabled: true,
      bevelThickness: 0.12,
      bevelSize: 0.08,
      bevelSegments: 5,
      curveSegments: 24,
    }),
    blue,
  );
  shield.add(shieldMesh);
  tube(
    shield,
    [
      new THREE.Vector3(-0.43, 0.07, 0.41),
      new THREE.Vector3(-0.1, -0.25, 0.41),
      new THREE.Vector3(0.48, 0.4, 0.41),
    ],
    0.09,
    white,
  );
  const safetyRing = new THREE.Mesh(
    new THREE.TorusGeometry(1.5, 0.035, 12, 80),
    orange,
  );
  safetyRing.rotation.set(0.2, 0.4, 0);
  safetyRing.position.z = -0.2;
  shield.add(safetyRing);

  // Belonging: three equal figures connected around a shared table.
  const community = models[3];
  const table = new THREE.Mesh(
    new THREE.CylinderGeometry(0.68, 0.68, 0.1, 48),
    white,
  );
  table.position.y = -0.25;
  community.add(table);
  for (let i = 0; i < 3; i++) {
    const angle = (i * Math.PI * 2) / 3 + Math.PI / 6;
    const x = Math.cos(angle) * 1.02,
      z = Math.sin(angle) * 1.02;
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.22, 0.43, 6, 18),
      [blue, orange, pale][i],
    );
    body.position.set(x, -0.16, z);
    community.add(body);
    sphere(community, 0.245, [x, 0.54, z], [blue, orange, pale][i]);
  }
  const base = new THREE.Mesh(
    new THREE.CylinderGeometry(1.45, 1.52, 0.09, 64),
    pale,
  );
  base.position.y = -0.76;
  community.add(base);

  const stage = new THREE.Group();
  scene.add(stage);
  models.forEach((model, index) => {
    stage.add(model);
    model.visible = index === 0;
  });
  stage.rotation.y = -0.3;
  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.5, 64),
    new THREE.MeshBasicMaterial({
      color: 0xb6c2d5,
      transparent: true,
      opacity: 0.15,
      depthWrite: false,
    }),
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = -1.2;
  shadow.scale.set(1.15, 0.8, 1);
  scene.add(shadow);
  let active = 0,
    motion = true,
    onScreen = true,
    disposed = false;
  let revealStart = 0,
    lastTime = 0,
    elapsed = 0;
  const pointer = new THREE.Vector2();
  const render = (time: number) => {
    if (disposed) return;
    if (lastTime) elapsed += Math.min((time - lastTime) / 1000, 0.04);
    lastTime = time;
    if (motion) {
      stage.rotation.y +=
        (-0.3 +
          pointer.x * 0.24 +
          Math.sin(elapsed * 0.35) * 0.12 -
          stage.rotation.y) *
        0.045;
      stage.rotation.x += (pointer.y * 0.12 - stage.rotation.x) * 0.045;
      stage.position.y = Math.sin(elapsed * 0.85) * 0.055;
      leaf.rotation.z = 0.12 + (Math.sin(elapsed * 0.7) + 1) * 0.2;
      safetyRing.rotation.z = elapsed * 0.08;
    }
    const progress = motion ? Math.min(1, (time - revealStart) / 650) : 1;
    models[active].scale.setScalar(0.8 + 0.2 * (1 - Math.pow(1 - progress, 3)));
    renderer.render(scene, camera);
  };
  function sync() {
    if (disposed) return;
    lastTime = 0;
    renderer.setAnimationLoop(
      motion && onScreen && !document.hidden ? render : null,
    );
    render(performance.now());
  }
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    render(performance.now());
  });
  resize.observe(host);
  const visibility = new IntersectionObserver(([entry]) => {
    onScreen = entry.isIntersecting;
    sync();
  });
  visibility.observe(host);
  const move = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      ((event.clientY - rect.top) / rect.height) * 2 - 1,
    );
  };
  const leave = () => pointer.set(0, 0);
  host.addEventListener("pointermove", move);
  host.addEventListener("pointerleave", leave);
  document.addEventListener("visibilitychange", sync);
  const lost = (event: Event) => {
    event.preventDefault();
    renderer.setAnimationLoop(null);
    host.style.opacity = "0";
    host.closest(".service-panel")?.classList.add("scene-unavailable");
  };
  const restored = () => {
    host.style.opacity = "1";
    host.closest(".service-panel")?.classList.remove("scene-unavailable");
    sync();
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  sync();
  return {
    select(index) {
      active = Math.max(0, Math.min(3, index));
      models.forEach((model, i) => {
        model.visible = i === active;
      });
      revealStart = performance.now();
      sync();
    },
    setMotion(enabled) {
      motion = enabled;
      if (!enabled) {
        stage.rotation.set(0, -0.3, 0);
        stage.position.y = 0;
      }
      sync();
    },
    dispose() {
      disposed = true;
      renderer.setAnimationLoop(null);
      resize.disconnect();
      visibility.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      document.removeEventListener("visibilitychange", sync);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) object.geometry.dispose();
      });
      materials.forEach((material) => material.dispose());
      (shadow.material as THREE.Material).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
