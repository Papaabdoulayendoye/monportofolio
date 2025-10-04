"use client"

import { Github, Linkedin, Mail, ExternalLink, Download, Code2, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import { Navbar } from "@/components/navbar"

const ThreeBackground = dynamic(
  () => import("@/components/three-background").then((mod) => ({ default: mod.ThreeBackground })),
  {
    ssr: false,
    loading: () => null,
  },
)

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    // Hide loading screen after 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    // Track mouse position for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const projects = [
    {
      name: "Banking App",
      url: "https://github.com/Papaabdoulayendoye/banking_jsm",
      tech: ["Next.js", "TypeScript","Tailwind","Shadcn UI","Plaid", "Dwolla"],
      description: "Plateforme bancaire complète avec authentification, gestion de comptes et virements en temps réel.",
      image:
        "https://i.postimg.cc/rs51wndV/Capture-d-cran-2025-10-04-130731.png",
    },
    {
      name: "Threads Clone",
      url: "https://github.com/Papaabdoulayendoye/threads",
      tech: ["Next.js", "MongoDB", "Clerk"],
      description: "Clone de Threads avec commentaires imbriqués, communautés et mises à jour en temps réel.",
      image: "https://github.com/adrianhajdin/threads/assets/151519281/a9cd1088-968b-4b1d-b21a-f5f97d0c202b",
    },
    {
      name: "Shoes App",
      url: "https://github.com/Papaabdoulayendoye/shoes-app",
      tech: ["React-JS", "Vite"],
      description: "E-commerce de sneakers avec CMS headless, panier et paiement Stripe.",
      image: "https://i.postimg.cc/GhJ6bHp0/Capture-d-cran-2025-10-02-162931.png",
    },
    {
      name: "FlaskBlog",
      url: "https://github.com/Papaabdoulayendoye/flaskBlog",
      tech: ["Python", "Flask", "SQLite"],
      description: "Blog classique avec authentification, CRUD d'articles et système de commentaires.",
      image: "https://imgs.search.brave.com/Mlf51wkC-QH-fnN9oFFPK4cYkpHarRvjSu5_Lb-SNAg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kamFu/Z29jZW50cmFsLmNv/bS9tZWRpYS91cGxv/YWRzL3NjcmVlbHkt/MTU1MzgyNDA1MjQ1/My5wbmc",
    },
    {
      name: "Pal API",
      url: "https://github.com/Papaabdoulayendoye/API-Pals",
      tech: ["Spring Boot", "JPA", "MySQL"],
      description: "API REST CRUD pour la gestion d'entités « Pals » avec Spring Boot.",
      image:
        "https://raw.githubusercontent.com/QuickoAbdul/palapi/pal-default/src/main/resources/static/images/swagger-ui.png",
    },
  ]

  const techStack = [
    {
      name: "React",
      color: "#61DAFB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    },
    {
      name: "Vite",
    //   color: "#61DAFB",
      logo: "https://vite.dev/logo.svg",
    },
    {
      name: "TypeScript",
      color: "#3178C6",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    },
    {
      name: "Next.js",
      color: "#FFFFFF",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    },
    {
      name: "Tailwind",
      color: "#06B6D4",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    },
    {
      name: "Node.js",
      color: "#339933",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    },
    {
      name: "Python",
      color: "#3776AB",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    },
    {
      name: "Java",
      color: "#007396",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    },
    {
      name: "Spring",
      color: "#6DB33F",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg",
    },
    {
      name: "Flask",
      color: "#FFFFFF",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg",
    },
    {
      name: "MySQL",
      color: "#4479A1",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg",
    },
    {
      name: "PostgreSQL",
      color: "#4169E1",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    },
    {
      name: "Docker",
      color: "#2496ED",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    },
    {
      name: "Git",
      color: "#F05032",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    },
    {
      name: "MongoDB",
      color: "#47A248",
      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    },
  ]

  return (
    <>
      {/* Loading Screen */}
      {isLoading && (
        <div className="loading-screen">
          <div className="relative">
            {/* Particle explosion effect */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="particle"
                style={{
                  left: "50%",
                  top: "50%",
                  animationDelay: `${i * 0.1}s`,
                  transform: `rotate(${i * 18}deg) translateX(${50 + i * 10}px)`,
                }}
              />
            ))}
            <div className="relative z-10 text-6xl font-bold text-[#06b6d4]">PN</div>
          </div>
        </div>
      )}

      <Navbar />

      <main className="min-h-screen relative overflow-hidden">
        <Suspense fallback={null}>
          <ThreeBackground />
        </Suspense>

        {/* Floating gradient orbs background */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
        </div>

        {/* Hero Section */}
        <section id="hero" className="min-h-screen flex items-center justify-center px-4 py-20 relative">
          <div
            className="max-w-4xl mx-auto text-center space-y-8 parallax"
            style={{
              transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <div className="opacity-0 animate-fade-in-up">
              <h1
                className="text-6xl md:text-8xl font-bold tracking-tight glitch mb-4"
                data-text="Papa Abdoulaye Ndoye"
              >
                Papa Abdoulaye <span className="text-[#06b6d4]">Ndoye</span>
              </h1>
            </div>
            <p className="text-xl md:text-3xl text-muted-foreground max-w-3xl mx-auto opacity-0 animate-fade-in-up delay-200 leading-relaxed">
              Développeur Full-Stack Junior
              <br />
              {/* <span className="text-[#06b6d4]">Recherche stage 6 mois</span> (mars 2026) */}
            </p>
             <div className="flex flex-wrap gap-4 justify-center items-center opacity-0 animate-fade-in-up delay-400">
            {/*
              <Button
                asChild
                size="lg"
                className="bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-[#020617] font-semibold glow-hover text-lg px-8 py-6"
              >
                <a href="/cv-papa-abdoulaye-ndoye.pdf" download aria-label="Télécharger le CV">
                  <Download className="mr-2 h-6 w-6" aria-hidden="true" />
                  Télécharger CV
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-[#06b6d4]/30 hover:bg-[#06b6d4]/10 bg-transparent text-lg px-8 py-6"
              >
                <a
                  href="https://github.com/Papaabdoulayendoye"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visiter le profil GitHub"
                >
                  <Github className="mr-2 h-6 w-6" aria-hidden="true" />
                  GitHub
                </a>
              </Button> */}
            </div>
            {/* <div className="flex items-center justify-center gap-3 opacity-0 animate-fade-in-up delay-600 mt-12">
              <Code2 className="h-5 w-5 text-[#06b6d4]" aria-hidden="true" />
              <p className="text-sm text-muted-foreground">Valenciennes, France</p>
            </div> */}
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-32 px-4 relative">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="text-5xl md:text-7xl font-bold text-center opacity-0 animate-fade-in-up">
              À propos de <span className="text-[#06b6d4]">moi</span>
            </h2>
            <Card className="glass-card p-10 md:p-16 rounded-3xl opacity-0 animate-fade-in-up delay-200 card-3d glow-hover">
              <div className="space-y-8">
                <p className="text-lg md:text-2xl text-muted-foreground leading-relaxed">
                  Développeur passionné avec une expérience dans la création d'applications web et mobiles modernes.
                  Actuellement en Master TNSID à l'Université Polytechnique Hauts-de-France, je me spécialise dans la
                  création de solutions scalables avec des technologies de pointe.
                </p>
                <div className="flex items-center gap-4 text-[#06b6d4]">
                  <Rocket className="h-8 w-8" aria-hidden="true" />
                  <p className="text-xl font-semibold">Prêt à contribuer à des projets innovants</p>
                </div>
              </div>
            </Card>

            <div className="opacity-0 animate-fade-in-up delay-400">
              <h3 className="text-3xl font-bold mb-12 text-[#06b6d4] text-center">Stack Technique</h3>
              <div className="flex flex-wrap gap-6 justify-center items-center max-w-4xl mx-auto">
                {techStack.map((tech, index) => (
                  <div
                    key={tech.name}
                    className="tech-hexagon opacity-0 animate-fade-in"
                    style={{
                      animationDelay: `${0.5 + index * 0.05}s`,
                    }}
                  >
                    <div className="tech-hexagon-inner">
                      <div className="tech-icon">
                        <img
                          src={tech.logo || "/placeholder.svg"}
                          alt={`${tech.name} logo`}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                      <div className="tech-name">{tech.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-32 px-4 relative">
          <div className="max-w-7xl mx-auto space-y-16">
            <h2 className="text-5xl md:text-7xl font-bold text-center opacity-0 animate-fade-in-up">
              Projets <span className="text-[#06b6d4]">Phares</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card
                  key={project.name}
                  className="glass-card p-8 rounded-3xl hover:bg-white/10 transition-all duration-500 opacity-0 animate-fade-in-up group card-3d glow-hover overflow-hidden"
                  style={{
                    animationDelay: `${0.1 + index * 0.1}s`,
                  }}
                >
                  {/* Project preview image */}
                  <div className="mb-6 -mx-8 -mt-8 h-48 overflow-hidden">
                    {project.image ? (
                      <img
                        src={project.image || "/placeholder.svg"}
                        alt={`Aperçu du projet ${project.name}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          // Fallback to gradient if image fails to load
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                          const parent = target.parentElement
                          if (parent) {
                            parent.innerHTML = `
                              <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#06b6d4]/20 to-[#ec4899]/20">
                                <span class="text-2xl font-bold text-[#06b6d4]">${project.name}</span>
                              </div>
                            `
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#06b6d4]/20 to-[#ec4899]/20">
                        <span className="text-2xl font-bold text-[#06b6d4]">{project.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-bold group-hover:text-[#06b6d4] transition-colors">
                        {project.name}
                      </h3>
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-[#06b6d4] transition-colors hover:scale-125 transition-transform duration-300"
                        aria-label={`Voir ${project.name} sur GitHub`}
                      >
                        <ExternalLink className="h-6 w-6" aria-hidden="true" />
                      </a>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-base">{project.description}</p>
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-full bg-[#06b6d4]/10 text-[#06b6d4] text-sm font-medium border border-[#06b6d4]/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-32 px-4 relative">
          <div className="max-w-5xl mx-auto space-y-16">
            <h2 className="text-5xl md:text-7xl font-bold text-center opacity-0 animate-fade-in-up">
              Expérience <span className="text-[#06b6d4]">Professionnelle</span>
            </h2>
            <Card className="glass-card p-10 md:p-16 rounded-3xl opacity-0 animate-fade-in-up delay-200 card-3d glow-hover">
              <div className="space-y-6">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-[#06b6d4]">Stagiaire Développement Web</h3>
                    <p className="text-xl text-muted-foreground mt-2">
                      Sonatel - Direction des Réseaux et Plateformes de Services
                    </p>
                  </div>
                  <span className="text-lg text-muted-foreground">Juillet - Octobre 2023</span>
                </div>
                <ul className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                  <li className="flex items-start gap-3">
                    <span className="text-[#06b6d4] mt-1">▸</span>
                    <span>
                      Application web de monitoring réseau en temps réel (-20% temps de réponse aux incidents)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#06b6d4] mt-1">▸</span>
                    <span>Migration SQL → MongoDB pour améliorer la scalabilité et les performances</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#06b6d4] mt-1">▸</span>
                    <span>Participation à la refonte de l'architecture réseau</span>
                  </li>
                </ul>
              </div>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-32 px-4 relative">
          <div className="max-w-3xl mx-auto space-y-16">
            <h2 className="text-5xl md:text-7xl font-bold text-center opacity-0 animate-fade-in-up">
              Contactez-<span className="text-[#06b6d4]">moi</span>
            </h2>
            <Card className="glass-card p-10 md:p-16 rounded-3xl opacity-0 animate-fade-in-up delay-200 card-3d glow-hover">
              <form action="/api/contact" method="POST" className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium mb-3">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-6 py-4 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-[#06b6d4] transition-all text-lg"
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-6 py-4 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-[#06b6d4] transition-all text-lg"
                    placeholder="votre.email@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-6 py-4 rounded-xl glass-card focus:outline-none focus:ring-2 focus:ring-[#06b6d4] transition-all resize-none text-lg"
                    placeholder="Votre message..."
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-[#06b6d4] hover:bg-[#06b6d4]/90 text-[#020617] font-semibold text-lg py-6 glow-hover"
                >
                  <Mail className="mr-2 h-5 w-5" aria-hidden="true" />
                  Envoyer le message
                </Button>
              </form>
            </Card>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-16 px-4 border-t border-white/10 relative">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <p className="text-muted-foreground text-center md:text-left text-lg">
                © 2025 Papa Abdoulaye Ndoye. Tous droits réservés.
              </p>
              <div className="flex gap-8">
                <a
                  href="https://github.com/Papaabdoulayendoye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#06b6d4] transition-all hover:scale-125"
                  aria-label="Profil GitHub"
                >
                  <Github className="h-7 w-7" aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/papa-abdoulaye-ndoye-56b6b5334/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-[#06b6d4] transition-all hover:scale-125"
                  aria-label="Profil LinkedIn"
                >
                  <Linkedin className="h-7 w-7" aria-hidden="true" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-[#06b6d4] transition-all hover:scale-125"
                  aria-label="Envoyer un email"
                >
                  <Mail className="h-7 w-7" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
