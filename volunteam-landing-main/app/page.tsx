'use client';
import { useState, useEffect, useRef } from 'react'; // Added useRef
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'; // Added Motion Hooks
import Image from 'next/image';
import Link from 'next/link';
import LineDrawAnimation from '../components/LineDrawAnimation';
import Gallery from '../components/Gallery';

export default function VolunteamLanding() {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // NEW FEATURE: MOUSE TRACKING FOR RADAR EFFECT
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // State for Full Page Overlays
  const [activeOverlay, setActiveOverlay] = useState<null | 'contact' | 'privacy' | 'terms' | 'story' | 'faq'>(null);

  // LOGIC PRESERVED
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Terminal Infrastructure Audit",
      status: "Posted",
      cause: "Cyber-Security",
      skills: ["React", "Node.js"]
    },
    {
      id: 2,
      title: "Hidden Draft Project",
      status: "Draft",
      cause: "Internal",
      skills: ["None"]
    }
  ]);
  const [userCount, setUserCount] = useState(0);
  const activeMissions = projects.filter(project => project.status === "Posted");
  useEffect(() => {
    // This ensures "Drafts" never reach the UI

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Handler for Contact Form via Mailto
  const handleContactSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('identity');
    const email = formData.get('contact');
    const message = formData.get('transmission');

    // Add your email inside the quotes below
    const recipient = "";
    const subject = encodeURIComponent(`MISSION INQUIRY: ${name}`);
    const body = encodeURIComponent(`Identity: ${name}\nContact: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  };

  const fadeInUp: any = {
    initial: { y: 30, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "circOut" } }
  };

  return (
    <div className="bg-[#01121C] min-h-screen text-white font-sans selection:bg-[#49C1C7] selection:text-[#01121C] overflow-x-hidden relative">

      {/* BACKGROUND + RADAR FEATURE */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Interactive Spotlight Layer */}
        <motion.div
          style={{
            background: `radial-gradient(800px circle at ${springX}px ${springY}px, rgba(73, 193, 199, 0.12), transparent 70%)`,
          }}
          className="absolute inset-0 z-0"
        />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] brightness-100 contrast-150" />
        {/* Top-left cyan glow */}
        <div className="absolute top-[-15%] left-[-15%] w-[70%] md:w-[45%] h-[50%] bg-[#49C1C7]/[0.12] blur-[150px] rounded-full" />
        {/* Bottom-right gold glow */}
        <div className="absolute bottom-[-15%] right-[-15%] w-[70%] md:w-[45%] h-[50%] bg-[#EEAB40]/[0.08] blur-[150px] rounded-full" />
        {/* Center hero glow */}
        <div className="absolute top-[15%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#49C1C7]/[0.06] blur-[120px] rounded-full" />
        {/* Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#01121C]"
          >
            <LineDrawAnimation onComplete={() => setLoading(false)} />
          </motion.div>
        ) : (
          <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10">

            {/* NAV BAR */}
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-4 md:px-6 ${scrolled ? 'py-2' : 'py-3 md:py-5'}`}>
              <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className={`max-w-6xl mx-auto flex justify-between items-center relative transition-all duration-500 rounded-full border ${scrolled ? 'px-5 py-2.5 bg-[#0B1E2D]/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]' : 'px-6 py-3.5 bg-[#0B1E2D]/40 backdrop-blur-xl border-white/[0.06]'}`}
              >
                <Link href="/" className="flex items-center gap-2.5 group">
                  <motion.img
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    src="/img-removebg-preview.png"
                    alt="Logo"
                    className={`object-contain transition-all duration-500 ${scrolled ? 'w-10 h-10 md:w-11 md:h-11' : 'w-11 h-11 md:w-14 md:h-14'}`}
                  />
                  <span className={`font-black text-white tracking-tight uppercase transition-all duration-500 ${scrolled ? 'text-sm' : 'text-base md:text-lg'}`}>Volunteam</span>
                </Link>

                {/* Centered Nav Links */}
                <div className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
                  {[
                    { label: 'About', action: () => setActiveOverlay('story') },
                    { label: 'Showcase', href: '#showcase' },
                    { label: 'Blog', href: '#blog' },
                    { label: 'FAQ', action: () => setActiveOverlay('faq') },
                  ].map((item) => (
                    item.href ? (
                      <a
                        key={item.label}
                        href={item.href}
                        className="relative px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 group"
                      >
                        {item.label}
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[2px] bg-[#49C1C7] rounded-full transition-all duration-300" />
                      </a>
                    ) : (
                      <button
                        key={item.label}
                        onClick={item.action}
                        className="relative px-4 py-2 text-[11px] font-semibold uppercase tracking-widest text-gray-400 hover:text-white transition-colors duration-300 group"
                      >
                        {item.label}
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-0 group-hover:w-4 h-[2px] bg-[#49C1C7] rounded-full transition-all duration-300" />
                      </button>
                    )
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  {/* Desktop Portal Buttons */}
                  <div className="hidden md:flex items-center gap-2.5">
                    <Link href="/login/volunteer">
                      <button className="border border-[#49C1C7]/20 bg-[#49C1C7]/[0.08] text-[#49C1C7] px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#49C1C7]/20 hover:border-[#49C1C7]/40 hover:shadow-[0_0_20px_rgba(73,193,199,0.15)] transition-all duration-300">
                        Volunteer
                      </button>
                    </Link>
                    <Link href="/login/nonprofit">
                      <button className="bg-white/90 text-[#01121C] px-5 py-2.5 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-[#EEAB40] hover:shadow-[0_0_20px_rgba(238,171,64,0.2)] transition-all duration-300">
                        Nonprofit
                      </button>
                    </Link>
                  </div>

                  {/* Mobile Menu Toggle */}
                  <button
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="md:hidden w-9 h-9 flex items-center justify-center text-white rounded-full hover:bg-white/10 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      {mobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                      )}
                    </svg>
                  </button>
                </div>
              </motion.div>
            </nav>

            {/* MOBILE MENU OVERLAY */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 z-[40] bg-[#01121C]/95 backdrop-blur-2xl flex flex-col justify-center px-10 md:hidden"
                >
                  <div className="space-y-8 flex flex-col">
                    <div className="space-y-2">
                      <span className="text-[#49C1C7] text-[10px] font-black uppercase tracking-[0.3em]">Access Points</span>
                      <Link href="/login/volunteer" onClick={() => setMobileMenuOpen(false)}>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-white hover:text-[#49C1C7] transition-colors">Volunteer</h2>
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <span className="text-[#EEAB40] text-[10px] font-black uppercase tracking-[0.3em]">Organization Gateway</span>
                      <Link href="/login/nonprofit" onClick={() => setMobileMenuOpen(false)}>
                        <h2 className="text-5xl font-black uppercase tracking-tighter text-white hover:text-[#EEAB40] transition-colors">Nonprofit</h2>
                      </Link>
                    </div>

                    <div className="h-px bg-white/10 w-full my-4" />

                    <div className="grid grid-cols-2 gap-4">
                      {['Network', 'Security', 'About'].map((item) => (
                        <Link key={item} href="#" className="text-xs font-black uppercase tracking-widest text-gray-500">
                          {item}
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* HERO SECTION */}
            <section className="relative pt-44 md:pt-52 pb-24 px-6 text-center">
              {/* Hero glow accent */}
              <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#49C1C7]/[0.04] blur-[100px] rounded-full pointer-events-none" />

              <motion.div initial="initial" animate="animate" className="max-w-6xl mx-auto relative">
                <motion.div
                  variants={fadeInUp}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#49C1C7]/30 bg-[#49C1C7]/5 text-[#49C1C7] text-[9px] font-black uppercase tracking-[0.3em] mb-10"
                >
                  <span className="w-1.5 h-1.5 bg-[#49C1C7] rounded-full animate-pulse" />
                  Now Connecting Volunteers Worldwide
                </motion.div>

                <motion.h1 variants={fadeInUp} className="text-4xl md:text-8xl font-black mb-8 leading-[0.92] tracking-tighter uppercase">
                  Where <span className="text-[#EEAB40]">Skills Meet</span> <br />
                  <span className="mt-4 md:mt-6 relative inline-block">
                    <span className="bg-gradient-to-r from-[#49C1C7] to-[#49C1C7]/70 bg-clip-text text-transparent">Purpose</span>
                    <motion.span
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute -bottom-1 md:bottom-2 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-[#49C1C7] to-[#EEAB40] rounded-full origin-left"
                    />
                  </span>
                </motion.h1>

                <motion.p variants={fadeInUp} className="text-gray-400 max-w-2xl mx-auto text-sm md:text-lg mb-12 font-medium">
                  The bridge between <span className="text-white/80">Volunteers</span> and <span className="text-white/80">high-impact nonprofits</span>.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4 mb-16">
                  <Link href="/login/volunteer">
                    <button className="group relative bg-[#49C1C7] text-[#01121C] px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_40px_rgba(73,193,199,0.3)] transition-all duration-300 hover:scale-[1.02]">
                      Start Volunteering
                      <span className="absolute inset-0 rounded-2xl bg-white/0 group-hover:bg-white/10 transition-all" />
                    </button>
                  </Link>
                  <Link href="/login/nonprofit">
                    <button className="border border-white/20 text-white px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:border-[#EEAB40]/50 hover:text-[#EEAB40] hover:shadow-[0_0_30px_rgba(238,171,64,0.1)] transition-all duration-300">
                      Post a Mission
                    </button>
                  </Link>
                </motion.div>

                {/* Stats row */}
                <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-8 md:gap-16">
                  {[
                    { value: '1,200+', label: 'Volunteers' },
                    { value: '340+', label: 'Missions Completed' },
                    { value: '50+', label: 'Nonprofits' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <div className="text-2xl md:text-3xl font-black text-white tracking-tight">{stat.value}</div>
                      <div className="text-[9px] font-black uppercase tracking-widest text-gray-500 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </section>

            {/* PLATFORM SHOWCASE GALLERY */}
            <motion.div id="showcase" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-[100vw] mx-auto mb-32 -mt-10 relative z-20">
              <Gallery />
            </motion.div>

            {/* --- NEW CONTENT SECTIONS --- */}

            {/* PARTNERS / TRUSTED BY */}
            <section className="max-w-7xl mx-auto px-6 py-20 border-t border-white/5 relative z-10">
              <div className="text-center mb-12">
                <h3 className="text-[#49C1C7] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Network Protocols</h3>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-white">Trusted <span className="text-white/20">By</span></h2>
              </div>
              <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Placeholder Partner Logos */}
                <div className="text-xl font-black uppercase tracking-widest">TechForGood</div>
                <div className="text-xl font-black uppercase tracking-widest">Global.Org</div>
                <div className="text-xl font-black uppercase tracking-widest">EcoSys</div>
                <div className="text-xl font-black uppercase tracking-widest">EduCore</div>
              </div>
            </section>

            {/* OUR STORY (Re-designed inline block) */}
            <section className="py-32 relative z-10 bg-white/[0.02] border-y border-white/5">
              <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <h3 className="text-[#EEAB40] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Origin File</h3>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-8 leading-none">
                      The <br /><span className="text-[#49C1C7]">Blueprint</span>
                    </h2>
                    <p className="text-gray-400 font-medium leading-relaxed mb-6 text-lg">
                      Volunteam was engineered to bridge the terminal gap between world-class talent and high-impact social missions. We bypass traditional friction points.
                    </p>
                    <p className="text-gray-500 font-medium leading-relaxed mb-10">
                      A secure, high-performance protocol where any specialized skill meets its highest purpose.
                    </p>
                    <button onClick={() => setActiveOverlay('story')} className="border border-[#49C1C7]/30 bg-[#49C1C7]/5 text-[#49C1C7] px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#49C1C7] hover:text-[#01121C] transition-all">
                      Access Full Story
                    </button>
                  </motion.div>
                  <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="relative h-[400px] rounded-[3rem] border border-white/10 overflow-hidden group">
                    {/* Background Image */}
                    <img src="/blueprint.png" alt="Volunteam collaboration" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-700" />
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#01121C] via-[#01121C]/40 to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8 p-6 bg-[#01121C]/80 backdrop-blur-md rounded-2xl border border-white/10">
                      <div className="text-[10px] font-black text-[#EEAB40] uppercase tracking-widest mb-2">Systems Online</div>
                      <div className="text-white font-medium text-sm">Connecting 1,000+ specialized endpoints globally.</div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* LATEST TRANSMISSIONS (BLOG) */}
            <section id="blog" className="max-w-7xl mx-auto px-6 py-32 relative z-10">
              <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                <div>
                  <h3 className="text-[#49C1C7] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Signal Feeds</h3>
                  <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none">Latest <br />Transmissions</h2>
                </div>
                <button className="text-gray-400 hover:text-white font-black text-[10px] uppercase tracking-widest transition-colors flex items-center gap-2">
                  View All Logs <span className="text-[#EEAB40]">&rarr;</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { tag: "Engineering", title: "Scaling MongoDB for Global Non-Profits", date: "MAR 02, 2026" },
                  { tag: "Impact", title: "How 1 Hour Saved a Literacy Campaign", date: "FEB 28, 2026" },
                  { tag: "Platform Update", title: "Release v.2.4: Encrypted Messaging", date: "FEB 15, 2026" }
                ].map((post, i) => (
                  <motion.div key={i} whileHover={{ y: -10 }} className="group cursor-pointer">
                    <div className="h-48 rounded-3xl border border-white/10 mb-6 relative overflow-hidden">
                      <img
                        src={['/blog-engineering.png', '/blog-impact.png', '/blog-platform.png'][i]}
                        alt={post.title}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#01121C] via-[#01121C]/30 to-transparent z-10" />
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-[9px] font-black text-[#49C1C7] uppercase tracking-widest">{post.tag}</span>
                      <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">{post.date}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white group-hover:text-[#EEAB40] transition-colors leading-snug">{post.title}</h3>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* QUICK CONTACT / FAQ STRIP */}
            <section className="mb-32 relative z-10 px-6">
              <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#01121C] to-[#0B354D]/40 border border-white/10 rounded-[3rem] p-12 md:p-20 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#49C1C7]/10 blur-[100px] rounded-full pointer-events-none" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10 items-center">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">Need <span className="text-[#EEAB40]">Assistance?</span></h2>
                    <p className="text-gray-400 font-medium mb-10 max-w-md">Access our encrypted FAQ database or initialize a direct secure channel with our team.</p>

                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => setActiveOverlay('faq')} className="bg-[#49C1C7] text-[#01121C] px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white transition-all">
                        Access FAQ
                      </button>
                      <button onClick={() => setActiveOverlay('contact')} className="border border-white/20 hover:border-white/50 bg-transparent text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all">
                        Contact Terminal
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-center md:justify-end">
                    <div className="w-48 h-48 border border-[#49C1C7]/30 rounded-full flex items-center justify-center relative spin-slow">
                      <div className="w-32 h-32 border border-[#EEAB40]/30 rounded-full flex items-center justify-center animation-delay-1000">
                        <div className="w-16 h-16 bg-[#49C1C7]/20 rounded-full blur-md animate-pulse" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>            {/* FOOTER */}
            <footer className="bg-[#01121C] border-t border-white/10 text-white pt-20 pb-8 px-6 relative z-10">
              <div className="max-w-7xl mx-auto">
                {/* Top Section — 4 columns */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 mb-16">
                  {/* Brand */}
                  <div className="col-span-2 md:col-span-1">
                    <div className="flex items-center gap-3 mb-4">
                      <img src="/img-removebg-preview.png" alt="Logo" className="w-10 h-10" />
                      <span className="text-base font-black tracking-widest uppercase">VOLUNTEAM</span>
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed mb-6">Where skills meet purpose. Connecting world-class talent with high-impact nonprofits.</p>
                    {/* Social Icons */}
                    <div className="flex items-center gap-4">
                      <Link href="https://instagram.com" target="_blank" className="text-gray-600 hover:text-[#49C1C7] transition-all hover:scale-110">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                      </Link>
                      <Link href="https://twitter.com" target="_blank" className="text-gray-600 hover:text-[#49C1C7] transition-all hover:scale-110">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
                        </svg>
                      </Link>
                      <Link href="https://linkedin.com" target="_blank" className="text-gray-600 hover:text-[#49C1C7] transition-all hover:scale-110">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                          <rect x="2" y="9" width="4" height="12"></rect>
                          <circle cx="4" cy="4" r="2"></circle>
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Platform */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#49C1C7] mb-5">Platform</h4>
                    <ul className="space-y-3">
                      <li><Link href="/login/volunteer" className="text-sm text-gray-500 hover:text-white transition-colors">Volunteer Portal</Link></li>
                      <li><Link href="/login/nonprofit" className="text-sm text-gray-500 hover:text-white transition-colors">Nonprofit Portal</Link></li>
                      <li><a href="#showcase" className="text-sm text-gray-500 hover:text-white transition-colors">Showcase</a></li>
                      <li><a href="#blog" className="text-sm text-gray-500 hover:text-white transition-colors">Blog</a></li>
                    </ul>
                  </div>

                  {/* Company */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#EEAB40] mb-5">Company</h4>
                    <ul className="space-y-3">
                      <li><button onClick={() => setActiveOverlay('story')} className="text-sm text-gray-500 hover:text-white transition-colors">Our Story</button></li>
                      <li><button onClick={() => setActiveOverlay('faq')} className="text-sm text-gray-500 hover:text-white transition-colors">FAQ</button></li>
                      <li><button onClick={() => setActiveOverlay('privacy')} className="text-sm text-gray-500 hover:text-white transition-colors">Privacy Policy</button></li>
                      <li><button onClick={() => setActiveOverlay('terms')} className="text-sm text-gray-500 hover:text-white transition-colors">Terms of Use</button></li>
                    </ul>
                  </div>

                  {/* Connect */}
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mb-5">Connect</h4>
                    <ul className="space-y-3">
                      <li><button onClick={() => setActiveOverlay('contact')} className="text-sm text-gray-500 hover:text-white transition-colors">Contact Us</button></li>
                      <li><a href="mailto:randa@volunteam.ca" className="text-sm text-gray-500 hover:text-white transition-colors">randa@volunteam.ca</a></li>
                    </ul>
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-white/5 w-full mb-6" />

                {/* Bottom Row */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                  <span className="text-xs font-bold text-gray-700 uppercase tracking-widest">
                    © 2026 Volunteam. All Rights Reserved.
                  </span>
                  <div className="flex gap-6">
                    <button onClick={() => setActiveOverlay('privacy')} className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-gray-400 transition-colors">Privacy</button>
                    <button onClick={() => setActiveOverlay('terms')} className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-gray-400 transition-colors">Terms</button>
                  </div>
                </div>
              </div>
            </footer>

            {/* FULL PAGE OVERLAY COMPONENT */}
            <AnimatePresence>
              {activeOverlay && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 z-[200] flex flex-col bg-[#01121C] backdrop-blur-3xl overflow-y-auto"
                >
                  {/* Close Button Header */}
                  <div className="sticky top-0 w-full p-8 flex justify-between items-center z-10 bg-gradient-to-b from-[#01121C] to-transparent">
                    <div className="flex items-center gap-3">
                      <img src="/logo.png" alt="Logo" className="w-6 h-6" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Volunteam // Mission Control</span>
                    </div>
                    <button
                      onClick={() => setActiveOverlay(null)}
                      className="bg-white/5 border border-white/10 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                    >
                      Exit
                    </button>
                  </div>

                  <div className="flex-1 flex items-center justify-center p-6 md:p-24">
                    <motion.div
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      className="max-w-4xl w-full"
                    >
                      {/* STORY OVERLAY */}
                      {activeOverlay === 'story' && (
                        <div className="space-y-12">
                          <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-none">
                            Our <br /><span className="text-[#49C1C7]">Story</span>
                          </h2>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-gray-400 font-medium leading-relaxed text-lg">
                            <p>Volunteam was born from a simple realization: world-class talent across all disciplines is often locked behind corporate walls, while the world's most critical social missions struggle to bridge the gap between vision and execution.</p>
                            <p>We built a bridge. A secure, high-performance protocol where any specialized skill meets its highest purpose. We are the architects of impact, enabling experts to deploy their unique abilities to change lives.</p>
                          </div>
                          <div className="flex flex-wrap gap-4">
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-1 min-w-[180px]">
                              <div className="text-2xl font-black text-white uppercase tracking-tighter">01. Purpose</div>
                              <div className="text-[10px] text-[#EEAB40] font-black uppercase tracking-widest mt-2">Mission Driven</div>
                            </div>
                            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex-1 min-w-[180px]">
                              <div className="text-2xl font-black text-white uppercase tracking-tighter">02. Talent</div>
                              <div className="text-[10px] text-[#49C1C7] font-black uppercase tracking-widest mt-2">Vetted Specialists</div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* CONTACT OVERLAY */}
                      {activeOverlay === 'contact' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                          <div>
                            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">Get In <br /><span className="text-[#EEAB40]">Touch</span></h2>
                            <p className="text-gray-400 font-medium leading-relaxed">Submit your credentials and message. Our team will verify and respond via encrypted channel As Soon As Possible.</p>
                          </div>
                          <form className="space-y-6" onSubmit={handleContactSubmit}>
                            <div className="group">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[#49C1C7] mb-2 block group-focus-within:text-white transition-colors">Identity</label>
                              <input required name="identity" type="text" placeholder="Your Full Name" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#49C1C7] outline-none transition-all text-xl md:text-2xl font-bold" />
                            </div>
                            <div className="group">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[#49C1C7] mb-2 block group-focus-within:text-white transition-colors">Contact Point</label>
                              <input required name="contact" type="email" placeholder="Email Address" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#49C1C7] outline-none transition-all text-xl md:text-2xl font-bold" />
                            </div>
                            <div className="group">
                              <label className="text-[9px] font-black uppercase tracking-widest text-[#49C1C7] mb-2 block group-focus-within:text-white transition-colors">Transmission</label>
                              <textarea required name="transmission" rows={3} placeholder="Your Message" className="w-full bg-transparent border-b border-white/10 py-4 focus:border-[#49C1C7] outline-none transition-all text-xl md:text-2xl font-bold resize-none" />
                            </div>
                            <button type="submit" className="w-full bg-[#EEAB40] text-[#01121C] py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:brightness-110 active:scale-[0.98] transition-all">
                              Send Message
                            </button>
                          </form>
                        </div>
                      )}

                      {/* PRIVACY PROTOCOL */}
                      {activeOverlay === 'privacy' && (
                        <div className="text-left">
                          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
                            Privacy <br /><span className="text-[#49C1C7]">Protocol</span>
                          </h2>

                          <div className="space-y-12 text-gray-400 font-medium leading-relaxed">
                            <div className="max-w-3xl">
                              <p className="text-lg text-white mb-4 italic">"Protecting your digital footprint while you change the world."</p>
                              <p className="text-sm">Volunteam understands the critical nature of your privacy. This protocol defines the data we harvest, how it is deployed, and your rights to terminal session management.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                              <section className="border-l-2 border-[#49C1C7] pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">01. Identity Collection</h3>
                                <p className="text-[11px] leading-relaxed">
                                  When you initiate an inquiry, we collect personally identifiable information including your <strong>Identity (Name)</strong>, <strong>Contact Point (Email/Phone)</strong>, and <strong>Location Data (Address)</strong>. This is protected by secure web servers and internal encrypted systems.
                                </p>
                              </section>

                              <section className="border-l-2 border-[#EEAB40] pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">02. Digital Breadcrumbs (Cookies)</h3>
                                <p className="text-[11px] leading-relaxed">
                                  We use cookies to aggregate non-personal metadata. These files track browser types and ISP data to optimize your surfing experience. You may choose to refuse cookies via your browser hardware, though some platform functions may de-sync.
                                </p>
                              </section>

                              <section className="border-l-2 border-white/20 pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">03. Intelligence Disclosure</h3>
                                <p className="text-[11px] leading-relaxed">
                                  Personal data is terminal to our platform. We only disclose information when mandated by law, government agency, or court order—or if we believe a user poses an immediate danger to themselves or the collective.
                                </p>
                              </section>

                              <section className="border-l-2 border-red-500/40 pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">04. Transmission Warning</h3>
                                <p className="text-[11px] leading-relaxed">
                                  Standard email is <strong>NOT data encrypted</strong>. Do not transmit sensitive credentials via email. Volunteam will never request high-level identifiable secrets through unencrypted external channels.
                                </p>
                              </section>
                            </div>

                            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10">
                              <h3 className="text-white uppercase font-black text-xs mb-4">Mailing List Protocols</h3>
                              <p className="text-[11px] mb-4">Our encrypted mailing list provides notification of new missions and service updates. To terminate your subscription, contact <span className="text-[#49C1C7]">info@volunteermatters.com</span>.</p>
                              <div className="text-[9px] text-gray-600 uppercase font-bold tracking-[0.2em]">
                                Ref: POL-SYNC-2026 // Last Updated: Feb 2026
                              </div>
                            </div>
                          </div>
                        </div>
                      )}


                      {/* FAQ OVERLAY */}
                      {activeOverlay === 'faq' && (
                        <div className="text-left pb-20">
                          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
                            Mission <br /><span className="text-[#49C1C7]">Briefing</span>
                          </h2>

                          <div className="space-y-16 text-gray-400 font-medium leading-relaxed">
                            {/* GENERAL */}
                            <section>
                              <h3 className="text-white uppercase font-black text-xs mb-6 tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#49C1C7] rounded-full" /> General Intelligence
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                  <h4 className="text-white font-black uppercase text-sm mb-2">What is Volunteam?</h4>
                                  <p className="text-xs">A protocol connecting skilled specialists with nonprofits for projects, 1-hour calls, or consultations.</p>
                                </div>
                                <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
                                  <h4 className="text-white font-black uppercase text-sm mb-2">Closing a Mission</h4>
                                  <p className="text-xs">Once complete, two-way feedback is mandatory. Rate your experience to maintain community integrity.</p>
                                </div>
                              </div>
                            </section>

                            {/* VOLUNTEERS */}
                            <section>
                              <h3 className="text-white uppercase font-black text-xs mb-6 tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 bg-[#EEAB40] rounded-full" /> Volunteer Protocol
                              </h3>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                                <div className="space-y-4">
                                  <p><strong className="text-white">Recognition:</strong> Download impact reports and certificates of completion for all vetted trainings.</p>
                                  <p><strong className="text-white">Trainings:</strong> Specialized training modules are available at affordable rates with certified validation.</p>
                                </div>
                                <div className="space-y-4">
                                  <p><strong className="text-white text-[10px] uppercase">Engagement Types:</strong></p>
                                  <ul className="space-y-2 opacity-80">
                                    <li>• <span className="text-white font-bold">Projects:</span> Full scope work (Hours to Weeks).</li>
                                    <li>• <span className="text-white font-bold">Calls:</span> Max 1-hour problem solving.</li>
                                    <li>• <span className="text-white font-bold">Questions:</span> Quick consultations/advice.</li>
                                  </ul>
                                </div>
                              </div>
                            </section>

                            {/* NONPROFITS */}
                            <section>
                              <h3 className="text-white uppercase font-black text-xs mb-6 tracking-[0.3em] flex items-center gap-2">
                                <span className="w-2 h-2 bg-white/40 rounded-full" /> Organization Gateway
                              </h3>
                              <div className="bg-white/[0.02] p-8 rounded-[2rem] border border-white/5 grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div>
                                  <h4 className="text-white font-black uppercase text-xs mb-2">Posting Missions</h4>
                                  <p className="text-[11px]">Use our templates for Graphic Design, Web Development, Strategy, or Translation.</p>
                                </div>
                                <div>
                                  <h4 className="text-white font-black uppercase text-xs mb-2">Communication</h4>
                                  <p className="text-[11px]">Messaging unlocks automatically once a volunteer has been selected for the briefing.</p>
                                </div>
                              </div>
                            </section>

                            {/* COMING SOON SECTION */}
                            <div className="p-8 rounded-3xl bg-[#49C1C7]/5 border border-[#49C1C7]/20 relative overflow-hidden group">
                              <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                                <span className="text-[8px] font-black uppercase tracking-widest animate-pulse text-[#49C1C7]">Coming Soon</span>
                              </div>
                              <h3 className="text-[#49C1C7] text-[10px] font-black uppercase tracking-[0.3em] mb-4">Coming</h3>
                              <div className="flex flex-wrap gap-6 text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                                <span> </span>
                                <span> Stay</span>
                                <span> Tuned</span>
                              </div>
                            </div>

                            <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                              <div className="text-left">
                                <p className="text-[9px] font-black uppercase text-gray-600">Reporting & Support</p>
                                <a href="mailto:randa@volunteam.ca" className="text-xl font-black text-white hover:text-[#49C1C7] transition-colors">RANDA@VOLUNTEAM.CA</a>
                              </div>
                              <div className="text-[8px] text-gray-700 font-bold uppercase tracking-[0.3em]">
                                Volunteam FAQ Module // v.1.0.2
                              </div>
                            </div>
                          </div>
                        </div>
                      )}







                      {/* TERMS OF ENGAGEMENT */}
                      {activeOverlay === 'terms' && (
                        <div className="text-left">
                          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-12">
                            Terms of <br /><span className="text-[#EEAB40]">Engagement</span>
                          </h2>
                          <div className="space-y-12 text-gray-400 font-medium leading-relaxed">
                            <div className="max-w-3xl text-sm">
                              <p className="text-lg text-white mb-4 italic">"The framework for high-impact collaboration."</p>
                              <p>By accessing the Volunteam terminal, you agree to these operational mandates. These terms govern the bridge between specialist talent and nonprofit missions.</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                              <section className="border-l-2 border-[#EEAB40] pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">01. Service Access</h3>
                                <p className="text-[11px] leading-relaxed">
                                  Access to the Mission Queue is granted to vetted volunteers and verified nonprofit entities. We reserve the right to terminate access if a user violates the integrity of the collective.
                                </p>
                              </section>

                              <section className="border-l-2 border-[#49C1C7] pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">02. Mission Liability</h3>
                                <p className="text-[11px] leading-relaxed">
                                  Volunteam provides the architecture for connection. Agreements formed between parties are autonomous. We are not responsible for the execution or outcomes of independent missions.
                                </p>
                              </section>

                              <section className="border-l-2 border-white/20 pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">03. IP Sovereignty</h3>
                                <p className="text-[11px] leading-relaxed">
                                  All code, strategies, and assets developed during missions remain the property of the respective parties as per their individual agreements. Volunteam claims no ownership of mission outputs.
                                </p>
                              </section>

                              <section className="border-l-2 border-white/20 pl-8">
                                <h3 className="text-white uppercase font-black text-xs mb-3 tracking-widest">04. Platform Conduct</h3>
                                <p className="text-[11px] leading-relaxed">
                                  Users must not attempt to breach terminal security, scrape intelligence data, or misrepresent their credentials. Such actions result in immediate and permanent blacklist.
                                </p>
                              </section>
                            </div>
                          </div>
                        </div>
                      )}

                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* CLOSING THE MAIN LANDING PAGE WRAPPER */}
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}