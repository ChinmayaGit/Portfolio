import React, { useState } from "react";
import { SystemLoadingScreen } from "./components/SystemLoadingScreen";
import { Navbar } from "./components/ui/Navbar";
import { Phase1Intro } from "./components/sections/Phase1Intro";
import { Phase2AI } from "./components/sections/Phase2AI";
import { Phase3Network } from "./components/sections/Phase3Network";
import { Phase4Cloud } from "./components/sections/Phase4Cloud";
import { SystemsNominal } from "./components/sections/SystemsNominal";
import { Footer } from "./components/sections/Footer";
import { ProjectsTabModal } from "./components/modals/ProjectsTabModal";
import { CertificationsTabModal } from "./components/modals/CertificationsTabModal";
import { ContactTabModal } from "./components/modals/ContactTabModal";

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeModal, setActiveModal] = useState<
    "projects" | "certifications" | "contact" | null
  >(null);

  const handleOpenProjects = () => setActiveModal("projects");
  const handleOpenCertifications = () => setActiveModal("certifications");
  const handleOpenContact = () => setActiveModal("contact");
  const handleCloseModal = () => setActiveModal(null);

  return (
    <div className="relative min-h-screen bg-[#0a0a0b] text-[#e4e4e7] selection:bg-[#d4a22f] selection:text-black">
      {/* Global Phase Preloader */}
      {isLoading && (
        <SystemLoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Sleek Top Navigation Bar */}
      <Navbar
        onOpenProjects={handleOpenProjects}
        onOpenCertifications={handleOpenCertifications}
        onOpenContact={handleOpenContact}
      />

      {/* 5-Phase Cinematic Architecture */}
      <main>
        {/* Phase 1: Intro (Full Stack Dev / Chinmaya Garnaik in Telma font) */}
        <Phase1Intro />

        {/* Phase 2: AI (Full-Stack AI Engineer / Agent Systems / Claude & Oracle Certified) */}
        <Phase2AI />

        {/* Phase 3: Network (Network Engineer / Cyber Risk & IAM @ Deloitte / Zero Trust) */}
        <Phase3Network />

        {/* Phase 4: Cloud (Cloud Developer / AWS Solutions Architect / OCI & Azure) */}
        <Phase4Cloud />

        {/* Phase 5: Systems Nominal (Full-Stack & Systems Architect + bottom-right tabs) */}
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
