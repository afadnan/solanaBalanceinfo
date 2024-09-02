import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create the dots
    const dots = [];
    const numDots = 700;
    const radius = 7;
    const speed = 0.002;

    for (let i = 0; i < numDots; i++) {
      const geometry = new THREE.CircleGeometry(0.02, 5);
      const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const dot = new THREE.Mesh(geometry, material);

      // Initial position in a circle
      dot.angle = Math.random() * Math.PI * 2; // Random initial angle
      dot.distance = Math.random() * radius; // Random distance from the center

      dot.position.x = dot.distance * Math.cos(dot.angle);
      dot.position.y = dot.distance * Math.sin(dot.angle);
      dot.position.z = -2; // Set z position behind the logo

      scene.add(dot);
      dots.push(dot);
    }

    // Load Solana logo texture
    const loader = new THREE.TextureLoader();
    loader.load("/solanalogo.png", (texture) => {
      const logoGeometry = new THREE.PlaneGeometry(2.5, 2.5); // Adjust the size as needed
      const logoMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);

      // Set position for the logo at the top of the screen
      logo.position.set(0, height / window.innerHeight - 0.5, -1); // Adjust y position for top
      scene.add(logo);
    });

    camera.position.z = 1.5;

    const animate = () => {
      requestAnimationFrame(animate);

      // Animate dots in a circular path
      dots.forEach((dot) => {
        dot.angle += speed; // Update angle
        dot.position.x = dot.distance * Math.cos(dot.angle);
        dot.position.y = dot.distance * Math.sin(dot.angle);
      });

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
      style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}
    />
  );
};

export default AnimatedBackground;
