import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const AnimatedBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Create the scene, camera, and renderer
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

    // Check if the device is mobile or desktop
    const isMobile = window.innerWidth <= 768;

    // Load Solana logo texture based on device type
    const loader = new THREE.TextureLoader();
    const logoTexturePath = isMobile ? "/sol.webp" : "/solanalogo.webp";

    loader.load(logoTexturePath, (texture) => {
      const logoGeometry = new THREE.PlaneGeometry(2.5, 2.5); // Adjust the size as needed
      const logoMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true,
      });
      const logo = new THREE.Mesh(logoGeometry, logoMaterial);

      // Set position for the logo
      if (isMobile) {
        // Center the logo in mobile devices
        logo.position.set(0, 0, -1); // Centered at (0,0) in the scene
      } else {
        logo.position.set(0, height / window.innerHeight - 0.5, -1); // Adjust position for desktop
      }

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

    // Handle window resize
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
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
