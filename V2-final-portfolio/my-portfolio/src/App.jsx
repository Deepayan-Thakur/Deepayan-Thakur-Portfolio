import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, ChevronDown, Cpu, Shield, Activity, Database, Terminal, Code2, Menu, X, Play } from 'lucide-react';

// --- DATA SOURCE (From CV & GitHub) ---
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
    avatar: "av1-copy.png",
    avatar2: "av2.png",
    avatar3: "av3.png",
    avatar4: "av5.png",
    Deepayan_Thakur: "Deepayan_Thakur.png",
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
    "Python", "Deep Learning", "CNNs", "Computer Vision",
    "Java", "SQL", "Android Dev", "Data Science", "React"
  ]
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
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-black/50 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" onClick={(e) => scrollToSection(e, '#home')} className="text-2xl font-bold text-white tracking-tighter">
          DT<span className="text-blue-500">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-sm font-medium text-slate-300 hover:text-blue-400 transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 py-8 flex flex-col items-center gap-6 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-lg font-medium text-slate-300 hover:text-blue-400"
            >
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
      {/* Main Radiant Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-950/40 via-black to-black opacity-80" />

      {/* Subtle Blue Glow Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full" />
    </div>
  );
};

// --- SECTIONS ---

const Hero = () => {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, 150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        style={{ y: yText, opacity: opacityText }}
        className="z-10 text-center px-6 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative inline-block"
        >
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 blur-lg opacity-30 animate-pulse"></div>
          <img
            src={PORTFOLIO_DATA.personal.avatar}
            alt="Profile"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 object-cover mx-auto"
          />
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-5xl md:text-8xl font-extrabold tracking-tighter text-white mb-6"
        >
          {PORTFOLIO_DATA.personal.name}
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-blue-400 font-medium mb-2"
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showFloating, setShowFloating] = useState(false);


  useEffect(() => {
    if (isTyping && displayedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1));
      }, 30); // Typing speed
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
        {/* Left: Image */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end">
          <div
            className="relative group perspective-1000"
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              setShowFloating(true);

              const card = e.currentTarget.querySelector(".tilt-card");
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              card.style.transform = `rotateY(${x / 25}deg) rotateX(${-y / 25}deg) scale(1.08)`;
            }}
            onMouseLeave={(e) => {
              setShowFloating(false);
              const card = e.currentTarget.querySelector(".tilt-card");
              card.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
            }}
          >

            {/* Glow */}
            <div className="absolute -inset-2 rounded-[30px] bg-gradient-to-br from-purple-500 to-blue-600 opacity-40 blur-xl 
        group-hover:blur-2xl group-hover:opacity-70 transition-all duration-700"></div>

            {/* Main Card */}
            <div
              className="tilt-card relative rounded-[30px] border border-slate-800 shadow-2xl overflow-hidden 
       transition-all duration-500 ease-[cubic-bezier(.215,.61,.355,1)]"
            >
              <img
                src={PORTFOLIO_DATA.personal.avatar3}
                alt="About Me"
                className="relative w-64 h-64 md:w-50 md:h-50 object-cover rounded-[30px]"
              />

              {/* Shine overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 
            group-hover:opacity-80 transition-opacity duration-700 pointer-events-none"></div>
            </div>

            {/* Mouse-follow floating image */}
            {showFloating && (
              <img
                src={PORTFOLIO_DATA.personal.Deepayan_Thakur}
                alt="floating-follow"
                className="pointer-events-none w-55 h-55 rounded-xl border border-slate-700 shadow-2xl 
          absolute z-50 transition-transform duration-75 ease-linear"
                style={{
                  transform: `translate(${mousePos.x + 20}px, ${mousePos.y - 120}px)`
                }}
              />
            )}
          </div>
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
                  className="group flex items-center gap-3 px-6 py-3 bg-slate-900 border border-blue-500/30 hover:border-blue-500 text-blue-400 hover:text-white rounded-full transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)] cursor-pointer"
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
    </section >
  );
};

const ExperienceCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="relative pl-8 md:pl-0 mb-16 md:mb-24 flex flex-col md:flex-row md:items-center gap-6">
      {/* Timeline Line (Desktop) */}
      <div className="hidden md:block absolute left-1/2 -ml-[1px] w-[2px] h-full bg-slate-800 -z-10 top-0"></div>

      {/* Date (Left or Right based on index) */}
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

      {/* Center Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: 0.3, type: "spring" }}
        className="absolute left-[-5px] md:left-1/2 md:-ml-[6px] w-3 h-3 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)] z-10"
      ></motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.2, duration: 0.8 }}
        className={`md:w-1/2 ${index % 2 === 0 ? 'md:order-2 md:pl-12' : 'md:text-right md:pr-12'}`}
      >
        <p className="text-slate-400 leading-relaxed bg-slate-900/50 p-6 rounded-lg border border-slate-800/50 hover:border-blue-500/30 transition-colors">
          {item.desc}
        </p>
      </motion.div>
    </div>
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
      className="group relative w-full md:w-[48%] xl:w-[48%] h-[500px] bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 hover:border-blue-500/50 transition-all duration-500"
    >
      {/* Abstract Generative Art Header */}
      <div className="absolute inset-0 h-2/3 bg-slate-950 overflow-hidden">
        <div className={`absolute inset-0 opacity-30 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br from-blue-900/40 to-purple-900/40`} />

        {/* Generative Visuals based on ID */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Animated Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20 + index * 5, repeat: Infinity, ease: "linear" }}
            className="w-[300px] h-[300px] border border-slate-700/50 rounded-full absolute border-dashed"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15 + index * 3, repeat: Infinity, ease: "linear" }}
            className="w-[200px] h-[200px] border border-blue-500/20 rounded-full absolute"
          />
          <div className="text-blue-500/80 group-hover:text-blue-400 transition-colors duration-300 transform group-hover:scale-110">
            {project.icon}
          </div>
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-slate-950 via-slate-950 to-transparent p-8 flex flex-col justify-end">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <span className="text-blue-400 text-xs font-mono uppercase tracking-widest mb-2 block">{project.category}</span>
          <h3 className="text-3xl font-bold text-white mb-3">{project.title}</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t, i) => (
              <span key={i} className="px-3 py-1 text-xs text-slate-300 bg-slate-800 rounded-full border border-slate-700">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SkillsTicker = () => {
  return (
    <div className="w-full overflow-hidden bg-slate-950/50 border-y border-slate-900 py-6 mb-20 backdrop-blur-sm">
      <div className="flex whitespace-nowrap">
        <motion.div
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-16 px-8"
        >
          {[...PORTFOLIO_DATA.skills, ...PORTFOLIO_DATA.skills, ...PORTFOLIO_DATA.skills].map((skill, i) => (
            <span key={i} className="text-2xl font-bold text-slate-700 uppercase tracking-widest hover:text-blue-500 transition-colors cursor-default">
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="bg-slate-950 border-t border-slate-900 py-32 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto text-center z-10 relative">
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8">Ready to Innovate?</h2>
        <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto">
          Whether it's deep learning research or scalable software architecture, I am ready to join your team.
        </p>

        <div className="flex justify-center gap-8">
          <a
            href={PORTFOLIO_DATA.personal.github}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300"
          >
            <Github size={24} />
          </a>
          <a
            href={PORTFOLIO_DATA.personal.linkedin}
            target="_blank"
            rel="noreferrer"
            className="p-4 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="p-4 rounded-full bg-slate-900 border border-slate-800 text-white hover:bg-blue-600 hover:border-blue-500 hover:scale-110 transition-all duration-300"
          >
            <Mail size={24} />
          </a>
        </div>

        <div className="mt-20 text-slate-600 text-sm">
          <p>© 2025 Deepayan Thakur. Designed with AI Intelligence.</p>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default function App() {
  return (
    <main className="bg-black min-h-screen text-slate-200 selection:bg-blue-500 selection:text-white font-sans">
      <MinimalistGradient />
      <NavBar />

      {/* Hero Section */}
      <Hero />

      {/* ABOUT SECTION (REPLACES DUPLICATE EXPERIENCE) */}
      <AboutMeSection />

      {/* Experience Timeline */}
      <section id="experience" className="py-32 px-6 max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-blue-500 font-mono tracking-widest text-sm uppercase">Career Trajectory</span>
          <img
            src={PORTFOLIO_DATA.personal.avatar}
            alt="Profile"
            className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-2 object-cover mx-auto my-6 border-slate-800"
          />
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">Experience & Internships</h2>
        </motion.div>

        <div className="relative">
          {PORTFOLIO_DATA.experience.map((item, index) => (
            <ExperienceCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* Skills Marquee */}
      <SkillsTicker />

      {/* Projects Grid */}
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

      {/* Contact / Footer */}
      <Contact />
    </main>
  );
}