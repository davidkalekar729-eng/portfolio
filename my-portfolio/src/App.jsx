import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [activeTab, setActiveTab] = useState('all');
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [activeModalProject, setActiveModalProject] = useState(null);

  // Air Canvas Simulation State
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawColor, setDrawColor] = useState('#06b6d4');
  const [brushSize, setBrushSize] = useState(4);
  const [virtualHandPos, setVirtualHandPos] = useState({ x: 150, y: 100 });

  const skills = {
    "Prompt Engineering & AI Tools": [
      "Prompt Architecture",
      "Few-Shot / Chain-of-Thought",
      "LLM Context Optimization",
      "ChatGPT / Claude / Gemini API",
      "Notion AI / Canva AI Integration"
    ],
    "AI & Computer Vision": [
      "OpenCV",
      "YOLOv8",
      "MediaPipe",
      "Gesture Recognition",
      "HSV Color Masking"
    ],
    "Languages & Core": ["C", "C++", "Python", "SQL & DBMS", "OOPs Architecture"],
    "Tools & Frameworks": ["Git", "GitHub", "Visual Studio Code", "MSYS2", "Tailwind CSS", "React"]
  };

  const languages = ["English", "Kannada", "Hindi", "Telugu", "Marathi"];

  const projects = [
    // --- PROMPT ENGINEERING & AI TOOLS PROJECTS (From LinkedIn Posts) ---
    {
      id: 1,
      category: "prompt",
      title: "AI Resume & Cover Letter Generator",
      tagline: "Project #1 • Prompt Engineering in Action",
      description: "Designed structured, multi-turn prompts to generate ATS-friendly resumes, personalized cover letters, LinkedIn summaries, and interview prep guides using AI tools.",
      tech: ["Prompt Engineering", "ChatGPT", "Notion", "Canva"],
      metrics: "ATS-Ready Output",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Iterative prompt evolution from basic persona roles to senior recruiter constraints.",
        "Generates highly formatted, tailored cover letters based on specific job descriptions.",
        "Optimized prompt context window for maximum accuracy and minimal hallucination."
      ]
    },
    {
      id: 2,
      category: "prompt",
      title: "AI Interview Coach",
      tagline: "Project #2 • Personal AI Interview Trainer",
      description: "Built an interactive AI interview training simulator that conducts mock technical & HR interviews, assesses response quality, and gives actionable feedback.",
      tech: ["Prompt Engineering", "LLMs", "Notion", "Canva"],
      metrics: "Mock Interview Sim",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Prompt evolution from simple Q&A to senior engineering interviewer role-play.",
        "Provides 1-10 scoring breakdowns across technical clarity, confidence, and structure.",
        "Dynamic question difficulty adjustment based on user performance."
      ]
    },
    {
      id: 3,
      category: "prompt",
      title: "AI Email Writer Pro",
      tagline: "Project #3 • Context-Aware Professional Communication",
      description: "Constructed targeted prompt templates to draft professional, concise, and high-converting cold emails, outreach messages, and follow-ups in seconds.",
      tech: ["Prompt Engineering", "ChatGPT", "Email Automation"],
      metrics: "Instant Email Generation",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Multiple tone settings (formal, persuasive, concise, recruiter-focused).",
        "Extracts key points from raw notes and formats them into polished emails.",
        "Significantly reduces email composition time while boosting response rates."
      ]
    },
    {
      id: 4,
      category: "prompt",
      title: "AI Resume Analyzer Pro",
      tagline: "Project #5 • Pro ATS & Job Match Engine",
      description: "An AI-powered system that analyzes resumes against job descriptions, identifies skill gaps, calculates match percentages, and offers tailored improvement suggestions.",
      tech: ["Prompt Engineering", "LLM Analysis", "ATS Optimization"],
      metrics: "98% ATS Match Scoring",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Generates percentage match scores comparing candidate profiles to requirements.",
        "Highlights missing industry keywords and weak achievement bullet points.",
        "Provides step-by-step rewrites to maximize resume ranking."
      ]
    },
    {
      id: 5,
      category: "prompt",
      title: "AI Workflow & Content Automation Suite",
      tagline: "Project #4 • Multi-Tool AI Productivity Ecosystem",
      description: "Explored and integrated various AI application tools to build rapid content generation pipelines, visual mockups, and structured documentation workflows.",
      tech: ["AI Tools", "Prompt Design", "Workflow Automation"],
      metrics: "Multi-Tool Pipeline",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Leveraged LLMs and creative tools for automated presentation and visual creation.",
        "Streamlined technical blogging and documentation workflows.",
        "Demonstrates end-to-end prompt engineering methodologies."
      ]
    },

    // --- COMPUTER VISION PROJECTS ---
    {
      id: 6,
      category: "cv",
      title: "AI Invisible Cloak (Phantom Effect)",
      tagline: "Real-Time Chroma Key Background Extraction",
      description: "An optical camouflage application using OpenCV that captures initial background frames and dynamically substitutes specific HSV color masks to make objects invisible in real time.",
      tech: ["Python", "OpenCV", "NumPy", "HSV Masking"],
      metrics: "Sub-ms Frame Blending",
      github: "https://github.com/davidkalekar729-eng/AI-PHANTOM",
      highlights: [
        "Precise HSV color thresholding for clean cloak segmentation.",
        "Morphological transformations (dilation & erosion) to erase noise.",
        "Real-time video feed replacement with zero noticeable latency."
      ]
    },
    {
      id: 7,
      category: "cv",
      title: "AI Air Canvas",
      tagline: "Touchless Spatial Gesture Painting Studio",
      description: "Computer vision virtual drawing tool that tracks hand keypoints in real time, allowing users to draw in the air, change colors, and erase using finger movement.",
      tech: ["Python", "OpenCV", "MediaPipe", "cvzone"],
      metrics: "Zero-Touch Interface",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Tracks index fingertip landmark (Point 8) for smooth cursor movements.",
        "Dynamic UI header palette selection for real-time color switching.",
        "In-memory canvas frame buffering and clear screen gesture integration."
      ]
    },
    {
      id: 8,
      category: "cv",
      title: "AI Human Vision & Hand Tracker",
      tagline: "21-Keypoint Spatial Vector Pipeline",
      description: "Real-time gesture recognition interface using MediaPipe to map 21 3D hand keypoints and translate physical gestures into application commands.",
      tech: ["Python", "OpenCV", "MediaPipe"],
      metrics: "21 Landmark Keypoints",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Processes 21 key landmarks per hand at 30+ FPS.",
        "Euclidean vector math calculation for precise pinch & pinch-to-zoom gestures.",
        "Optimized for minimal CPU consumption during continuous webcam streaming."
      ]
    },

    // --- CORE & OOPS PROJECTS ---
    {
      id: 9,
      category: "core",
      title: "Modular C / C++ Engine Suite",
      tagline: "Code Alpha Internship Project • OOPs Architecture",
      description: "A series of structured console applications including a Tic-Tac-Toe game engine and arithmetic calculators built using strict C++ Object-Oriented principles.",
      tech: ["C", "C++", "OOPs Architecture", "MSYS2"],
      metrics: "Memory-Safe Logic",
      github: "https://github.com/davidkalekar729-eng",
      highlights: [
        "Implemented Encapsulation, Polymorphism, and Inheritance structures.",
        "Robust input validation and execution safety handling.",
        "Compiled and debugged using MinGW-w64 / MSYS2 toolchains."
      ]
    }
  ];

  const filteredProjects = activeTab === 'all'
    ? projects
    : projects.filter(p => p.category === activeTab);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("davidkalekar729@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Canvas air drawing setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setVirtualHandPos({ x, y });
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = drawColor;
    ctx.lineWidth = brushSize;
    ctx.lineTo(x, y);
    ctx.stroke();
    setVirtualHandPos({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-slate-950">
      
      {/* Background Lighting Effects */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/3 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Floating Glass Navigation */}
      <nav className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-2xl z-50 px-6 py-3.5 flex justify-between items-center shadow-2xl shadow-black/60">
        <a href="#" className="flex items-center gap-2.5 font-extrabold text-base tracking-tight">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent font-mono">
            Kalpana Kalekar
          </span>
        </a>
        <div className="flex items-center gap-6 text-xs md:text-sm font-medium text-slate-300">
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#demo" className="hover:text-cyan-400 transition-colors">Interactive Demo</a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">Projects ({projects.length})</a>
          <a href="#experience" className="hover:text-cyan-400 transition-colors">Experience</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
          <button
            onClick={() => setTerminalOpen(!terminalOpen)}
            className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-mono border border-slate-700 transition"
          >
            {terminalOpen ? "Close CLI" : ">_ CLI"}
          </button>
        </div>
      </nav>

      {/* Terminal View Drawer */}
      {terminalOpen && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl bg-slate-950/95 border border-cyan-500/30 rounded-2xl p-5 z-40 shadow-2xl font-mono text-xs text-slate-300 backdrop-blur-2xl">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3 mb-4">
            <span className="text-cyan-400">kalpana@kalekar-portfolio:~$ cat resume_summary.json</span>
            <button onClick={() => setTerminalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>
          <pre className="text-cyan-300/90 leading-relaxed overflow-x-auto">
{`{
  "name": "Kalpana Kalekar",
  "role": "Aspiring AI Engineer / Computer Vision & Prompt Developer",
  "education": "BCA @ Om Siddi Vinayak College (Graduation 2028)",
  "specializations": ["Prompt Engineering", "OpenCV & MediaPipe", "C/C++ OOPs"],
  "projects_built": 9,
  "internship": "C/C++ Programmer Intern @ Code Alpha",
  "location": "Bidar, Karnataka, India",
  "languages": ["English", "Kannada", "Hindi", "Telugu", "Marathi"]
}`}
          </pre>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-center px-6 pt-28 pb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-mono mb-6">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          BCA Student • AI & Prompt Engineer • Computer Vision Developer
        </div>

        <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight max-w-4xl leading-tight mb-6">
          Architecting <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">Prompt Systems</span> & Computer Vision AI.
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          Hi, I'm <strong className="text-white">Kalpana Kalekar</strong>—building 5+ advanced Prompt Engineering projects, real-time Computer Vision applications (Invisible Cloak, Air Canvas), and robust C++/Python software.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="#projects"
            className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold hover:brightness-110 transition shadow-lg shadow-cyan-500/25 active:scale-95 text-sm"
          >
            Explore All 9 Projects
          </a>
          <a
            href="#demo"
            className="px-7 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 font-bold hover:bg-slate-800 transition active:scale-95 text-sm"
          >
            Try Air Canvas Demo
          </a>
          <a
            href="https://github.com/davidkalekar729-eng"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 rounded-xl bg-slate-900 border border-slate-700/80 text-slate-200 font-bold hover:bg-slate-800 transition active:scale-95 flex items-center gap-2 text-sm"
          >
            <span>GitHub</span>
            <span className="text-slate-400">↗</span>
          </a>
        </div>

        {/* Key Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl w-full mt-16 p-6 bg-slate-900/60 border border-slate-800 rounded-2xl backdrop-blur-md">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-cyan-400">5+</p>
            <p className="text-xs text-slate-400 uppercase font-mono mt-1">Prompt Eng Projects</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-cyan-400">4+</p>
            <p className="text-xs text-slate-400 uppercase font-mono mt-1">Computer Vision Apps</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-cyan-400">Code Alpha</p>
            <p className="text-xs text-slate-400 uppercase font-mono mt-1">Internship Completed</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-extrabold text-cyan-400">5</p>
            <p className="text-xs text-slate-400 uppercase font-mono mt-1">Languages Spoken</p>
          </div>
        </div>
      </section>

      {/* Interactive Air Canvas Simulator Demo */}
      <section id="demo" className="relative z-10 py-20 px-6 max-w-5xl mx-auto border-t border-slate-800/60">
        <div className="text-center mb-8">
          <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">Interactive Vision Simulation</h2>
          <h3 className="text-3xl font-bold text-white mb-2">Virtual AI Air Canvas Demo</h3>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Experience the hand-tracking cursor logic behind my OpenCV Air Canvas project! Click and drag inside the screen below:
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-2xl backdrop-blur-md max-w-3xl mx-auto">
          {/* Controls Bar */}
          <div className="flex flex-wrap justify-between items-center gap-4 mb-4 pb-4 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-mono">Palette:</span>
              {['#06b6d4', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#ffffff'].map((c) => (
                <button
                  key={c}
                  onClick={() => setDrawColor(c)}
                  style={{ backgroundColor: c }}
                  className={`w-6 h-6 rounded-full border-2 transition ${drawColor === c ? 'border-white scale-110' : 'border-transparent'}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400 font-mono">Size:</span>
              <input
                type="range"
                min="2"
                max="12"
                value={brushSize}
                onChange={(e) => setBrushSize(Number(e.target.value))}
                className="w-24 accent-cyan-400"
              />
              <button
                onClick={clearCanvas}
                className="px-3 py-1.5 bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-xs rounded-lg hover:bg-rose-500/20 transition"
              >
                Clear Canvas
              </button>
            </div>
          </div>

          {/* Canvas Wrapper */}
          <div className="relative w-full h-[320px] bg-slate-950 border border-slate-800 rounded-xl overflow-hidden cursor-crosshair">
            <canvas
              ref={canvasRef}
              width={700}
              height={320}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-full"
            />
            
            {/* Gesture Simulator Hand Indicator Overlay */}
            <div
              className="pointer-events-none absolute w-5 h-5 rounded-full border-2 border-cyan-400 bg-cyan-400/20 -translate-x-1/2 -translate-y-1/2 transition-all duration-75 flex items-center justify-center text-[8px] font-mono text-cyan-300"
              style={{ left: `${virtualHandPos.x}px`, top: `${virtualHandPos.y}px` }}
            >
              🖐
            </div>

            <div className="absolute bottom-3 right-3 text-[10px] font-mono text-slate-500 bg-slate-900/80 px-2.5 py-1 rounded-md border border-slate-800">
              MediaPipe Keypoint ID: 8 (Index Fingertip)
            </div>
          </div>
        </div>
      </section>

      {/* About & Technical Skills Section */}
      <section id="about" className="relative z-10 py-24 px-6 max-w-5xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          <div className="md:w-1/2">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">01. Overview</h2>
            <h3 className="text-3xl font-bold text-white mb-6">Technical Competency & Background</h3>
            <p className="text-slate-300 text-base leading-relaxed mb-4">
              Driven BCA student at Om Siddi Vinayak College, Bidar. Dedicated to mastering Prompt Engineering methodologies, real-time Computer Vision pipelines, and Object-Oriented software architectures.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Demonstrated track record of building and sharing structured AI projects online—from ATS Resume Analyzers and AI Interview Coaches to Optical Invisible Cloaks and Air Canvases.
            </p>

            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">Multilingual Capabilities</h4>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <span key={lang} className="px-3 py-1.5 bg-slate-900 border border-slate-800 text-cyan-300 text-xs rounded-lg font-medium">
                  🌐 {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 w-full space-y-6">
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">02. Skill Matrix</h2>
            <h3 className="text-3xl font-bold text-white mb-6">Technical Architecture</h3>

            {Object.entries(skills).map(([category, items]) => (
              <div key={category} className="p-5 bg-slate-900/80 border border-slate-800 rounded-xl">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-3">{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-lg font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Experience & Education */}
      <section id="experience" className="relative z-10 py-24 px-6 max-w-5xl mx-auto border-t border-slate-800/60">
        <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">03. Career Timeline</h2>
        <h3 className="text-3xl font-bold text-white mb-12">Experience & Education</h3>

        <div className="space-y-8">
          <div className="relative pl-8 border-l-2 border-cyan-500/40">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-slate-950" />
            <div className="p-6 bg-slate-900/80 border border-slate-800 rounded-2xl">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <h4 className="text-xl font-bold text-white">C & C++ Programmer Intern</h4>
                  <p className="text-cyan-400 font-medium text-sm">Code Alpha</p>
                </div>
                <span className="px-3 py-1 bg-slate-800 text-slate-300 font-mono text-xs rounded-full">
                  10 Mar 2026 – 10 Apr 2026
                </span>
              </div>
              <ul className="list-disc list-inside text-slate-300 text-sm space-y-2 leading-relaxed">
                <li>Developed modular C/C++ applications adhering to Object-Oriented principles.</li>
                <li>Honed memory management, algorithmic debugging, and console UI architecture.</li>
                <li>Engineered robust software projects under strict execution standards.</li>
              </ul>
            </div>
          </div>

          <div className="relative pl-8 border-l-2 border-slate-800">
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-700 ring-4 ring-slate-950" />
            <div className="p-6 bg-slate-900/60 border border-slate-800 rounded-2xl">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-2">
                <div>
                  <h4 className="text-xl font-bold text-white">Bachelor of Computer Applications (BCA)</h4>
                  <p className="text-slate-400 font-medium text-sm">Om Siddi Vinayak College, Bidar, Karnataka</p>
                </div>
                <span className="px-3 py-1 bg-slate-800/80 text-slate-400 font-mono text-xs rounded-full">
                  Expected Graduation: 2028
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Showcase with Category Filtering */}
      <section id="projects" className="relative z-10 py-24 px-6 max-w-6xl mx-auto border-t border-slate-800/60">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div>
            <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">04. Portfolio Showcase</h2>
            <h3 className="text-3xl font-bold text-white">Featured Engineering Projects ({filteredProjects.length})</h3>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-2 rounded-lg transition ${activeTab === 'all' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setActiveTab('prompt')}
              className={`px-3.5 py-2 rounded-lg transition ${activeTab === 'prompt' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Prompt Engineering (5)
            </button>
            <button
              onClick={() => setActiveTab('cv')}
              className={`px-3.5 py-2 rounded-lg transition ${activeTab === 'cv' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              Computer Vision (3)
            </button>
            <button
              onClick={() => setActiveTab('core')}
              className={`px-3.5 py-2 rounded-lg transition ${activeTab === 'core' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'}`}
            >
              C / C++ OOPs (1)
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="group bg-slate-900/90 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all duration-300"
            >
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-0.5 rounded-full">
                    {proj.metrics}
                  </span>
                  <button
                    onClick={() => setActiveModalProject(proj)}
                    className="text-slate-400 hover:text-cyan-300 text-xs font-mono underline"
                  >
                    Details
                  </button>
                </div>
                <h4 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors mb-1">
                  {proj.title}
                </h4>
                <p className="text-xs text-slate-400 font-mono mb-4">{proj.tagline}</p>
                <p className="text-slate-300 text-xs leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {proj.tech.map((t) => (
                    <span key={t} className="text-[11px] font-mono bg-slate-950 text-slate-300 px-2.5 py-1 rounded-md border border-slate-800">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={proj.github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full inline-flex justify-center items-center gap-2 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-200 font-semibold group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all"
                >
                  View GitHub Repository &rarr;
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Project Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 relative text-left shadow-2xl">
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-lg"
            >
              ✕
            </button>
            <span className="text-xs font-mono text-cyan-400 uppercase">{activeModalProject.metrics}</span>
            <h3 className="text-2xl font-bold text-white mt-1 mb-2">{activeModalProject.title}</h3>
            <p className="text-slate-300 text-sm leading-relaxed mb-4">{activeModalProject.description}</p>
            
            <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Key Engineering Highlights</h4>
            <ul className="list-disc list-inside text-xs text-slate-300 space-y-2 mb-6">
              {activeModalProject.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>

            <div className="flex gap-3">
              <a
                href={activeModalProject.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-lg text-xs hover:bg-cyan-400 transition"
              >
                Inspect GitHub Repo
              </a>
              <button
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 border border-slate-700 text-slate-300 font-semibold rounded-lg text-xs hover:bg-slate-800 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Contact Section */}
      <section id="contact" className="relative z-10 py-24 px-6 max-w-3xl mx-auto border-t border-slate-800/60 text-center">
        <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-2">05. Communication</h2>
        <h3 className="text-3xl font-bold text-white mb-4">Get In Touch</h3>
        <p className="text-slate-400 text-sm mb-8">
          Based in Bidar, Karnataka, India. Available for software development internships, AI / Prompt Engineering opportunities, and computer vision projects.
        </p>

        <div className="inline-flex items-center gap-3 bg-slate-900 border border-slate-800 px-5 py-2.5 rounded-xl text-xs font-mono text-slate-300 mb-10">
          <span>davidkalekar729@gmail.com</span>
          <button
            onClick={handleCopyEmail}
            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded font-sans transition"
          >
            {copied ? "Copied! ✓" : "Copy"}
          </button>
        </div>

        <form className="flex flex-col gap-4 text-left" onSubmit={(e) => e.preventDefault()}>
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Your Email"
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <textarea
            rows="4"
            placeholder="Your Message"
            className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-400 transition"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          ></textarea>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-extrabold py-3.5 rounded-xl hover:brightness-110 transition shadow-lg shadow-cyan-500/20 active:scale-[0.99]"
          >
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-slate-800/80 text-center text-xs text-slate-500 font-mono">
        Designed & Built by Kalpana Kalekar • Powered by React & Tailwind CSS
      </footer>
    </div>
  );
}