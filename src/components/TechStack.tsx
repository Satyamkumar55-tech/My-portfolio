import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { EffectComposer, N8AO } from "@react-three/postprocessing";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/javascript.webp",
  "/images/html.png",
  "/images/css.png",
  "/images/cpp.png",
  "/images/mysql.webp",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 28, 28);

const spheres = [...Array(30)].map((_, i) => ({
  scale: [0.7, 1, 0.8, 1, 1][Math.floor(Math.random() * 5)],
  materialIndex: i % 5,
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
  isHovered: boolean;
  index: number;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
  isHovered,
  index,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);

  const col = index % 5;
  const row = Math.floor(index / 5);
  const targetPos = useMemo(() => new THREE.Vector3((col - 2) * 3.2, (row - 2.5) * 1.8, 0), [col, row]);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);

    if (isHovered) {
      if (!api.current) return;
      api.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      api.current.setAngvel({ x: 0, y: 0, z: 0 }, true);

      // 1. Calculate target position with floating animation
      const time = _state.clock.getElapsedTime();
      const floatOffset = Math.sin(time * 2 + index) * 0.15;
      const target = targetPos.clone();
      target.y += floatOffset;

      // 2. Mouse magnetic interactive push effect
      const mouseX = (_state.pointer.x * _state.viewport.width) / 2;
      const mouseY = (_state.pointer.y * _state.viewport.height) / 2;
      const mousePos = new THREE.Vector3(mouseX, mouseY, 0);
      const dist = target.distanceTo(mousePos);
      if (dist < 4) {
        const dir = new THREE.Vector3().subVectors(target, mousePos).normalize();
        const pushStrength = (4 - dist) * 0.35;
        target.addScaledVector(dir, pushStrength);
      }

      // Lerp position
      const currentPos = api.current.translation();
      const currentVec = new THREE.Vector3(currentPos.x, currentPos.y, currentPos.z);
      const nextPos = currentVec.lerp(target, 0.1);
      api.current.setTranslation(nextPos, true);

      // Lerp rotation to identity (facing front)
      const currentRot = api.current.rotation();
      const currentQ = new THREE.Quaternion(currentRot.x, currentRot.y, currentRot.z, currentRot.w);
      const targetQ = new THREE.Quaternion(0, 0, 0, 1);
      currentQ.slerp(targetQ, 0.1);
      api.current.setRotation(currentQ, true);
    } else {
      // Original physics/clump pull
      const impulse = vec
        .copy(api.current!.translation())
        .normalize()
        .multiply(
          new THREE.Vector3(
            -50 * delta * scale,
            -150 * delta * scale,
            -50 * delta * scale
          )
        );

      api.current?.applyImpulse(impulse, true);
    }
  });

  return (
    <RigidBody
      linearDamping={0.75}
      angularDamping={0.15}
      friction={0.2}
      position={[r(20), r(20) - 25, r(20) - 10]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} sensor={isHovered} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
        sensor={isHovered}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
  isHovered: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive, isHovered }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    if (isHovered) {
      ref.current?.setNextKinematicTranslation(new THREE.Vector3(100, 100, 100));
      return;
    }
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[2]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = document
        .getElementById("work")!
        .getBoundingClientRect().top;
      setIsActive(scrollY > threshold);
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        const interval = setInterval(() => {
          handleScroll();
        }, 10);
        setTimeout(() => {
          clearInterval(interval);
        }, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 0.3,
          metalness: 0.5,
          roughness: 1,
          clearcoat: 0.1,
        })
    );
  }, []);

  return (
    <div
      className="techstack"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <h2> My Techstack</h2>

      <Canvas
        shadows
        gl={{ alpha: true, stencil: false, depth: false, antialias: false }}
        camera={{ position: [0, 0, 20], fov: 32.5, near: 1, far: 100 }}
        onCreated={(state) => (state.gl.toneMappingExposure = 1.5)}
        className="tech-canvas"
      >
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 20, 25]}
          penumbra={1}
          angle={0.2}
          color="white"
          castShadow
          shadow-mapSize={[512, 512]}
        />
        <directionalLight position={[0, 5, -4]} intensity={2} />
        <Physics gravity={[0, 0, 0]}>
          <Pointer isActive={isActive} isHovered={isHovered} />
          {spheres.map((props, i) => (
            <SphereGeo
              key={i}
              index={i}
              scale={props.scale}
              material={materials[props.materialIndex]}
              isActive={isActive}
              isHovered={isHovered}
            />
          ))}
        </Physics>
        <Environment
          files="/models/char_enviorment.hdr"
          environmentIntensity={0.5}
          environmentRotation={[0, 4, 2]}
        />
        <EffectComposer enableNormalPass={false}>
          <N8AO color="#0f002c" aoRadius={2} intensity={1.15} />
        </EffectComposer>
      </Canvas>
    </div>
  );
};

export default TechStack;
