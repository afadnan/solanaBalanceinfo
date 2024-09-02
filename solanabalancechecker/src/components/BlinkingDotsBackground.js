import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const BlinkingDotsBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Set up the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    // Set manual height (for example: 1500px)
    const manualHeight = 1500; // You can adjust this value
    renderer.setSize(window.innerWidth, manualHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Create dots
    const dotCount = 600;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(dotCount * 3);

    for (let i = 0; i < dotCount; i++) {
      positions[i * 3] = Math.random() * 200 - 100;
      positions[i * 3 + 1] = Math.random() * 200 - 100;
      positions[i * 3 + 2] = Math.random() * 200 - 100;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 1,
      sizeAttenuation: true,
    });
    const dots = new THREE.Points(geometry, material);
    scene.add(dots);

    camera.position.z = 110;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      dots.rotation.x += 0.001;
      dots.rotation.y += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "1500px", // Manually set height here
        zIndex: 0,
      }}
    />
  );
};

export default BlinkingDotsBackground;
