import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import {
  Github, Linkedin, Mail, ChevronDown, Cpu, Shield,
  Activity, Terminal, Menu, X, Play, Leaf, ExternalLink
} from 'lucide-react';

// --- DATA SOURCE ---
// Note: For skills, I added placeholder URLs. 
// You can replace "https://cdn.jsdelivr.net..." with your local image paths if you have them.
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
    // Ensure these images exist in your public folder
    avatar: "av1-copy.png",
    avatar2: "av2.png",
    av7: "av73.png", // Main About Image
    av71: "av73-bg.png", // Floating Image for Name Hover
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
  // UPDATED SKILLS STRUCTURE WITH ICONS
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

// --- LEAF CURTAIN PRELOADER ---
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
      color: Math.random() > 0.5 ? "text-emerald-600" : "text-green-800"
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
        className="w-1/2 h-full bg-green-950 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/40 to-black/80"></div>
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
        className="w-1/2 h-full bg-green-950 relative overflow-hidden shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-bl from-green-900/40 to-black/80"></div>
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
            <Leaf size={64} className="text-emerald-500 mx-auto animate-pulse" />
          </motion.div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-widest font-mono">I Welcome You</h1>
          <p className="text-emerald-500 mt-2 font-mono text-sm">To My Portfolio... 🍃</p>
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-bold text-white tracking-tighter cursor-pointer">
          DT<span className="text-blue-500">.</span>
        </a>
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-wider">
              {link.name}
            </a>
          ))}
        </div>
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-8 flex flex-col items-center gap-6 md:hidden">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-lg font-medium text-slate-300 hover:text-blue-400">
              {link.name}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const MinimalistGradient = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/40 via-black to-black opacity-80" />
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-blue-900/10 to-transparent blur-3xl" />
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

  // Smooth spring animation for the image movement
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    mouseX.set(clientX - 100); // Offset to center the image roughly
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
          className="w-48 h-48 object-cover rounded-xl shadow-2xl border-2 border-white/20 backdrop-blur-md"
        />
      </motion.div>

      <motion.div style={{ y: yText, opacity: opacityText }} className="z-10 text-center px-6 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          // UPDATED CLASSNAME BELOW:
          className="mb-8 relative w-fit mx-auto"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 blur-2xl opacity-20 animate-pulse"></div>
          <img
            src={PORTFOLIO_DATA.personal.avatar}
            alt="Profile"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/10 object-cover bg-slate-950"
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
            className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white mb-6 hover:text-blue-500 transition-colors duration-300"
          >
            {PORTFOLIO_DATA.personal.name}
          </motion.h1>
        </div>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-blue-400 font-medium mb-2 font-mono"
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
        className="absolute bottom-10 z-10 animate-bounce text-slate-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

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
            <div className="absolute -inset-4 bg-blue-500/20 rounded-[30px] blur-2xl -z-10"></div>
            <img
              src={PORTFOLIO_DATA.personal.av7}
              alt="About Me"
              className="relative w-72 h-80 object-cover rounded-[30px] shadow-2xl border border-white/10"
            />
          </motion.div>
        </div>

        {/* Right: Cinematic Text */}
        <div className="w-full md:w-2/3 text-left">
          <span className="text-blue-500 font-mono tracking-widest text-sm uppercase mb-2 block">Deepayan Thakur - A Journey of Mine</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">The Developer Behind the Code</h2>

          <div className="min-h-[180px] md:min-h-[120px] mb-8">
            {!isTyping && !displayedText ? (
              <div className="flex flex-col items-start">
                <p className="text-slate-500 italic mb-6">To access restricted data about the developer, please authenticate.</p>
                <button
                  onClick={() => setIsTyping(true)}
                  className="group flex items-center gap-3 px-6 py-3 bg-slate-950 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
                >
                  <Play size={18} className="fill-current " />
                  <span className="font-mono text-sm tracking-wider">INITIALIZE THIS ...</span>
                </button>
              </div>
            ) : (
              <p className="text-lg text-slate-300 leading-relaxed font-light border-l-2 border-blue-500 pl-6">
                {displayedText}
                <span className="animate-pulse text-blue-400">|</span>
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
        <span className="text-blue-400 font-mono text-sm tracking-widest">{item.date}</span>
        <h3 className="text-2xl font-bold text-white mt-1">{item.company}</h3>
        <h4 className="text-xl text-slate-400 font-light">{item.role}</h4>
      </motion.div>
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute left-[-5px] md:left-1/2 md:-ml-[6px] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
      ></motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:text-right md:pr-12'}`}
      >
        <p className="text-slate-400 leading-relaxed bg-slate-900/40 p-6 rounded-lg border border-slate-800 backdrop-blur-sm hover:border-blue-500/30 transition-colors">
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
};

// --- UPDATED SKILLS GRID WITH IMAGES ---
const SkillsGrid = () => {
  return (
    <section className="py-20 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-blue-500 font-mono tracking-widest text-sm uppercase">Technical Arsenal</span>
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
            className="group relative flex flex-col items-center justify-center p-6 bg-slate-900/30 border border-slate-800/50 rounded-2xl hover:bg-slate-800/50 hover:border-blue-500/30 transition-all duration-300"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-blue-500/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

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

const ProjectCard = ({ project, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative w-full md:w-[48%] xl:w-[48%] h-[500px] bg-slate-950 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-500"
    >
      <div className="absolute inset-0 h-2/3 bg-black overflow-hidden">
        <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 bg-gradient-to-br from-blue-900 to-purple-900`} />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + index * 5, repeat: Infinity, ease: "linear" }}
            className="w-[300px] h-[300px] border border-slate-800 rounded-full absolute border-dashed opacity-50"
          />
          <div className="text-blue-500/80 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:scale-110">
            {project.icon}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-2 block">{project.category}</span>
          <h3 className="text-3xl font-bold text-white mb-3 flex items-center gap-2">
            {project.title}
            <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
          </h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-xs text-slate-300 bg-slate-900 rounded-full border border-slate-800">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="bg-black border-t border-slate-900 py-32 px-6 relative overflow-hidden">
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

        <h2 className="mt-10 text-4xl md:text-6xl font-bold text-white mb-8">Thank you for <span className="text-[#4285F4]">Your</span> Time</h2>
        <div className="mt-20 text-slate-600 text-sm">
          <p>© 2025 Deepayan Thakur. Designed with AI Intelligence.</p>
        </div>
      </div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-900/20 blur-[120px] rounded-full"></div>
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

      <main className="bg-black min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white font-sans overflow-x-hidden">
        <MinimalistGradient />
        <NavBar />
        <Hero />
        <AboutMeSection />

        <section id="experience" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <span className="text-blue-500 font-mono tracking-widest text-sm uppercase">Career Trajectory</span>
            <img src={PORTFOLIO_DATA.personal.avatar2} alt="Profile" className="relative w-34 h-34 rounded-full border border-slate-800 object-cover mx-auto my-6 bg-slate-950" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Experience & Internships</h2>
          </motion.div>
          <div className="relative">
            {PORTFOLIO_DATA.experience.map((item, index) => (
              <ExperienceCard key={item.id} item={item} index={index} />
            ))}
          </div>
        </section>

        {/* REPLACED TICKER WITH GRID */}
        <SkillsGrid />

        <section id="projects" className="py-32 px-6 max-w-7xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-blue-500 font-mono tracking-widest text-sm uppercase">Innovation Lab</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Selected Works</h2>
          </motion.div>

          <div className="flex flex-wrap gap-8 justify-center">
            {PORTFOLIO_DATA.projects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </section>

        <Contact />
      </main>
    </>
  );
}
