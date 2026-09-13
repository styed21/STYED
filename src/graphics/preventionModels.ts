import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type PreventionObjectId = "syringe" | "tablet" | "cannabis" | "powder";

function ceramic(color: number, roughness = 0.58) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.025 });
}

function mesh(
  parent: THREE.Group,
  geometry: THREE.BufferGeometry,
  material: THREE.Material,
  at: [number, number, number] = [0, 0, 0],
) {
  const object = new THREE.Mesh(geometry, material);
  object.position.set(...at);
  object.castShadow = true;
  object.receiveShadow = true;
  parent.add(object);
  return object;
}

function box(
  parent: THREE.Group,
  size: [number, number, number],
  at: [number, number, number],
  material: THREE.Material,
  radius = 0.035,
) {
  return mesh(parent, new RoundedBoxGeometry(...size, 3, radius), material, at);
}

function raisedLine(
  parent: THREE.Group,
  points: THREE.Vector3[],
  radius: number,
  material: THREE.Material,
) {
  return mesh(
    parent,
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(points),
      24,
      radius,
      8,
      false,
    ),
    material,
  );
}

/** Each symbol owns its geometry and can be positioned independently. */
export function createSyringeSymbol() {
  const model = new THREE.Group();
  const body = ceramic(0xe8eee5);
  const sage = ceramic(0x6d8b80);
  const blue = ceramic(0x577593);
  const ink = ceramic(0x3c554e);
  const amber = ceramic(0xc9a76e);
  const steel = ceramic(0x879b9a, 0.28);

  mesh(
    model,
    new THREE.CylinderGeometry(0.235, 0.235, 1.3, 40),
    body,
    [0, 0.07, 0],
  );
  mesh(
    model,
    new THREE.CylinderGeometry(0.238, 0.238, 0.13, 40),
    sage,
    [0, 0.67, 0],
  );
  mesh(
    model,
    new THREE.CylinderGeometry(0.2, 0.17, 0.27, 40),
    amber,
    [0, -0.48, 0],
  );
  mesh(
    model,
    new THREE.CylinderGeometry(0.11, 0.06, 0.24, 24),
    sage,
    [0, -0.69, 0],
  );
  mesh(
    model,
    new THREE.CylinderGeometry(0.018, 0.008, 0.57, 12),
    steel,
    [0, -1.08, 0],
  );
  mesh(
    model,
    new THREE.ConeGeometry(0.01, 0.12, 8),
    steel,
    [0, -1.42, 0],
  ).rotation.z = Math.PI;
  box(model, [0.135, 0.54, 0.13], [0, 0.99, 0], sage, 0.02);
  box(model, [0.63, 0.12, 0.29], [0, 1.28, 0], blue, 0.05);
  box(model, [0.74, 0.1, 0.27], [0, 0.72, 0], body, 0.03);
  // Raised graduation marks stay on the front of the barrel.
  for (let row = 0; row < 6; row++) {
    box(
      model,
      [row % 2 ? 0.1 : 0.17, 0.022, 0.025],
      [-0.026, 0.45 - row * 0.15, 0.238],
      ink,
      0.005,
    );
  }
  model.rotation.z = -0.44;
  return model;
}

export function createTabletSymbol() {
  const model = new THREE.Group();
  const face = ceramic(0xf6f1df, 0.66);
  const rim = ceramic(0xb7c7ba);
  // Separate bevelled halves form a real recessed score instead of a painted stripe.
  for (const side of [-1, 1]) {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.88);
    shape.absarc(0, 0, 0.88, -Math.PI / 2, Math.PI / 2, false);
    shape.lineTo(0, -0.88);
    const half = mesh(
      model,
      new THREE.ExtrudeGeometry(shape, {
        depth: 0.28,
        bevelEnabled: true,
        bevelSize: 0.055,
        bevelThickness: 0.055,
        bevelSegments: 4,
        curveSegments: 36,
      }),
      face,
      [side * 0.065, 0, -0.14],
    );
    half.rotation.z = side === -1 ? Math.PI : 0;
  }
  const backing = mesh(
    model,
    new THREE.CylinderGeometry(0.9, 0.9, 0.14, 64),
    rim,
    [0, 0, -0.17],
  );
  backing.rotation.x = Math.PI / 2;
  model.rotation.set(0.15, -0.2, -0.5);
  model.scale.setScalar(1.18);
  return model;
}

function serratedLeaf(length: number, width: number) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0);
  for (let tooth = 1; tooth <= 7; tooth++) {
    const progress = tooth / 8;
    const spread = Math.sin(progress * Math.PI) * width;
    shape.lineTo(-spread * 0.58, length * (progress - 0.065));
    shape.lineTo(-spread, length * progress);
  }
  shape.lineTo(0, length);
  for (let tooth = 7; tooth >= 1; tooth--) {
    const progress = tooth / 8;
    const spread = Math.sin(progress * Math.PI) * width;
    shape.lineTo(spread, length * progress);
    shape.lineTo(spread * 0.58, length * (progress - 0.065));
  }
  shape.closePath();
  return shape;
}

export function createCannabisSymbol() {
  const model = new THREE.Group();
  const greens = [ceramic(0x7c9265), ceramic(0x8d9f71), ceramic(0x6b855c)];
  const vein = ceramic(0xb3bb89);
  const stem = ceramic(0x526d4c);
  const palm = new THREE.Group();
  palm.position.y = -0.75;
  model.add(palm);
  const angles = [-1.15, -0.78, -0.4, 0, 0.4, 0.78, 1.15];
  const lengths = [0.85, 1.34, 1.78, 2.12, 1.78, 1.34, 0.85];
  angles.forEach((angle, index) => {
    const leaf = new THREE.Group();
    leaf.rotation.z = angle;
    leaf.position.z = (3 - Math.abs(3 - index)) * 0.025;
    palm.add(leaf);
    mesh(
      leaf,
      new THREE.ExtrudeGeometry(
        serratedLeaf(lengths[index], lengths[index] * 0.135),
        {
          depth: 0.075,
          bevelEnabled: true,
          bevelSize: 0.012,
          bevelThickness: 0.018,
          bevelSegments: 2,
        },
      ),
      greens[index % greens.length],
    );
    raisedLine(
      leaf,
      [
        new THREE.Vector3(0, 0.03, 0.11),
        new THREE.Vector3(0, lengths[index] * 0.48, 0.115),
        new THREE.Vector3(0, lengths[index] * 0.93, 0.1),
      ],
      0.012,
      vein,
    );
  });
  raisedLine(
    model,
    [
      new THREE.Vector3(-0.05, -1.25, 0),
      new THREE.Vector3(0, -0.8, 0.03),
      new THREE.Vector3(0, -0.38, 0.12),
    ],
    0.035,
    stem,
  );
  model.rotation.set(-0.06, -0.16, 0.1);
  return model;
}

export function createPowderSymbol() {
  const model = new THREE.Group();
  const powder = ceramic(0xf2eee2, 0.96);
  const light = ceramic(0xfbf7ec, 0.98);
  const plate = ceramic(0x8ca29a, 0.7);
  const rim = ceramic(0xbac8bc, 0.65);
  const dish = mesh(
    model,
    new THREE.CylinderGeometry(1.17, 1.08, 0.12, 64),
    plate,
    [0, -0.5, 0],
  );
  dish.receiveShadow = true;
  const lip = mesh(
    model,
    new THREE.TorusGeometry(1.1, 0.055, 12, 64),
    rim,
    [0, -0.43, 0],
  );
  lip.rotation.x = Math.PI / 2;
  const mound = mesh(
    model,
    new THREE.ConeGeometry(0.77, 0.65, 32),
    powder,
    [-0.12, -0.095, 0],
  );
  mound.scale.z = 0.88;
  // Instanced grains make a textured mound with one draw call.
  const grainCount = 260;
  const grains = new THREE.InstancedMesh(
    new THREE.IcosahedronGeometry(0.045, 0),
    light,
    grainCount,
  );
  const transform = new THREE.Object3D();
  for (let i = 0; i < grainCount; i++) {
    const angle = i * 2.399963;
    const radius = Math.sqrt((i + 0.5) / grainCount) * 0.78;
    const x = Math.cos(angle) * radius - 0.12;
    const z = Math.sin(angle) * radius * 0.88;
    const y = -0.4 + Math.max(0, 1 - radius / 0.8) * 0.67;
    transform.position.set(x, y, z);
    transform.rotation.set(i * 0.3, i * 0.6, i * 0.7);
    transform.scale.setScalar(0.6 + (i % 5) * 0.12);
    transform.updateMatrix();
    grains.setMatrixAt(i, transform.matrix);
  }
  model.add(grains);
  for (let i = 0; i < 12; i++) {
    const angle = i * 2.399963;
    mesh(
      model,
      new THREE.IcosahedronGeometry(0.022 + (i % 3) * 0.012, 0),
      light,
      [
        Math.cos(angle) * (0.83 + (i % 3) * 0.065),
        -0.39,
        Math.sin(angle) * 0.9,
      ],
    );
  }
  model.rotation.x = 0.3;
  model.position.y = 0.05;
  return model;
}

export const preventionModelBuilders = {
  syringe: createSyringeSymbol,
  tablet: createTabletSymbol,
  cannabis: createCannabisSymbol,
  powder: createPowderSymbol,
} satisfies Record<PreventionObjectId, () => THREE.Group>;
