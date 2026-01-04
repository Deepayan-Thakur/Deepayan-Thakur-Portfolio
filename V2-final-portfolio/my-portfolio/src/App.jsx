import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring, useMotionValue, useMotionTemplate } from 'framer-motion';
import {
  Github, Linkedin, Mail, ChevronDown, Cpu, Shield,
  Activity, Terminal, Menu, X, Play, Leaf, ExternalLink, Code, ArrowUpRight
} from 'lucide-react';

// --- DATA SOURCE ---
const PORTFOLIO_DATA = {
  personal: {
    name: "Deepayan Thakur",
    role: "AI & Deep Learning Engineer",
    tagline: "Building the Brain of the Future.",
    subTagline: "Precision-engineered AI solutions for defense, healthcare, and infrastructure.",
    location: "New Delhi, India",
    email: "deepayankv8@gmail.com",
    github: "https://github.com/Deepayan-Thakur",
    linkedin: "https://www.linkedin.com/in/deepayan-thakur-5bb2aa215/",
    instagram: "https://www.instagram.com/deepayan_thakur/",
    avatar: "av1-copy.png",
    avatar2: "av2.png",
    av7: "av73.png", 
    av71: "av73-bg.png", 
    about: "I am currently pursuing a B.Tech in CSE (AI & ML) at Sharda University with a strong focus on building scalable AI solutions. My journey involves hands-on experience with high-stakes organizations like DRDO, where I worked on cryptographic deep learning, and NHAI, where I streamlined national infrastructure data. Proficient in Python, Deep Learning, and Data Science, I am dedicated to solving real-world problems through innovation."
  },
  experience: [
    {
      id: 1,
      role: "Trade Data Analyst Intern",
      company: "DPIIT (Govt. of India)",
      date: "2025",
      desc: "Developed a Flask-based platform for visualizing India's import/export data using HSN codes. Implemented real-time analytics with Matplotlib."
    },
    {
      id: 2,
      role: "Machine Learning Trainee",
      company: "DRDO",
      date: "June - July 2023",
      desc: "Engineered deep learning models for classifying encrypted data (TDES/AES). Combined cryptography with CNNs to ensure national data integrity."
    },
    {
      id: 3,
      role: "Data Integration Engineer",
      company: "NHAI",
      date: "June - Aug 2022",
      desc: "Built the 'Data Integration & Management System' using Python & SQL Server, streamlining large-scale infrastructure analytics."
    }
  ],
  projects: [
    {
      id: "p1",
      title: "Medicinal Plant Detection",
      category: "Computer Vision / Android",
      description: "A real-time AI android app capable of classifying 40+ medicinal plant species via camera input. Features a dedicated UI for medicinal usage and health benefits.",
      tech: ["ConvNeXt Tiny", "Android", "Deep Learning"],
      icon: <Activity size={32} />
    },
    {
      id: "p2",
      title: "Dental Cavity Detection",
      category: "Medical AI",
      description: "CNN-based diagnostic tool for early cavity detection in X-ray images. Utilizes advanced data augmentation and binary classification techniques.",
      tech: ["CNN", "Medical Imaging", "Python"],
      icon: <Cpu size={32} />
    },
    {
      id: "p3",
      title: "Crypto-Image Classification",
      category: "Defense Tech",
      description: "A secure image transmission system combining cryptography with Deep Learning. Developed at DRDO for sensitive defense datasets.",
      tech: ["Cryptography", "ResNet", "Cybersecurity"],
      icon: <Shield size={32} />
    },
    {
      id: "p4",
      title: "Filey & MultiFiley",
      category: "Networking Tool",
      description: "High-speed file transfer software enabling seamless data movement between PC and Mobile devices via local networks.",
      tech: ["Python", "Socket Programming", "Networking"],
      icon: <Terminal size={32} />
    }
  ],
  skills: [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "PyTorch", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "OpenCV", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Pandas", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "SQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" }
  ]
};

// --- LEAF CURTAIN PRELOADER (Theme Adapted to Purple) ---
const LeafPreloader = ({ onComplete }) => {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setExit(true);
      setTimeout(onComplete, 1500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  const generateLeaves = (count) => {
    return Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      rotation: Math.random() * 360,
      scale: 0.5 + Math.random() * 1.5,
      delay: Math.random() * 2,
      // Changed colors to match purple theme
      color: Math.random() > 0.5 ? "text-purple-600" : "text-indigo-500"
    }));
  };

  const leavesLeft = useRef(generateLeaves(15)).current;
  const leavesRight = useRef(generateLeaves(15)).current;
  const curtainTransition = { duration: 1.2, ease: [0.76, 0, 0.24, 1] };

  return (
    <div className="fixed inset-0 z-[100] flex pointer-events-none">
      <motion.div
        initial={{ x: "0%" }}
        animate={exit ? { x: "-100%" } : { x: "0%" }}
        transition={curtainTransition}
        // Changed bg to dark purple
        className="w-1/2 h-full bg-[#0a0118] relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-black/80"></div>
        {leavesLeft.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1], scale: [0, leaf.scale, leaf.scale], rotate: [leaf.rotation, leaf.rotation + 10, leaf.rotation - 10, leaf.rotation] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            className={`absolute ${leaf.color}`}
            style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
          >
            <Leaf size={40} fill="currentColor" className="opacity-60" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ x: "0%" }}
        animate={exit ? { x: "100%" } : { x: "0%" }}
        transition={curtainTransition}
        className="w-1/2 h-full bg-[#0a0118] relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-purple-900/40 to-black/80"></div>
        {leavesRight.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 1], scale: [0, leaf.scale, leaf.scale], rotate: [leaf.rotation, leaf.rotation - 10, leaf.rotation + 10, leaf.rotation] }}
            transition={{ duration: 2, delay: 0.2, repeat: Infinity, repeatType: "reverse" }}
            className={`absolute ${leaf.color}`}
            style={{ left: `${leaf.x}%`, top: `${leaf.y}%` }}
          >
            <Leaf size={40} fill="currentColor" className="opacity-60" />
          </motion.div>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={exit ? { opacity: 0, scale: 1.5 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      >
        <div className="text-center">
          <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }} className="mb-4">
            <Leaf size={64} className="text-purple-500 mx-auto animate-pulse" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest font-mono">I Welcome You</h1>
          <p className="text-purple-500 mt-2 font-mono text-sm">To My Portfolio... 🍃</p>
        </div>
      </motion.div>
    </div>
  );
};

// --- VISUAL COMPONENTS ---

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Work', href: '#projects' },
    { name: 'Connect', href: '#contact' },
  ];

  const scrollToSection = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.offsetTop;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0118]/80 backdrop-blur-xl border-b border-purple-500/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-bold text-white tracking-tighter cursor-pointer">
          DT<span className="text-purple-500">.</span>
        </a>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-sm font-medium text-slate-300 hover:text-purple-400 transition-colors uppercase tracking-wider">
              {link.name}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full bg-[#0a0118]/95 backdrop-blur-xl border-b border-white/10 py-8 flex flex-col items-center gap-6 md:hidden">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-lg font-medium text-slate-300 hover:text-purple-400">
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

// --- NEW PURPLE GRADIENT BACKGROUND ---
const PurpleGradientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030014]">
      {/* Top Center Glow (Purple Spotlight) */}
      <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-800/20 blur-[120px] rounded-full mix-blend-screen" />
      {/* Secondary Glows */}
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-indigo-900/20 blur-[100px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-violet-900/10 blur-[100px] rounded-full" />
      {/* Noise Texture for depth */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
    </div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  // Floating Image Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [isHoveringName, setIsHoveringName] = useState(false);

  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - 100);
    mouseY.set(clientY - 100);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      
      {/* Floating Image Component */}
      <motion.div
        style={{ x: springX, y: springY }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{
          opacity: isHoveringName ? 1 : 0,
          scale: isHoveringName ? 1 : 0.5,
          rotate: isHoveringName ? -5 : 0
        }}
        transition={{ duration: 0.2 }}
        className="fixed top-0 left-0 z-50 pointer-events-none"
      >
        <img
          src={PORTFOLIO_DATA.personal.av71}
          alt="Hover Reveal"
          className="w-48 h-48 object-cover rounded-xl shadow-2xl border-2 border-purple-500/30 backdrop-blur-md"
        />
      </motion.div>

      <motion.div style={{ y: yText, opacity: opacityText }} className="z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative w-fit mx-auto"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-600 to-pink-400 blur-2xl opacity-40 animate-pulse"></div>
          <img
            src={PORTFOLIO_DATA.personal.avatar}
            alt="Profile"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-purple-500/30 object-cover bg-slate-950"
          />
        </motion.div>

        {/* Name with Hover Trigger */}
        <div
          onMouseEnter={() => setIsHoveringName(true)}
          onMouseLeave={() => setIsHoveringName(false)}
          className="relative inline-block cursor-default"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 hover:text-purple-400 transition-colors duration-300"
          >
            {PORTFOLIO_DATA.personal.name}
          </motion.h1>
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-purple-400 font-medium mb-2 font-mono"
        >
          {PORTFOLIO_DATA.personal.role}
        </motion.p>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-slate-400 text-lg max-w-2xl mx-auto font-light leading-relaxed"
        >
          {PORTFOLIO_DATA.personal.subTagline}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 z-10 animate-bounce text-purple-500/50"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

// --- FILLER SECTION: PHILOSOPHY ---
const PhilosophySection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-100px" });

    return (
        <section ref={ref} className="py-40 relative overflow-hidden flex items-center justify-center">
            {/* Background enhancement for Philosophy section */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
            <div className="max-w-4xl px-6 text-center z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <Code size={48} className="mx-auto text-purple-500 mb-8 opacity-50" />
                    <h3 className="text-3xl md:text-5xl font-light text-slate-300 leading-tight">
                        "The code we write today is the <span className="text-white font-bold italic font-serif">history</span> of tomorrow's intelligence."
                    </h3>
                    <div className="w-24 h-1 bg-purple-500 mx-auto mt-10 rounded-full"></div>
                </motion.div>
            </div>
        </section>
    )
}

const AboutMeSection = () => {
  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const fullText = PORTFOLIO_DATA.personal.about;

  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [isTyping, displayedText, fullText]);

  return (
    <section id="about" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
      >
        {/* Left: Clean, Static Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
            whileInView={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-purple-500/20 rounded-[30px] blur-2xl -z-10"></div>
            <img
              src={PORTFOLIO_DATA.personal.av7}
              alt="About Me"
              className="relative w-72 h-80 object-cover rounded-[30px] shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>

        {/* Right: Cinematic Text */}
        <div className="w-full md:w-2/3 text-left">
          <span className="text-purple-500 font-mono tracking-widest text-sm uppercase mb-2 block">Deepayan Thakur - A Journey of Mine</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The Developer Behind the Code</h2>

          <div className="min-h-[180px] md:min-h-[120px] mb-8">
            {!isTyping && !displayedText ? (
              <div className="flex flex-col items-start">
                <p className="text-slate-500 italic mb-6">To access restricted data about the developer, please authenticate.</p>
                <button
                  onClick={() => setIsTyping(true)}
                  className="group flex items-center gap-3 px-6 py-3 bg-[#0a0118] border border-purple-500/30 hover:border-purple-500 text-purple-400 hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] cursor-pointer"
                >
                  <Play size={18} className="fill-current " />
                  <span className="font-mono text-sm tracking-wider">INITIALIZE THIS ...</span>
                </button>
              </div>
            ) : (
              <p className="text-lg text-slate-300 leading-relaxed font-light border-l-2 border-purple-500 pl-6">
                {displayedText}
                <span className="animate-pulse text-purple-400">|</span>
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const ExperienceCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-8 md:pl-0 mb-16 md:mb-24 flex flex-col md:flex-row md:items-center gap-6">
      <div className="hidden md:block absolute left-1/2 -ml-[1px] w-[2px] h-full bg-slate-800 -z-10 top-0"></div>
      <motion.div
        initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8 }}
        className={`md:w-1/2 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:order-2 md:pl-12'}`}
      >
        <span className="text-purple-400 font-mono text-sm tracking-widest">{item.date}</span>
        <h3 className="text-2xl font-bold text-white mt-1">{item.company}</h3>
        <h4 className="text-xl text-slate-400 font-light">{item.role}</h4>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute left-[-5px] md:left-1/2 md:-ml-[6px] w-3 h-3 bg-purple-500 rounded-full shadow-[0_0_15px_rgba(168,85,247,0.8)] z-10"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:text-right md:pr-12'}`}
      >
        <p className="text-slate-400 leading-relaxed bg-[#0a0118]/60 p-6 rounded-lg border border-slate-800 backdrop-blur-sm hover:border-purple-500/30 transition-colors">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
};

// --- SKILLS GRID ---
const SkillsGrid = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-purple-500 font-mono tracking-widest text-sm uppercase">Technical Arsenal</span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-4">Tools & Technologies</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {PORTFOLIO_DATA.skills.map((skill, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group relative flex flex-col items-center justify-center p-6 bg-[#0a0118]/40 border border-slate-800/50 rounded-2xl hover:bg-[#0a0118]/60 hover:border-purple-500/30 transition-all duration-300"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-purple-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 w-12 h-12 mb-4 grayscale group-hover:grayscale-0 transition-all duration-300">
              <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
            </div>
            <span className="relative z-10 text-slate-400 font-medium group-hover:text-white transition-colors">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// --- NEW CRAZY GOOD PROJECT CARD (Holographic/3D) ---
const FuturisticProjectCard = ({ project, index }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <a href="https://google.com" target="_blank" rel="noreferrer" className="block w-full">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseMove={handleMouseMove}
                className="group relative w-full h-[450px] bg-slate-900/40 rounded-3xl overflow-hidden border border-white/10 hover:border-purple-500/50 transition-colors duration-500"
            >
                {/* Spotlight Gradient Follower */}
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(168, 85, 247, 0.15),
                            transparent 80%
                            )
                        `,
                    }}
                />

                {/* Card Content Layer */}
                <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                        <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 text-purple-400 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all duration-300">
                            {project.icon}
                        </div>
                        <div className="p-2 bg-white/5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                            <ArrowUpRight size={20} className="text-white"/>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <span className="text-purple-400 text-xs font-mono uppercase tracking-widest">{project.category}</span>
                        <h3 className="text-3xl font-bold text-white group-hover:translate-x-2 transition-transform duration-300">{project.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 group-hover:text-slate-200 transition-colors">
                            {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 pt-4">
                            {project.tech.map((t, i) => (
                                <span key={i} className="px-3 py-1 text-[10px] text-slate-300 bg-white/5 rounded-full border border-white/10 uppercase tracking-wider">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Background Pattern Animation */}
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                     <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple-600/30 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                </div>
            </motion.div>
        </a>
    )
}

const Contact = () => {
  return (
    <footer id="contact" className="bg-[#05010a] border-t border-purple-900/20 py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Innovate?</h2>
        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
          Whether it's deep learning research or scalable software architecture, I am ready to join your team.
        </p>

        <div className="flex justify-center gap-8">
          <a href={PORTFOLIO_DATA.personal.github} target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-white hover:text-black hover:scale-110 transition-all duration-300">
            <Github size={24} />
          </a>
          <a href={PORTFOLIO_DATA.personal.linkedin} target="_blank" rel="noreferrer" className="p-4 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-[#0077b5] hover:border-[#0077b5] hover:scale-110 transition-all duration-300">
            <Linkedin size={24} />
          </a>
          <a href={`mailto:${PORTFOLIO_DATA.personal.email}`} className="p-4 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-gradient-to-r hover:from-[#4285F4] hover:via-[#34A853] hover:via-[#FBBC05] hover:to-[#EA4335] hover:border-transparent hover:scale-110 transition-all duration-300">
            <Mail size={24} />
          </a>
        </div>

        <h2 className="mt-10 text-4xl md:text-6xl font-bold text-white mb-8">Thank you for <span className="text-purple-500">Your</span> Time</h2>
        <div className="mt-20 text-slate-600 text-sm">
          <p>© 2025 Deepayan Thakur. Designed with AI Intelligence.</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-purple-900/20 blur-[120px] rounded-full"></div>
    </footer>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <LeafPreloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <main className="bg-[#030014] min-h-screen text-slate-200 selection:bg-purple-500 selection:text-white font-sans overflow-x-hidden">
        <PurpleGradientBackground />
        <NavBar />
        <Hero />
        
        {/* ADDED PHILOSOPHY SECTION HERE */}
        <PhilosophySection />
        
        <AboutMeSection />

        <section id="experience" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-purple-500 font-mono tracking-widest text-sm uppercase">Career Trajectory</span>
            <img src={PORTFOLIO_DATA.personal.avatar2} alt="Profile" className="relative w-34 h-34 rounded-full border border-slate-800 object-cover mx-auto my-6 bg-slate-950" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Experience & Internships</h2>
          </motion.div>
          <div className="relative">
            {PORTFOLIO_DATA.experience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        <SkillsGrid />

        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-purple-500 font-mono tracking-widest text-sm uppercase">Innovation Lab</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Selected Works</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PORTFOLIO_DATA.projects.map((project, index) => (
              <FuturisticProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}
