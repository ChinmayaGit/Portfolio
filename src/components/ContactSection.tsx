import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  Copy,
  ExternalLink,
  MessageSquare
} from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('cgarnaik09@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36] text-xs font-mono mb-3 shadow-[0_0_12px_rgba(255,79,54,0.2)]">
          <Mail className="w-3.5 h-3.5" />
          <span className="font-bold">TRANSMISSION CHANNEL</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Let's Build <span className="bg-gradient-to-r from-[#ff4f36] via-[#ffffff] to-[#3687ff] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,79,54,0.4)]">Something Exceptional</span>
        </h2>
        <p className="mt-3 text-slate-300 text-sm sm:text-base">
          Whether you're interested in cloud architecture advisory, enterprise identity security, mobile development, or open-source collaborations.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-5xl mx-auto">
        {/* Left Column: Direct Links & Info */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            {/* LinkedIn Card */}
            <a
              href="https://linkedin.com/in/chinmaya-garnaik-a093a21b5"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] hover:border-[#3687ff] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(54,135,255,0.25)] hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#3687ff]/15 border border-[#3687ff]/30 text-[#3687ff]">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Professional Network</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#3687ff] transition-colors">
                    LinkedIn / chinmaya-garnaik
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#3687ff] transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/ChinmayaGit"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] hover:border-[#ff4f36] backdrop-blur-xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,79,54,0.25)] hover:-translate-y-1 flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36]">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Open Source Ecosystem</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#ff4f36] transition-colors">
                    GitHub / @ChinmayaGit
                  </div>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-[#ff4f36] transition-colors" />
            </a>

            {/* Email Copy Card */}
            <div className="p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] backdrop-blur-xl flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-[#ff4f36]/15 border border-[#ff4f36]/30 text-[#ff4f36]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-400">Direct Email</div>
                  <div className="text-sm font-bold text-white font-mono">
                    cgarnaik09@gmail.com
                  </div>
                </div>
              </div>
              <button
                onClick={handleCopyEmail}
                className="p-2.5 rounded-xl bg-[#101214] hover:bg-[#1c2027] border border-white/[0.1] text-slate-300 hover:text-white transition-colors"
                title="Copy Email"
              >
                {copiedEmail ? <CheckCircle2 className="w-4 h-4 text-[#ff4f36]" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Location / Status Badge */}
          <div className="p-5 rounded-2xl bg-[#14171c] border border-white/[0.08] backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
              <MapPin className="w-4 h-4 text-[#3687ff]" />
              <span>Base of Operations</span>
            </div>
            <div className="text-sm font-semibold text-white">
              Bhubaneswar, Odisha, India
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono text-[#ff4f36] mt-2">
              <span className="w-2 h-2 rounded-full bg-[#ff4f36] animate-pulse" />
              <span>Available for Technical Advisory & Collaboration</span>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-7">
          <div className="p-6 sm:p-8 rounded-2xl bg-[#14171c] border border-white/[0.08] backdrop-blur-xl shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-[#ff4f36]" />
              <span>Send a Direct Message</span>
            </h3>
            <p className="text-xs text-slate-400 mb-6 font-mono">
              Have an idea, project, or career inquiry? Drop a line below.
            </p>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-3"
              >
                <div className="inline-flex p-3 rounded-full bg-[#ff4f36]/15 text-[#ff4f36] border border-[#ff4f36]/30 shadow-[0_0_15px_rgba(255,79,54,0.3)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold text-white">Message Received!</h4>
                <p className="text-xs text-slate-400 max-w-xs mx-auto">
                  Thank you for reaching out. Chinmaya will connect with you promptly.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-4 px-5 py-2 rounded-full bg-[#101214] hover:bg-[#1a1e26] border border-white/[0.1] text-slate-300 hover:text-white text-xs font-mono transition-colors"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101214] border border-white/[0.1] focus:border-[#ff4f36] focus:outline-none focus:ring-1 focus:ring-[#ff4f36] text-xs sm:text-sm text-white placeholder-slate-600 font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@organization.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101214] border border-white/[0.1] focus:border-[#ff4f36] focus:outline-none focus:ring-1 focus:ring-[#ff4f36] text-xs sm:text-sm text-white placeholder-slate-600 font-mono transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your inquiry, project scope, or opportunity..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101214] border border-white/[0.1] focus:border-[#ff4f36] focus:outline-none focus:ring-1 focus:ring-[#ff4f36] text-xs sm:text-sm text-white placeholder-slate-600 font-mono transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#ff4f36] hover:bg-[#ff6852] text-[#101214] font-black text-xs sm:text-sm tracking-wide shadow-[0_0_25px_rgba(255,79,54,0.35)] transition-all hover:scale-[1.01] active:scale-[0.99]"
                >
                  <span>Dispatch Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
