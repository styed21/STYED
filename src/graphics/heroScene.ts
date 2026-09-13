import {
  WebGLRenderer,
  Scene,
  OrthographicCamera,
  PlaneGeometry,
  ShaderMaterial,
  Mesh,
  TextureLoader,
  SRGBColorSpace,
  Vector2,
} from "three";
import { gsap } from "../hooks/useMotion";

export type HeroScene = {
  select: (index: number) => void;
  setPlaying: (playing: boolean) => void;
  dispose: () => void;
};

/** A GSAP-driven, texture-displacement dissolve. Renders on change, not in an idle loop. */
export async function createHeroScene(
  host: HTMLElement,
  urls: string[],
  initial: number,
  onAvailable: (available: boolean) => void,
): Promise<HeroScene> {
  const loader = new TextureLoader();
  const loaded = await Promise.allSettled(
    urls.map((url) => loader.loadAsync(url)),
  );
  if (loaded.some((result) => result.status === "rejected")) {
    loaded.forEach((result) => {
      if (result.status === "fulfilled") result.value.dispose();
    });
    throw new Error("Hero textures unavailable");
  }
  const textures = loaded.map(
    (result) =>
      (
        result as PromiseFulfilledResult<
          Awaited<ReturnType<typeof loader.loadAsync>>
        >
      ).value,
  );
  textures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace;
  });
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
  } catch (error) {
    textures.forEach((texture) => texture.dispose());
    throw error;
  }
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.domElement.setAttribute("aria-hidden", "true");
  host.append(renderer.domElement);
  const scene = new Scene(),
    camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const aspect = (index: number) =>
    textures[index].image.width / textures[index].image.height;
  const uniforms = {
    uFrom: { value: textures[initial] },
    uTo: { value: textures[initial] },
    uFromAspect: { value: aspect(initial) },
    uToAspect: { value: aspect(initial) },
    uAspect: { value: 1 },
    uProgress: { value: 0 },
    uScroll: { value: 0 },
    uDrift: { value: 0 },
    uPointer: { value: new Vector2() },
  };
  const material = new ShaderMaterial({
    uniforms,
    vertexShader: `varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position.xy,0.,1.);}`,
    fragmentShader: `precision highp float;
      varying vec2 vUv; uniform sampler2D uFrom,uTo; uniform float uFromAspect,uToAspect,uAspect,uProgress,uScroll,uDrift; uniform vec2 uPointer;
      vec2 cover(vec2 uv,float ratio){vec2 fit=vec2(min(uAspect/ratio,1.),min(ratio/uAspect,1.));return (uv-.5)*fit+.5;}
      void main(){
        float p=uProgress; float strength=sin(p*3.14159265)*.055;
        vec2 uv=(vUv-.5)/(1.04+uDrift*.025+uScroll*.035)+.5;
        uv+=vec2(uPointer.x*.002,uPointer.y*.002+uScroll*.028);
        float wave=sin(vUv.x*9.+vUv.y*5.+p*3.)*.045+sin(vUv.x*21.-vUv.y*12.)*.012;
        float edge=p*1.4-.2; float blend=1.-smoothstep(edge-.12,edge+.12,vUv.y+wave*sin(p*3.14159265));
        vec2 displacement=vec2(sin(vUv.y*9.+p*4.)*strength,strength*.4);
        vec4 fromColor=texture2D(uFrom,cover(uv+displacement*p,uFromAspect));
        vec4 toColor=texture2D(uTo,cover(uv-displacement*(1.-p),uToAspect));
        gl_FragColor=mix(fromColor,toColor,blend);
        #include <colorspace_fragment>
      }`,
    depthTest: false,
    depthWrite: false,
  });
  const geometry = new PlaneGeometry(2, 2);
  scene.add(new Mesh(geometry, material));
  let disposed = false,
    current = initial,
    target = initial,
    available = true;
  let transition: gsap.core.Tween | null = null,
    drift: gsap.core.Tween | null = null;
  const draw = () => {
    if (!disposed && available) renderer.render(scene, camera);
  };
  const resize = new ResizeObserver(() => {
    const { width, height } = host.getBoundingClientRect();
    if (width && height) {
      renderer.setSize(width, height, false);
      uniforms.uAspect.value = width / height;
      draw();
    }
  });
  resize.observe(host);
  const scroll = gsap.to(uniforms.uScroll, {
    value: 1,
    ease: "none",
    onUpdate: draw,
    scrollTrigger: {
      trigger: host.closest(".hero"),
      start: "top top",
      end: "bottom top",
      scrub: 0.4,
    },
  });
  const pointer = (event: PointerEvent) => {
    const r = host.getBoundingClientRect();
    uniforms.uPointer.value.set(
      (event.clientX - r.left) / r.width - 0.5,
      (event.clientY - r.top) / r.height - 0.5,
    );
    draw();
  };
  const surface = host.closest<HTMLElement>(".hero")!;
  surface.addEventListener("pointermove", pointer, { passive: true });
  const lost = (event: Event) => {
    event.preventDefault();
    available = false;
    onAvailable(false);
  };
  const restored = () => {
    available = true;
    draw();
    onAvailable(true);
  };
  renderer.domElement.addEventListener("webglcontextlost", lost);
  renderer.domElement.addEventListener("webglcontextrestored", restored);
  const moveDrift = () => {
    drift?.kill();
    uniforms.uDrift.value = 0;
    drift = gsap.to(uniforms.uDrift, {
      value: 1,
      duration: 7.2,
      ease: "none",
      onUpdate: draw,
    });
  };
  moveDrift();
  draw();
  return {
    select(index) {
      if (disposed || index === target) return;
      transition?.kill();
      current = target;
      target = index;
      uniforms.uFrom.value = textures[current];
      uniforms.uTo.value = textures[target];
      uniforms.uFromAspect.value = aspect(current);
      uniforms.uToAspect.value = aspect(target);
      uniforms.uProgress.value = 0;
      transition = gsap.to(uniforms.uProgress, {
        value: 1,
        duration: 1.5,
        ease: "power2.inOut",
        onUpdate: draw,
        onComplete: () => {
          current = target;
        },
      });
      moveDrift();
    },
    setPlaying(playing) {
      drift?.paused(!playing);
    },
    dispose() {
      disposed = true;
      transition?.kill();
      drift?.kill();
      scroll.scrollTrigger?.kill();
      scroll.kill();
      resize.disconnect();
      surface.removeEventListener("pointermove", pointer);
      renderer.domElement.removeEventListener("webglcontextlost", lost);
      renderer.domElement.removeEventListener("webglcontextrestored", restored);
      textures.forEach((t) => t.dispose());
      material.dispose();
      geometry.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    },
  };
}
