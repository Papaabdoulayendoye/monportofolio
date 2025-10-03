"use client"

import { useEffect, useRef } from "react"
import * as THREE from "three"
import { floatingParticles, wireframeGlobe, setupAccessibilityControls } from "@/utils/three"

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const cleanupFnsRef = useRef<(() => void)[]>([])

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Add wireframe globe
    const globe = wireframeGlobe(2, 32)
    globe.position.set(3, 0, -2)
    scene.add(globe)

    // Add floating particles
    const cleanupParticles = floatingParticles(scene)
    cleanupFnsRef.current.push(cleanupParticles)

    // Setup accessibility controls (ESC to pause)
    const cleanupAccessibility = setupAccessibilityControls()
    cleanupFnsRef.current.push(cleanupAccessibility)

    // Animation loop
    function animate() {
      requestAnimationFrame(animate)
      globe.rotation.y += 0.001
      globe.rotation.x += 0.0005
      renderer.render(scene, camera)
    }
    animate()

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      const width = window.innerWidth
      const height = window.innerHeight
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    })
    resizeObserver.observe(document.body)

    // Cleanup
    return () => {
      resizeObserver.disconnect()
      cleanupFnsRef.current.forEach((fn) => fn())
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      ;(globe as any).dispose?.()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ opacity: 0.4 }}
      aria-hidden="true"
    />
  )
}
