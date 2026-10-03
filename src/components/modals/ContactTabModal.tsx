import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Mail,
  Linkedin,
  Github,
  Copy,
  Check,
  Send,
  Radio,
  MapPin,
  Clock,
} from "lucide-react";

interface ContactTabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactTabModal: React.FC<ContactTabModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  if (!isOpen) return null;

  const emailAddress = "chinugarnaiklabs@gmail.com";

  const handleCopy = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${emailAddress}?subject=${encodeURIComponent(
      formData.subject || `Message from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailtoUrl;
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
    }, 2500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-[#101013] border border-white/10 rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] p-6 sm:p-8 z-10 max-h-[90vh] flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-[#d4a22f]/10 border border-[#d4a22f]/20 text-[#d4a22f]">
                <Radio size={20} className="animate-pulse" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  Transmit Message
                </h3>
                <p className="text-xs font-mono text-zinc-400">
                  Open frequency &mdash; direct transmission to Chinmaya Garnaik
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/[0.06] hover:bg-white/[0.12] text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pr-1 py-5 space-y-6 custom-scrollbar">
            {/* Direct Connect Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4a22f] flex items-center gap-1.5">
                    <Mail size={12} />
                    Direct Frequency
                  </span>
                  <button
                    onClick={handleCopy}
                    className="p-1.5 rounded-lg bg-white/[0.05] hover:bg-white/[0.1] text-zinc-400 hover:text-white transition-colors"
                    title="Copy Email"
                  >
                    {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>
                <div>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-sm sm:text-base font-mono font-medium text-white hover:text-[#d4a22f] transition-colors break-all"
                  >
                    {emailAddress}
                  </a>
                  <p className="text-xs text-zinc-400 mt-1">
                    {copied ? "Copied to clipboard!" : "Click to send email or copy address"}
                  </p>
                </div>
              </div>

              {/* Status / Availability Card */}
              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col justify-between gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[#d4a22f] flex items-center gap-1.5">
                    <Clock size={12} />
                    Response Telemetry
                  </span>
                  <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" />
                    ONLINE
                  </span>
                </div>
                <div className="space-y-1 font-mono text-xs text-zinc-400">
                  <div className="flex items-center justify-between">
                    <span>Response Time:</span>
                    <span className="text-white">&lt; 24-48 Hours</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Location:</span>
                    <span className="text-white flex items-center gap-1">
                      <MapPin size={11} /> Bengaluru, IN / Remote
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Network Channels */}
            <div className="flex items-center gap-3">
              <a
                href="https://github.com/Chinmayagarnaik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#d4a22f]/50 flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200"
              >
                <Github size={15} />
                <span>GitHub Archive</span>
              </a>
              <a
                href="https://www.linkedin.com/in/chinmayagarnaik"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-[#d4a22f]/50 flex items-center justify-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition-all duration-200"
              >
                <Linkedin size={15} />
                <span>LinkedIn Profile</span>
              </a>
            </div>

            {/* Quick Dispatch Form */}
            <form onSubmit={handleSubmit} className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    YOUR NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Tony Stark"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                    YOUR EMAIL
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="tony@stark.industries"
                    className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  SUBJECT
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Collaboration / Full Stack Inquiry"
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 mb-1">
                  MESSAGE
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your product, role, or architecture goals..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/10 text-white placeholder-zinc-600 text-xs font-mono focus:outline-none focus:border-[#d4a22f]/60 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={sent}
                className="w-full py-2.5 rounded-xl bg-[#d4a22f] hover:bg-[#e5b33d] text-black font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,162,47,0.3)] transition-all duration-200 active:scale-[0.99] disabled:opacity-50"
              >
                {sent ? (
                  <>
                    <Check size={14} />
                    <span>Dispatched to Mail Client</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>Send Transmission</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-zinc-500">
            <span>SECURE COMMUNICATION CHANNEL</span>
            <span className="text-[#d4a22f]">J.A.R.V.I.S. READY</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
