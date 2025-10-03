/**
 * Three.js utility functions for 3D effects and animations
 * Optimized for performance and accessibility
 */

import * as THREE from "three"

// Global animation state for accessibility
let animationsEnabled = true
let activeAnimationFrames: number[] = []

/**
 * Creates floating particles that slowly rise and respawn at the bottom
 * @param scene - The Three.js scene to add particles to
 * @returns Cleanup function to remove particles
 */
export function floatingParticles(scene: THREE.Scene): () => void {
  const particleCount = 200
  const particles: THREE.Points[] = []
  const geometry = new THREE.BufferGeometry()
  const positions = new Float32Array(particleCount * 3)
  const velocities: number[] = []

  // Initialize particle positions and velocities
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20 // x
    positions[i * 3 + 1] = Math.random() * 20 - 10 // y
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20 // z
    velocities.push(Math.random() * 0.02 + 0.01) // upward velocity
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3))

  const material = new THREE.PointsMaterial({
    color: 0x06b6d4, // cyan color
    size: 0.05,
    transparent: true,
    opacity: 0.6,
    blending: THREE.AdditiveBlending,
  })

  const particleSystem = new THREE.Points(geometry, material)
  scene.add(particleSystem)
  particles.push(particleSystem)

  // Animation loop
  function animate() {
    if (!animationsEnabled) return

    const positions = geometry.attributes.position.array as Float32Array

    for (let i = 0; i < particleCount; i++) {
      // Move particle upward
      positions[i * 3 + 1] += velocities[i]

      // Respawn at bottom if out of view
      if (positions[i * 3 + 1] > 10) {
        positions[i * 3 + 1] = -10
        positions[i * 3] = (Math.random() - 0.5) * 20
        positions[i * 3 + 2] = (Math.random() - 0.5) * 20
      }
    }

    geometry.attributes.position.needsUpdate = true
    const frameId = requestAnimationFrame(animate)
    activeAnimationFrames.push(frameId)
  }

  animate()

  // Cleanup function
  return () => {
    scene.remove(particleSystem)
    geometry.dispose()
    material.dispose()
  }
}

/**
 * Adds parallax effect to an object based on mouse movement
 * @param object - The Three.js object to apply parallax to
 * @param intensity - Parallax intensity (default: 0.05)
 * @returns Cleanup function to remove event listener
 */
export function parallaxOnMouse(object: THREE.Object3D, intensity = 0.05): () => void {
  const handleMouseMove = (event: MouseEvent) => {
    if (!animationsEnabled) return

    const x = (event.clientX / window.innerWidth - 0.5) * 2
    const y = (event.clientY / window.innerHeight - 0.5) * 2

    object.rotation.y = x * intensity
    object.rotation.x = -y * intensity
  }

  // Desktop only
  if (window.innerWidth > 768) {
    window.addEventListener("mousemove", handleMouseMove)
  }

  return () => {
    window.removeEventListener("mousemove", handleMouseMove)
  }
}

/**
 * Loads an image as a Three.js texture with CORS proxy if needed
 * @param url - Image URL to load
 * @returns Promise resolving to THREE.Texture
 */
export async function loadImageAsTexture(url: string): Promise<THREE.Texture> {
  return new Promise((resolve, reject) => {
    const loader = new THREE.TextureLoader()

    // Try loading with CORS proxy if direct load fails
    const corsProxy = "https://corsproxy.io/?"

    loader.load(
      url,
      (texture) => {
        resolve(texture)
      },
      undefined,
      () => {
        // Retry with CORS proxy
        loader.load(
          corsProxy + encodeURIComponent(url),
          (texture) => {
            resolve(texture)
          },
          undefined,
          (error) => {
            console.error("[v0] Failed to load texture:", error)
            reject(error)
          },
        )
      },
    )
  })
}

/**
 * Disables all Three.js animations (accessibility feature)
 */
export function disableAnimations(): void {
  animationsEnabled = false
  // Cancel all active animation frames
  activeAnimationFrames.forEach((frameId) => cancelAnimationFrame(frameId))
  activeAnimationFrames = []
}

/**
 * Enables all Three.js animations
 */
export function enableAnimations(): void {
  animationsEnabled = true
}

/**
 * Creates a wireframe globe
 * @param radius - Globe radius (default: 2)
 * @param segments - Number of segments (default: 32)
 * @returns THREE.LineSegments object
 */
export function wireframeGlobe(radius = 2, segments = 32): THREE.LineSegments {
  const geometry = new THREE.SphereGeometry(radius, segments, segments)
  const edges = new THREE.EdgesGeometry(geometry)
  const material = new THREE.LineBasicMaterial({
    color: 0x06b6d4,
    transparent: true,
    opacity: 0.3,
  })

  const globe = new THREE.LineSegments(edges, material)

  // Cleanup helper
  ;(globe as any).dispose = () => {
    geometry.dispose()
    edges.dispose()
    material.dispose()
  }

  return globe
}

/**
 * Checks if animations should be reduced based on user preferences
 */
export function shouldReduceMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

/**
 * Sets up ESC key listener to toggle animations (accessibility)
 */
export function setupAccessibilityControls(): () => void {
  const handleKeyPress = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      if (animationsEnabled) {
        disableAnimations()
        console.log("[v0] Animations paused (ESC pressed)")
      } else {
        enableAnimations()
        console.log("[v0] Animations resumed (ESC pressed)")
      }
    }
  }

  window.addEventListener("keydown", handleKeyPress)

  // Check for reduced motion preference on load
  if (shouldReduceMotion()) {
    disableAnimations()
  }

  return () => {
    window.removeEventListener("keydown", handleKeyPress)
  }
}
