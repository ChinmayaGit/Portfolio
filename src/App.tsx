import React, { useState } from 'react';
import { ParticleBackground } from './components/ParticleBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryExplorer } from './components/CategoryExplorer';
import { ScrollDomainShowcase } from './components/ScrollDomainShowcase';
import { CertificationsSection } from './components/CertificationsSection';
import { SkillsSection } from './components/SkillsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';
import { ProjectModal } from './components/ProjectModal';
import { TopProgressBar } from './components/TopProgressBar';
import { SystemLoadingScreen } from './components/SystemLoadingScreen';
import { SmoothScrollProvider } from './components/smooth-scroll/SmoothScrollProvider';
import { ElasticStringWave } from './components/3d/ElasticStringWave';
import { StringTuneHUD } from './components/3d/StringTuneHUD';
import { Project, CategoryInfo } from './data/projectsData';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryInfo['id']>('all');

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
        {/* Initial System Boot & Progressing Loading Bar */}
        {isLoading && (
          <SystemLoadingScreen onComplete={() => setIsLoading(false)} />
        )}

        {/* Viewport Top Reading & Scroll Progressing Bar */}
        <TopProgressBar />

        {/* 60 FPS Interactive Particle Constellation Background */}
        <ParticleBackground />

        {/* Navigation */}
        <Navbar onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

        {/* Main Content Sections */}
        <main className="relative z-10">
          <Hero onOpenCommandPalette={() => setCommandPaletteOpen(true)} />

          {/* StringTune Signature Plucked Elastic String Wave */}
          <div className="max-w-7xl mx-auto px-4 -my-4 relative z-20">
            <ElasticStringWave height={80} stringCount={3} />
          </div>

          {/* 3D Holographic Cyber-Core Scroll Showcase with Anime.js Disassembly across 6 Tech Domains */}
          <ScrollDomainShowcase
            onSelectCategory={(catId) => setSelectedCategory(catId)}
            onSelectProject={(project) => setActiveProjectModal(project)}
          />

          {/* Interactive Categorized Project Matrix */}
          <CategoryExplorer
            externalCategory={selectedCategory}
            onCategoryChange={(catId) => setSelectedCategory(catId)}
          />

          <CertificationsSection />
          <SkillsSection />
          <ExperienceSection />
          <ContactSection />
        </main>

        {/* Footer */}
        <Footer />

        {/* StringTune Telemetry & Performance HUD */}
        <StringTuneHUD />

        {/* Global Command Palette (Cmd + K) */}
        <CommandPalette
          isOpen={commandPaletteOpen}
          onClose={() => setCommandPaletteOpen(false)}
          onSelectProject={(project) => setActiveProjectModal(project)}
        />

        {/* Project Deep Dive Modal (from Command Palette) */}
        <ProjectModal
          project={activeProjectModal}
          onClose={() => setActiveProjectModal(null)}
        />
      </div>
    </SmoothScrollProvider>
  );
};

export default App;

