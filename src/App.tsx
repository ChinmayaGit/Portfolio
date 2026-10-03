import React, { useState } from "react";
import { Navbar } from "./components/ui/Navbar";
import { Hero } from "./components/sections/Hero";
import { SystemsNominal } from "./components/sections/SystemsNominal";
import { Footer } from "./components/sections/Footer";
import { ProjectsTabModal } from "./components/modals/ProjectsTabModal";
import { CertificationsTabModal } from "./components/modals/CertificationsTabModal";
import { ContactTabModal } from "./components/modals/ContactTabModal";

export const App: React.FC = () => {
  const [activeModal, setActiveModal] = useState<
    "projects" | "certifications" | "contact" | null
  >(null);

  const handleOpenProjects = () => setActiveModal("projects");
  const handleOpenCertifications = () => setActiveModal("certifications");
  const handleOpenContact = () => setActiveModal("contact");
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#e4e4e7] selection:bg-[#d4a22f] selection:text-black">
      {/* Sleek Top Navigation Bar */}
      <Navbar
        onOpenProjects={handleOpenProjects}
        onOpenCertifications={handleOpenCertifications}
        onOpenContact={handleOpenContact}
      />

      {/* Main Cinematic Scroll Sequence */}
      <main>
        {/* 
          1st page: Chinmaya Garnaik (Telma font, CamelCase) + Full Stack Developer 
          2nd scroll: Cloud Developer 
          3rd scroll: Network Engineer 
        */}
        <Hero />

        {/* 
          Last section: Systems Nominal ("And I... am... Systems Architect") 
          + Docked bottom-right interactive tabs for Projects, Certifications, Contact
        */}
        <SystemsNominal
          onOpenProjects={handleOpenProjects}
          onOpenCertifications={handleOpenCertifications}
          onOpenContact={handleOpenContact}
        />
      </main>

      {/* Minimal Iron Man Footer */}
      <Footer
        onOpenProjects={handleOpenProjects}
        onOpenCertifications={handleOpenCertifications}
        onOpenContact={handleOpenContact}
      />

      {/* Interactive Clean Modals */}
      <ProjectsTabModal
        isOpen={activeModal === "projects"}
        onClose={handleCloseModal}
      />

      <CertificationsTabModal
        isOpen={activeModal === "certifications"}
        onClose={handleCloseModal}
      />

      <ContactTabModal
        isOpen={activeModal === "contact"}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default App;
