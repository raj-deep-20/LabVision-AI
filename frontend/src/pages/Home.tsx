import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
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
  FiActivity,
  FiLayers,
  FiHelpCircle,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useTheme } from "../context/ThemeContext";
import heroImage from "../assets/hero.png";
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
    <div className="min-h-screen space-y-16 lg:space-y-24 pt-4 sm:pt-6 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Floating Glass Navbar */}
      <header className="sticky top-4 z-40 rounded-2xl border border-slate-800/80 bg-slate-900/70 backdrop-blur-2xl shadow-2xl px-4 py-3 sm:px-5 sm:py-3.5 flex items-center justify-between transition-all">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-xs font-black text-white shadow-lg shadow-cyan-500/25 shrink-0">
            LV
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
          </div>
          <div>
            <p className="text-base font-extrabold text-white tracking-tight leading-none">LabVision AI</p>
            <p className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider mt-0.5 hidden sm:block">Clinical Pathology Workspace</p>
          </div>
        </div>

        {/* Center Pill Nav Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-800/90 bg-slate-950/50 px-3 py-1 text-xs font-semibold text-slate-300">
          <a
            className="rounded-full px-3.5 py-1.5 transition-colors hover:text-cyan-400 hover:bg-slate-900/80"
            href="#overview"
          >
            Overview
          </a>
          <a
            className="rounded-full px-3.5 py-1.5 transition-colors hover:text-cyan-400 hover:bg-slate-900/80"
            href="#carousel"
          >
            Diagnostics
          </a>
          <a
            className="rounded-full px-3.5 py-1.5 transition-colors hover:text-cyan-400 hover:bg-slate-900/80"
            href="#platform"
          >
            Platform
          </a>
          <a
            className="rounded-full px-3.5 py-1.5 transition-colors hover:text-cyan-400 hover:bg-slate-900/80"
            href="#faq"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Controls - Desktop Only */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            {theme === "dark" ? <FiSun size={16} className="text-amber-400" /> : <FiMoon size={16} className="text-indigo-400" />}
          </button>

          <Link
            to="/login"
            className="text-xs font-bold text-slate-300 hover:text-cyan-300 transition-colors px-2 py-1"
          >
            Sign in
          </Link>

          <Link
            to="/register"
            className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-3 py-1.5 sm:px-4 sm:py-2 text-xs font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-indigo-500 active:scale-95"
          >
            Register
            <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
          >
            {theme === "dark" ? <FiSun size={16} className="text-amber-400" /> : <FiMoon size={16} className="text-indigo-400" />}
          </button>

          {/* Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex items-center justify-center h-9 w-9 rounded-xl border border-slate-800 bg-slate-950/60 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Dropdown Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-20 px-4 inset-x-4 z-40 rounded-2xl border border-slate-800/90 bg-slate-900/95 backdrop-blur-2xl p-5 shadow-2xl flex flex-col gap-4 animate-fadeIn">
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800/60"
            href="#overview"
          >
            Overview
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800/60"
            href="#carousel"
          >
            Diagnostics
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800/60"
            href="#platform"
          >
            Platform
          </a>
          <a
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-semibold text-slate-300 hover:text-cyan-400 py-2 border-b border-slate-800/60"
            href="#faq"
          >
            FAQ
          </a>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="text-center py-2.5 rounded-xl border border-slate-800 bg-slate-950/60 hover:bg-slate-900 text-sm font-bold text-slate-300 hover:text-cyan-300 transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/25 transition-all hover:from-cyan-400 hover:to-indigo-500"
            >
              Register
              <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {/* 2. Redesigned Asymmetric Split Hero Section */}
      <section id="overview" className="relative overflow-hidden rounded-[2.5rem] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-4 sm:p-7 lg:p-12">
        {/* Background Ambient Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] items-center">
          {/* Left Hero Content */}
          <div className="space-y-6 max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 pl-3 pr-4 py-1 sm:pl-4 sm:pr-5 sm:py-1.5 text-[9px] min-[380px]:text-[10px] sm:text-xs font-semibold uppercase tracking-wider sm:tracking-widest text-cyan-300 font-mono max-w-full">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse shrink-0" />
              <span className="truncate pr-2 sm:pr-0 sm:whitespace-normal">Next-Gen Medical AI Diagnostic Workspace</span>
            </div>

            <div className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.04]">
                Next-Gen Pathology &
                <span className="block bg-gradient-to-r from-cyan-400 via-indigo-300 to-indigo-400 bg-clip-text text-transparent">
                  Neural Cell Analysis.
                </span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-xl">
                Streamline pathology operations with real-time patient registration, smear slide ingestion, ResNet classification, and automated PDF report generation.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                to="/register"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-white font-bold text-sm shadow-xl shadow-cyan-500/25 transition-all duration-200 active:scale-95 flex items-center justify-center gap-2 w-full sm:w-auto text-center"
              >
                <span>Get Started Now</span>
                <FiArrowRight size={16} />
              </Link>
              <Link
                to="/login"
                className="px-5 py-3 rounded-2xl border border-slate-700/80 bg-slate-950/60 hover:bg-slate-900 text-slate-200 font-bold text-sm transition-all duration-200 active:scale-95 w-full sm:w-auto text-center"
              >
                Sign In to Workspace
              </Link>
            </div>

            {/* Metric Pills Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-800/80">
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xl font-black font-mono text-cyan-400">06</p>
                <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Modules</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xl font-black font-mono text-indigo-400">100%</p>
                <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">End-to-End</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xl font-black font-mono text-emerald-400">v2.4</p>
                <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">ResNet Engine</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950/60 border border-slate-800/80">
                <p className="text-xl font-black font-mono text-cyan-400">HIPAA</p>
                <p className="text-[10px] uppercase font-mono text-slate-400 tracking-wider">Compliant</p>
              </div>
            </div>
          </div>

          {/* Right Floating Live Preview Card */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/20 via-indigo-500/10 to-transparent blur-2xl pointer-events-none" />
            <div className="relative rounded-[2rem] border border-slate-800/90 bg-slate-950/80 p-5 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FiActivity className="text-cyan-400" />
                  <span className="text-xs font-mono font-bold text-slate-200 uppercase tracking-wider">Microscopy Scan</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-mono font-bold">
                  LIVE FEED
                </span>
              </div>

              {/* Main Image with Scanline Animation */}
              <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                <div className="animate-scanline" />
                <img
                  src={heroImage}
                  alt="Pathology Workspace"
                  className="h-[280px] sm:h-[320px] w-full object-cover object-center"
                />
              </div>

              {/* Bottom Quick Feature Badges */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <p className="text-slate-400 text-[10px]">Classification</p>
                  <p className="text-cyan-400 font-bold">Malaria Screening</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono">
                  <p className="text-slate-400 text-[10px]">Smear Ingestion</p>
                  <p className="text-emerald-400 font-bold">High-Res PNG/JPG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Interactive Diagnostics Carousel Showcase Section */}
      <section id="carousel" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-300 font-mono">
              <FiZoomIn />
              Microscopic Feature Showcase
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
              Lab Diagnostics Gallery
            </h2>
          </div>

          {/* Carousel Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title={isPlaying ? "Pause autoplay" : "Play autoplay"}
            >
              {isPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
            </button>
            <button
              onClick={prevSlide}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title="Previous slide"
            >
              <FiChevronLeft size={20} />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-xl border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
              title="Next slide"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-6 sm:p-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Slide Image */}
            <div className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 group">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full h-[300px] sm:h-[380px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/85 border border-cyan-500/40 text-xs font-mono text-cyan-400 font-bold shadow-lg">
                {slides[currentSlide].badge}
              </div>
            </div>

            {/* Slide Information */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
                  Slide {currentSlide + 1} of {slides.length} — {slides[currentSlide].subtitle}
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
                  {slides[currentSlide].title}
                </h3>
                <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Cell Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">RBC Count</p>
                  <p className="text-base font-extrabold font-mono text-slate-100">{slides[currentSlide].stats.rbc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">WBC Count</p>
                  <p className="text-base font-extrabold font-mono text-slate-100">{slides[currentSlide].stats.wbc}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Platelets</p>
                  <p className="text-base font-extrabold font-mono text-slate-100">{slides[currentSlide].stats.platelets}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono text-slate-400 uppercase">Smear Quality</p>
                  <p className="text-base font-extrabold font-mono text-emerald-400">{slides[currentSlide].stats.quality}</p>
                </div>
              </div>

              {/* Indicator Dots */}
              <div className="flex items-center gap-2.5 pt-2">
                {slides.map((slide, index) => (
                  <button
                    key={slide.id}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentSlide === index ? "w-10 bg-cyan-400 shadow-[0_0_10px_#06b6d4]" : "w-3 bg-slate-700 hover:bg-slate-500"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Bento-Grid Style "About & Core Features" Showcase */}
      <section id="platform" className="space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-300 font-mono">
            <FiLayers className="text-cyan-400" />
            Platform Capabilities
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white mt-2">
            Built for Laboratory Efficiency & Accuracy
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main 2-Column Bento Workflow Card */}
          <div className="lg:col-span-2 rounded-[2rem] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-8 shadow-xl flex flex-col justify-between space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
                  Integrated Workflow
                </span>
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs font-bold">
                  3-Step Protocol
                </span>
              </div>
              <h3 className="text-2xl font-bold text-white">Seamless Clinical Pipeline</h3>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed max-w-xl">
                LabVision AI removes technical bottlenecks by connecting patient registration, smear slide ingestion, computer-vision analysis, and PDF report delivery into a single continuous stream.
              </p>
            </div>

            {/* 3 Step Process Box */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-cyan-400 text-xs">
                  01
                </div>
                <p className="text-xs font-bold text-white">Patient Intake</p>
                <p className="text-[11px] text-slate-400 leading-normal">Register patient and assign public code (PAT000001).</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center font-mono font-bold text-indigo-400 text-xs">
                  02
                </div>
                <p className="text-xs font-bold text-white">Smear Ingestion</p>
                <p className="text-[11px] text-slate-400 leading-normal">Intake sample (SMP000001) and upload microscopy slide.</p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center font-mono font-bold text-emerald-400 text-xs">
                  03
                </div>
                <p className="text-xs font-bold text-white">AI & Report</p>
                <p className="text-[11px] text-slate-400 leading-normal">Run prediction model and export PDF report.</p>
              </div>
            </div>
          </div>

          {/* 3 Single Feature Cards */}
          <div className="space-y-6">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-6 shadow-xl space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                      <Icon size={20} />
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                      {item.badge}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-white">{item.title}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FAQs Accordion Section */}
      <section id="faq" className="rounded-[2.5rem] border border-slate-800/80 bg-slate-900/60 backdrop-blur-xl p-6 sm:p-10 lg:p-12 shadow-2xl space-y-8">
        <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-10">
          {/* FAQ Left Column */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-widest text-slate-300 font-mono">
              <FiHelpCircle className="text-cyan-400" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-white">
              Got Questions? We Have Answers.
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Find detailed explanations regarding AI classification accuracy, data mapping formats, HIPAA security compliance, and PDF report generation.
            </p>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
              <p className="text-xs font-mono font-bold text-cyan-400 uppercase">Need Further Assistance?</p>
              <p className="text-xs text-slate-400">Our clinical support engineering team is available for laboratory integration.</p>
              <a
                href="mailto:support@labvision.ai"
                className="inline-flex items-center gap-2 text-xs font-bold text-cyan-300 hover:underline pt-1"
              >
                <FiMail /> support@labvision.ai
              </a>
            </div>
          </div>

          {/* FAQ Right Accordion List */}
          <div className="space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-slate-800 bg-slate-950/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 text-sm sm:text-base font-bold text-white hover:text-cyan-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <FiChevronDown
                      size={18}
                      className={`shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-cyan-400" : ""}`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3.5">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Footer */}
      <footer className="rounded-[2.5rem] border border-slate-800/80 bg-slate-900/70 backdrop-blur-xl p-6 sm:p-10 shadow-2xl space-y-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div className="space-y-4 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 text-xs font-black text-white shadow-lg shadow-cyan-500/25">
                LV
                <span className="absolute -top-1 -right-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-2 ring-slate-900" />
              </div>
              <span className="text-lg font-extrabold text-white tracking-wide">LabVision AI</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Accelerating clinical laboratory diagnostic workflows through computer vision and deep learning smear classification.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FiGithub size={18} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FiTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-800 bg-slate-950/60 text-slate-400 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
              >
                <FiLinkedin size={18} />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">Navigation</p>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <a href="#overview" className="transition-colors hover:text-cyan-300">
                  Overview
                </a>
              </li>
              <li>
                <a href="#carousel" className="transition-colors hover:text-cyan-300">
                  Lab Diagnostics
                </a>
              </li>
              <li>
                <a href="#platform" className="transition-colors hover:text-cyan-300">
                  Platform Features
                </a>
              </li>
              <li>
                <a href="#faq" className="transition-colors hover:text-cyan-300">
                  FAQ Section
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">Workspace</p>
            <ul className="space-y-2 text-xs text-slate-300 font-medium">
              <li>
                <Link to="/login" className="transition-colors hover:text-cyan-300">
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/register" className="transition-colors hover:text-cyan-300">
                  Register Account
                </Link>
              </li>
              <li>
                <a href="#platform" className="transition-colors hover:text-cyan-300">
                  HIPAA Security
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono">System Status</p>
            <div className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3.5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 pt-1">
                <FiMail size={14} className="text-slate-500" /> support@labvision.ai
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LabVision AI Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </a>
            <a href="#hipaa" className="hover:text-slate-400 transition-colors">
              HIPAA Compliance
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}