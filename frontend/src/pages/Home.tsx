import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiCpu,
  FiZoomIn,
  FiGithub,
  FiTwitter,
  FiLinkedin,
  FiMail,
  FiUploadCloud,
  FiUsers,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiSun,
  FiMoon,
  FiPlay,
  FiPause,
  FiLayers,
  FiHelpCircle,
  FiMenu,
  FiX,
  FiVideo,
  FiArrowUpRight,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import LabLogo from "../components/LabLogo";
import LabHeroIllustration from "../components/LabHeroIllustration";
import TechnicianWorkflowStepper from "../components/TechnicianWorkflowStepper";
import slide1 from "../assets/slide1.svg";
import slide2 from "../assets/slide2.svg";
import slide3 from "../assets/slide3.svg";

const slides = [
  {
    id: 1,
    title: "Blood Cell Segmentation & Count",
    subtitle: "RBC, WBC & Platelet Quantification",
    description:
      "Automated computer-vision detection of red blood cells, white blood cells, and blood platelets from microscopic smears with bounding box confidence overlays.",
    image: slide1,
    badge: "OpenCV + ResNet",
    stats: { rbc: "4.8M /µL", wbc: "7.2K /µL", platelets: "245K /µL", quality: "Good" },
  },
  {
    id: 2,
    title: "Malaria Parasite Detection",
    subtitle: "Thin & Thick Smear Microscopy",
    description:
      "Deep learning classification detecting Plasmodium falciparum ring forms and trophozoites with over 98% accuracy in clinical smear slides.",
    image: slide2,
    badge: "Malaria Screening",
    stats: { rbc: "4.5M /µL", wbc: "8.1K /µL", platelets: "210K /µL", quality: "Good" },
  },
  {
    id: 3,
    title: "Digital Pathology Slide Scanner",
    subtitle: "High-Resolution Ingestion",
    description:
      "Seamless ingestion of high-resolution digital slide scans directly into the sample tracking pipeline for immediate AI inference.",
    image: slide3,
    badge: "Full Slide Imaging",
    stats: { rbc: "5.1M /µL", wbc: "6.9K /µL", platelets: "280K /µL", quality: "Optimal" },
  },
];

const faqs = [
  {
    question: "How does the LabVision AI classification engine work?",
    answer:
      "LabVision AI combines OpenCV computer vision image processing for cell boundary segmentation (RBC, WBC, platelet counts) with a pre-trained ResNet deep learning model to classify blood smear slides for conditions such as Malaria (+ve / -ve) with high confidence scores.",
  },
  {
    question: "What microscopy slide image formats are supported?",
    answer:
      "The system accepts standard high-resolution digital microscopy images including PNG, JPG, JPEG, and TIFF slide captures.",
  },
  {
    question: "How are patient records and sample IDs connected?",
    answer:
      "LabVision AI uses standardized string business codes (PAT000001 for patients, SMP000001 for samples). When creating a sample, you simply reference the patient code. All image uploads, predictions, and PDF reports are linked to the sample code.",
  },
  {
    question: "Is patient data secured and HIPAA compliant?",
    answer:
      "Yes. All API endpoints require JWT authentication. Patient records and sample data are isolated and transmitted via encrypted channels to maintain strict patient confidentiality.",
  },
  {
    question: "How can I export official PDF clinical reports?",
    answer:
      "Once an image prediction is executed for a sample code, click the 'Download PDF Clinical Report' button on the Prediction or Reports page to download an officially formatted ReportLab PDF containing patient details, smear quality, cell counts, and AI diagnostic results.",
  },
];

const features = [
  {
    icon: FiUsers,
    title: "Patient Registry",
    badge: "Intake",
    text: "Organize patient profiles, demographic data, and clinical history with auto-generated PAT codes.",
  },
  {
    icon: FiUploadCloud,
    title: "Microscopy Ingestion",
    badge: "Upload",
    text: "Upload blood smear slide captures effortlessly and link them directly to specimen sample codes.",
  },
  {
    icon: FiCpu,
    title: "Neural AI Diagnostics",
    badge: "ResNet 2.4",
    text: "Execute model-assisted cell quantification, parasite screening, and image quality checks in seconds.",
  },
];

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Carousel autoplay timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  function nextSlide() {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }

  function prevSlide() {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }

  return (
    <div className="min-h-screen space-y-12 lg:space-y-16 pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Header Navigation - Clean text links without individual white pill circles */}
      <header className="sticky top-4 z-40 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161324] backdrop-blur-2xl shadow-md px-4 py-3 sm:px-6 sm:py-3.5 flex items-center justify-between transition-all">
        {/* Brand Logo Component */}
        <LabLogo size="md" />

        {/* Center Nav Links - Clean text links without white bubble circles */}
        <nav className="hidden md:flex items-center gap-6 px-2 text-xs font-extrabold">
          <a
            className="text-[#1A132B] dark:text-slate-200 transition-colors hover:text-[#386600] dark:hover:text-[#8CED00]"
            href="#overview"
          >
            Home
          </a>
          <a
            className="text-[#1A132B] dark:text-slate-200 transition-colors hover:text-[#386600] dark:hover:text-[#8CED00]"
            href="#workflow"
          >
            Workflow
          </a>
          <a
            className="text-[#1A132B] dark:text-slate-200 transition-colors hover:text-[#386600] dark:hover:text-[#8CED00]"
            href="#diagnostics"
          >
            Diagnostics
          </a>
          <a
            className="text-[#1A132B] dark:text-slate-200 transition-colors hover:text-[#386600] dark:hover:text-[#8CED00]"
            href="#platform"
          >
            Capabilities
          </a>
          <a
            className="text-[#1A132B] dark:text-slate-200 transition-colors hover:text-[#386600] dark:hover:text-[#8CED00]"
            href="#faq"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Controls - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            className="theme-toggle-btn flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-800 dark:text-slate-300 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
          >
            {theme === "dark" ? <FiSun size={16} className="text-amber-400" /> : <FiMoon size={16} className="text-indigo-600" />}
          </button>

          <Link
            to="/login"
            className="btn-theme-pill-neutral px-4 py-2 text-xs font-black transition-all hover:scale-[1.02] active:scale-95"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="btn-theme-lime px-4 py-2 text-xs font-black transition-all hover:scale-[1.02] active:scale-95"
          >
            Register
          </Link>
        </div>

        {/* Mobile Controls */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle-btn flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-800 dark:text-slate-300"
          >
            {theme === "dark" ? <FiSun size={16} className="text-amber-400" /> : <FiMoon size={16} className="text-indigo-600" />}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="menu-toggle-btn flex items-center justify-center h-9 w-9 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/60 text-slate-800 dark:text-slate-300"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Panel */}
      {mobileMenuOpen && (
        <div className="mobile-menu-panel md:hidden fixed top-20 px-4 inset-x-4 z-40 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#161324] p-5 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-link text-sm font-extrabold text-slate-900 dark:text-slate-300 py-2 border-b border-slate-200 dark:border-slate-800/60"
            href="#overview"
          >
            Home
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-link text-sm font-extrabold text-slate-900 dark:text-slate-300 py-2 border-b border-slate-200 dark:border-slate-800/60"
            href="#workflow"
          >
            Workflow
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-link text-sm font-extrabold text-slate-900 dark:text-slate-300 py-2 border-b border-slate-200 dark:border-slate-800/60"
            href="#diagnostics"
          >
            Diagnostics
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-link text-sm font-extrabold text-slate-900 dark:text-slate-300 py-2 border-b border-slate-200 dark:border-slate-800/60"
            href="#platform"
          >
            Capabilities
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-menu-link text-sm font-extrabold text-slate-900 dark:text-slate-300 py-2 border-b border-slate-200 dark:border-slate-800/60"
            href="#faq"
          >
            FAQ
          </a>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-sm font-bold text-slate-900 dark:text-slate-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-theme-lime text-center py-2.5 text-sm font-black"
            >
              Register
            </Link>
          </div>
        </div>
      )}

      {/* 2. Hero Section */}
      <section id="overview" className="relative overflow-hidden rounded-[2.5rem] bg-transparent py-4 sm:py-6">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center">
          {/* Left Hero Content */}
          <div className="space-y-6 max-w-xl">
            {/* Eyebrow Tag matching theme image */}
            <div className="text-xs sm:text-sm font-mono font-black uppercase tracking-[0.25em] text-[#386600] dark:text-[#8CED00]">
              VACCINE RESEARCH LABORATORY
            </div>

            {/* Main Headline matching theme image */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#1A132B] dark:text-white leading-[1.06]">
                You AI Laboratory Assistant
              </h1>
              <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed max-w-lg font-bold">
                Streamline pathology operations with real-time patient registration, smear slide ingestion, ResNet classification, and automated PDF report generation.
              </p>
            </div>

            {/* Action Buttons matching theme image */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                to="/register"
                className="btn-theme-lime px-8 py-3.5 text-sm font-black flex items-center justify-center gap-2 rounded-xl"
              >
                <span>Explore</span>
              </Link>
              <Link
                to="/login"
                className="btn-theme-cyan px-7 py-3.5 text-sm font-black flex items-center justify-center gap-2 rounded-xl"
              >
                <span>Login</span>
              </Link>
            </div>
          </div>

          {/* Right Floating Vector Laboratory Graphic */}
          <div className="relative flex justify-center lg:justify-end">
            <LabHeroIllustration />
          </div>
        </div>
      </section>

      {/* 3. Technician Clinical Pathway Stepper */}
      <section id="workflow" className="pt-4">
        <TechnicianWorkflowStepper />
      </section>

      {/* 4. Interactive Diagnostics Showcase */}
      <section id="diagnostics" className="space-y-6 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#8CED00]/40 bg-[#8CED00]/20 px-3.5 py-1 text-xs font-mono font-black uppercase tracking-wider text-[#2D5400] dark:text-[#8CED00]">
              <FiZoomIn />
              Microscopic Feature Showcase
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-[#1A132B] dark:text-white mt-2">
              Lab Diagnostics Gallery
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
              title={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <FiPause size={16} /> : <FiPlay size={16} />}
            </button>
            <button
              onClick={prevSlide}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
              title="Previous slide"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={nextSlide}
              className="p-2.5 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-300 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
              title="Next slide"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 backdrop-blur-xl shadow-lg p-6 sm:p-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Slide Image */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-950 group">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-[260px] sm:h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-slate-950/90 border border-[#8CED00]/50 text-xs font-mono text-[#8CED00] font-black shadow-lg">
                {slides[currentSlide].badge}
              </div>
            </div>

            {/* Slide Info */}
            <div className="space-y-5">
              <div>
                <span className="text-xs font-mono text-[#007A70] dark:text-[#00E5D1] uppercase tracking-widest font-black">
                  Slide {currentSlide + 1} of {slides.length} — {slides[currentSlide].subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-[#1A132B] dark:text-white mt-1">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-3 leading-relaxed font-bold">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-950/70 border border-slate-200 dark:border-slate-800">
                <div>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-black">RBC Count</p>
                  <p className="text-sm font-black font-mono text-[#1A132B] dark:text-slate-100">{slides[currentSlide].stats.rbc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-black">WBC Count</p>
                  <p className="text-sm font-black font-mono text-[#1A132B] dark:text-slate-100">{slides[currentSlide].stats.wbc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-black">Platelets</p>
                  <p className="text-sm font-black font-mono text-[#1A132B] dark:text-slate-100">{slides[currentSlide].stats.platelets}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-600 dark:text-slate-400 uppercase font-black">Smear Quality</p>
                  <p className="text-sm font-black font-mono text-[#386600] dark:text-[#8CED00]">{slides[currentSlide].stats.quality}</p>
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2 pt-1">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "w-8 bg-[#8CED00] shadow-[0_0_10px_#8CED00]" : "w-2.5 bg-slate-300 dark:bg-slate-700"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Platform Capabilities */}
      <section id="platform" className="space-y-6 pt-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-300 font-mono">
            <FiLayers className="text-[#007A70] dark:text-[#00E5D1]" />
            Platform Capabilities
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#1A132B] dark:text-white mt-2">
            Built for Laboratory Efficiency & Accuracy
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main 2-Column Workflow Card */}
          <div className="lg:col-span-2 rounded-[2rem] border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-8 shadow-lg flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-[#386600] dark:text-[#8CED00] font-black">
                  Integrated Protocol
                </span>
                <span className="px-3 py-1 rounded-full bg-[#8CED00]/20 border border-[#8CED00]/40 text-[#2D5400] dark:text-[#8CED00] font-mono text-xs font-black">
                  3-Step Protocol
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#1A132B] dark:text-white">Seamless Clinical Pipeline</h3>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed max-w-xl font-bold">
                LabVision AI removes technical bottlenecks by connecting patient registration, smear slide ingestion, computer-vision analysis, and PDF report delivery into a single continuous stream.
              </p>
            </div>

            {/* 3 Step Process Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Link to="/patients" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-[#8CED00] transition-colors group">
                <div className="h-8 w-8 rounded-lg bg-[#8CED00]/20 border border-[#8CED00]/40 flex items-center justify-center font-mono font-black text-[#120E24] dark:text-[#8CED00] text-xs">
                  01
                </div>
                <p className="text-xs font-black text-[#1A132B] dark:text-white flex items-center justify-between">
                  Patient Intake
                  <FiArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-bold">Register patient and assign public code (PAT000001).</p>
              </Link>

              <Link to="/upload" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-[#00E5D1] transition-colors group">
                <div className="h-8 w-8 rounded-lg bg-[#00E5D1]/20 border border-[#00E5D1]/40 flex items-center justify-center font-mono font-black text-[#120E24] dark:text-[#00E5D1] text-xs">
                  02
                </div>
                <p className="text-xs font-black text-[#1A132B] dark:text-white flex items-center justify-between">
                  Smear Ingestion
                  <FiArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-bold">Intake sample (SMP000001) and upload microscopy slide.</p>
              </Link>

              <Link to="/prediction" className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2 hover:border-indigo-500 transition-colors group">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center font-mono font-black text-indigo-700 dark:text-indigo-400 text-xs">
                  03
                </div>
                <p className="text-xs font-black text-[#1A132B] dark:text-white flex items-center justify-between">
                  AI & Report
                  <FiArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal font-bold">Run prediction model and export PDF report.</p>
              </Link>
            </div>
          </div>

          {/* Single Feature Cards */}
          <div className="space-y-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-xl p-5 shadow-sm space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-[#8CED00]/20 text-[#2D5400] dark:text-[#8CED00]">
                      <Icon size={18} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-300">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-sm font-black text-[#1A132B] dark:text-white">{item.title}</h4>
                  <p className="text-xs text-slate-700 dark:text-slate-400 leading-relaxed font-bold">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. FAQs Accordion Section */}
      <section id="faq" className="rounded-[2rem] border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 shadow-lg space-y-6">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8">
          {/* FAQ Left Column */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-300 dark:border-slate-800 bg-slate-100 dark:bg-slate-950/50 px-3.5 py-1 text-xs font-black uppercase tracking-wider text-slate-800 dark:text-slate-300 font-mono">
              <FiHelpCircle className="text-[#386600] dark:text-[#8CED00]" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1A132B] dark:text-white">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
              Find detailed explanations regarding AI classification accuracy, data mapping formats, HIPAA security compliance, and PDF report generation.
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 space-y-2">
              <p className="text-xs font-mono font-black text-[#386600] dark:text-[#8CED00] uppercase">Need Further Assistance?</p>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-bold">Our clinical support engineering team is available for laboratory integration.</p>
              <a
                href="mailto:support@labvision.ai"
                className="inline-flex items-center gap-2 text-xs font-black text-[#007A70] dark:text-[#00E5D1] hover:underline pt-1"
              >
                <FiMail /> support@labvision.ai
              </a>
            </div>
          </div>

          {/* FAQ Right Accordion List */}
          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-950/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-black text-[#1A132B] dark:text-white hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown
                      size={16}
                      className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-[#8CED00]" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed border-t border-slate-200 dark:border-slate-800/60 pt-3 font-bold">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer id="contact" className="rounded-[2rem] border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/70 backdrop-blur-xl p-6 sm:p-8 shadow-lg space-y-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-3 lg:col-span-2">
            <LabLogo size="md" />
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm font-bold">
              Accelerating clinical laboratory diagnostic workflows through computer vision and deep learning smear classification.
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
              >
                <FiGithub size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
              >
                <FiTwitter size={16} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 text-slate-700 dark:text-slate-400 hover:text-[#386600] dark:hover:text-[#8CED00] transition-colors"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono font-black uppercase tracking-widest text-[#386600] dark:text-[#8CED00]">Navigation</p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-bold">
              <li><a href="#overview" className="hover:text-[#8CED00] transition-colors">Home</a></li>
              <li><a href="#workflow" className="hover:text-[#8CED00] transition-colors">Technician Workflow</a></li>
              <li><a href="#diagnostics" className="hover:text-[#8CED00] transition-colors">Diagnostics Gallery</a></li>
              <li><a href="#platform" className="hover:text-[#8CED00] transition-colors">Platform Capabilities</a></li>
              <li><a href="#faq" className="hover:text-[#8CED00] transition-colors">FAQ Section</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono font-black uppercase tracking-widest text-[#386600] dark:text-[#8CED00]">Workspace</p>
            <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300 font-bold">
              <li><Link to="/login" className="hover:text-[#8CED00] transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-[#8CED00] transition-colors">Register Account</Link></li>
              <li><a href="#platform" className="hover:text-[#8CED00] transition-colors">HIPAA Security</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-mono font-black uppercase tracking-widest text-[#386600] dark:text-[#8CED00]">System Status</p>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 p-3 space-y-1">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-1 pt-1 font-mono font-bold">
                <FiMail size={12} /> support@labvision.ai
              </p>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600 dark:text-slate-400">
          <p>© {new Date().getFullYear()} LabVision AI Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 font-bold">
            <a href="#privacy" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">Terms of Service</a>
            <a href="#hipaa" className="hover:text-slate-900 dark:hover:text-slate-200 transition-colors">HIPAA Compliance</a>
          </div>
        </div>
      </footer>
    </div>
  );
}