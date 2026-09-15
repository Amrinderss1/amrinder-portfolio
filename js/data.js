/**
 * Personal Portfolio & Resume Data Configuration
 * Professional Profile for Amrinder Pal Singh
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Amrinder Pal Singh",
    brandName: "Amrinder",
    title: "Associate Consultant • Infosys Limited",
    statusBadge: "Building • Learning • Exploring",
    roles: [
      "Endpoint Management Engineer",
      "UEM Specialist",
      "Enterprise Mobility Engineer",
      "Software Builder",
      "Automation Enthusiast",
      "AI Explorer",
      "Science & Space Nerd"
    ],
    avatarUrl: "images/profile.jpg",
    bioShort: "Associate Consultant with 5+ years of experience in Endpoint Management and Enterprise Mobility. Skilled in Microsoft Intune, SCCM (MECM), VMware Workspace ONE (AirWatch), and Active Directory.",
    bioLong: [
      "I'm Amrinder, an Endpoint Management and Enterprise Mobility Engineer with 5+ years of experience across Microsoft Intune, SCCM (MECM) and VMware Workspace ONE.",
      "My professional journey started in enterprise IT operations and gradually moved into mobility management, endpoint deployment and UEM administration. Today, I work with enterprise devices, applications, compliance, configuration and endpoint-management workflows.",
      "But technology for me isn't limited to my job. I genuinely enjoy coding and building things in my own time. Personal projects have taken me into UEM tooling, automation, AI and simulations — usually starting with a simple thought of 'what if I built this?'",
      "And when I'm not doing that, I'm usually reading about science, space or technology, writing something fictional, watching The Big Bang Theory, following cricket, gaming, taking photographs or simply getting curious about something new."
    ],
    taglinePrimary: "Enterprise technology by profession. Building and exploring by curiosity.",
    location: "New Delhi, India",
    email: "sidhuamrinderpal@gmail.com",
    phone: null,
    showPhone: false,
    socials: [
      { name: "LinkedIn", icon: "linkedin", url: "https://www.linkedin.com/in/amrinderss1/" },
      { name: "GitHub", icon: "github", url: "https://github.com/Amrinderss1/" },
      { name: "Email", icon: "mail", url: "mailto:sidhuamrinderpal@gmail.com" }
    ]
  },

  stats: [
    { number: 5, suffix: "+", label: "Years Experience" },
    { number: 4, suffix: "", label: "Professional Projects" },
    { number: 6, suffix: "×", label: "On-the-Spot Awards" },
    { number: 3, suffix: "+", label: "Core UEM Platforms" }
  ],

  heroBadges: [
    { text: "5+ Years Experience", icon: "code" },
    { text: "6× On-the-Spot Awards", icon: "award" }
  ],

  highlights: [
    {
      title: "Endpoint Management",
      icon: "laptop-house",
      description: "Enterprise endpoint and mobility management across Windows, Android and iOS environments.",
      tags: ["Microsoft Intune", "Workspace ONE", "SCCM/MECM"]
    },
    {
      title: "Building Things",
      icon: "tools",
      description: "I enjoy turning ideas into working software, tools and experiments — especially when a problem is interesting enough to make me want to build the solution myself.",
      tags: ["Python", "PowerShell", "APIs"]
    },
    {
      title: "Curiosity",
      icon: "rocket",
      description: "From AI and automation to astrophysics and space, I have a habit of going down technical rabbit holes just because I want to understand how something works.",
      tags: ["AI", "Automation", "Science", "Space"]
    }
  ],

  experience: [
    {
      company: "Infosys Limited",
      role: "Associate Consultant – Mobility (MDM/MAM) Team",
      period: "Jan 2026 – Present",
      location: "India",
      description: "Manage enterprise devices using VMware Workspace ONE (AirWatch), including enrollment, compliance, and configuration management.",
      responsibilities: [
        "Manage devices using VMware Workspace ONE (AirWatch), including enrollment, compliance, and configuration management.",
        "Deploy enterprise applications and enforce device configuration profiles across managed endpoints.",
        "Administer compliance policies and support day-to-day MDM operations.",
        "Troubleshoot mobility-related issues and serve as the primary escalation point for device management incidents.",
        "Collaborate with client teams to ensure timely resolution of issues and adherence to SLA requirements."
      ],
      tags: ["Workspace ONE", "AirWatch", "Android MDM/MAM", "Compliance", "Config Profiles", "UEM"]
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "System Engineer – Deployment Team",
      period: "Feb 2024 – Dec 2025",
      location: "India",
      description: "Managed application deployments using SCCM and Microsoft Intune across LATAM and EMEA regions.",
      responsibilities: [
        "Managed application deployments using SCCM and Microsoft Intune across LATAM and EMEA regions.",
        "Investigated and resolved deployment failures through log analysis and troubleshooting.",
        "Implemented Windows Feature Updates and Quality Updates using Intune Update Rings.",
        "Managed co-management between SCCM and Intune in hybrid environments.",
        "Troubleshot Active Directory authentication and network-related deployment issues.",
        "Created SOPs and Knowledge Base articles for recurring issues and operational support."
      ],
      tags: ["Microsoft Intune", "SCCM/MECM", "Windows Updates", "Co-management", "PowerShell", "Active Directory"]
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Assistant System Engineer – Mobility (MDM) Team",
      period: "Feb 2023 – Feb 2024",
      location: "India",
      description: "Published Win32, MSI, and mobility applications globally using Microsoft Intune.",
      responsibilities: [
        "Published Win32, MSI, and mobility applications globally using Microsoft Intune.",
        "Handled escalations related to application deployment, compliance, and authentication issues.",
        "Managed compliance policies and configuration profiles for enterprise devices.",
        "Documented recurring issues and resolutions for Service Desk reference and operational support."
      ],
      tags: ["Microsoft Intune", "Win32", "MSI", "iOS", "Android", "MDM"]
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Programmer – Level 2 Operations",
      period: "Feb 2022 – Feb 2023",
      location: "India",
      description: "Monitored device compliance, resolved incidents, and managed application assignments.",
      responsibilities: [
        "Monitored device compliance, resolved incidents, and managed application assignments.",
        "Handled Active Directory requests including password resets, permissions, and account unlocks.",
        "Assisted in troubleshooting network and authentication-related issues for end users."
      ],
      tags: ["Active Directory", "Endpoint Support", "ServiceNow", "IT Operations"]
    },
    {
      company: "Tata Consultancy Services (TCS)",
      role: "Graduate Trainee",
      period: "Feb 2021 – Feb 2022",
      location: "India",
      description: "Supported enterprise IT operations and gained hands-on experience with Active Directory and endpoint support.",
      responsibilities: [
        "Supported enterprise IT operations and gained hands-on experience with Active Directory and endpoint support."
      ],
      tags: ["Active Directory", "Endpoint Support", "IT Operations", "ServiceNow"]
    },
    {
      company: "ARI Simulation Pvt. Ltd.",
      role: "Software Programmer Intern",
      period: "Jun 2019 – Aug 2019",
      location: "India",
      description: "Gained practical exposure to maritime simulation technologies and software engineering practices in a professional environment.",
      responsibilities: [
        "Gained practical exposure to maritime simulation technologies and software engineering practices in a professional environment."
      ],
      tags: ["Software Engineering", "Simulation Technology"]
    }
  ],

  projects: [
    {
      id: "project-uem-sentinel",
      title: "UEM Sentinel",
      category: "personal",
      categoryLabel: "Personal Project",
      subtitle: "Desktop Administration & Automation Console",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
      tags: ["Python", "PySide6", "SQLite", "REST APIs", "Ollama"],
      shortDesc: "Desktop administration tool for VMware Workspace ONE UEM (AirWatch) to monitor and manage endpoint operations.",
      fullDesc: "UEM Sentinel is a personal engineering project built around VMware Workspace ONE UEM. The project provides a desktop interface for monitoring and managing endpoint operations, combining UEM data retrieval, local caching, querying, and automation capabilities.",
      redactedNotice: "🔒 PRIVACY & SECURITY REDACTION: Live enterprise tenant keys, internal server endpoints, and proprietary production parameters are redacted for privacy and security reasons. Describing high-level anonymized architecture only.",
      whyIBuiltIt: "Built out of personal curiosity to explore how enterprise endpoint operations and UEM administration can be simplified and queried using modern desktop interfaces and local AI LLM integrations.",
      keyFeatures: [
        "Privacy & Security Protection: Production parameters redacted for security compliance.",
        "Integrated REST APIs and SQLite for data retrieval and local caching.",
        "Implemented natural language queries and reporting capabilities for administrative tasks."
      ],
      status: "Private Source / Redacted Demo",
      demoUrl: null,
      githubUrl: null,
      downloadUrl: null
    },
    {
      id: "project-mailer-app",
      title: "Universal Bulk Email Campaign Mailer",
      category: "personal",
      categoryLabel: "Personal Project",
      subtitle: "CustomTkinter GUI & Bulk Campaign Engine",
      image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&q=80&w=800",
      tags: ["Python", "CustomTkinter", "Pandas", "OpenPyXL", "SMTP"],
      shortDesc: "A standalone bulk email campaign management app built with CustomTkinter, Excel recipient list parsing, progress tracking, and state persistence.",
      fullDesc: "Universal Email Campaign Mailer is a full desktop GUI application built in Python using CustomTkinter. It allows loading recipient lists directly from Excel (.xlsx) files via Pandas & OpenPyXL, attaching custom files, monitoring campaign execution in real-time, saving progress in mailer_state.json, and sending authenticated emails via SMTP.",
      whyIBuiltIt: "Built to streamline bulk campaign dispatches with a sleek modern dark mode desktop interface and state persistence.",
      keyFeatures: [
        "CustomTkinter Dark Mode GUI with real-time campaign progress tracking.",
        "Excel (.xlsx) recipient list loading and dynamic column parsing via Pandas & OpenPyXL.",
        "Campaign state recovery and automatic state persistence (mailer_state.json).",
        "Includes sample Excel template and source code created by Amrinder."
      ],
      status: "Downloadable App Package",
      demoUrl: null,
      githubUrl: null,
      downloadUrl: "downloads/Amrinder_Mailer_App_Created_by_Amrinder.zip",
      downloadLabel: "Download Mailer App (.zip) — Created by Amrinder"
    },
    {
      id: "project-self-destruct",
      title: "Voice-Activated Self Destruct Failsafe Console",
      category: "personal",
      categoryLabel: "Personal Project & Sci-Fi Story",
      subtitle: "Star Trek Inspired Voice Security System",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
      tags: ["Python", "SpeechRecognition", "pyttsx3", "Tkinter", "send2trash"],
      shortDesc: "A voice-authenticated failsafe console inspired by Star Trek self-destruct sequences, featuring voice verification, 60s countdown, soothing female TTS, and safe Recycle Bin triggers.",
      fullDesc: "How the idea came about: Inspired by Captain Kirk & Captain Picard's iconic voice-authenticated self-destruct countdown sequences in Star Trek ('Computer, this is Amrinder speaking. Initiate self destruct sequence code 101, 102...'), Amrinder built a complete Python desktop console! It features voice/passphrase authentication ('Computer this is Amrinder speaking'), 60s dramatic countdown, soothing female TTS feedback, and safe Recycle Bin triggers (using send2trash so no actual system damage occurs!).",
      videoUrl: "https://www.youtube.com/embed/XIm6_2NzIc4",
      videoTitle: "Inspiration: Star Trek Self-Destruct Sequence",
      whyIBuiltIt: "Built out of love for sci-fi and Star Trek, turning a movie trope into a working, voice-authenticated Python desktop app.",
      keyFeatures: [
        "Voice Passphrase Auth: 'Computer this is Amrinder speaking' (SpeechRecognition + fallback manual).",
        "Self Destruct Sequence Codes: Accepts codes 101, 102, 103, 104.",
        "60s Countdown Timer with Abort and 'No Mercy' lock controls.",
        "Soothing Female Voice Narration (pyttsx3).",
        "Safety Guaranteed: Uses send2trash to move files safely to Recycle Bin."
      ],
      status: "Downloadable App Package & Video Story",
      demoUrl: null,
      githubUrl: null,
      downloadUrl: "downloads/Amrinder_Self_Destruct_Failsafe_Console_Created_by_Amrinder.zip",
      downloadLabel: "Download Self Destruct Console (.zip) — Created by Amrinder"
    },
    {
      id: "project-enterprise-exp",
      title: "Professional Enterprise Project Experience",
      category: "enterprise",
      categoryLabel: "Professional Experience",
      subtitle: "4 Major Enterprise Implementations",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800",
      tags: ["Workspace ONE", "Microsoft Intune", "SCCM/MECM", "Active Directory"],
      shortDesc: "Over my career, I have contributed to four enterprise projects spanning endpoint management, enterprise mobility, application deployment and endpoint operations across global environments.",
      fullDesc: "Throughout my professional journey at Infosys and TCS, I have served as a core contributor across four major enterprise project environments. To honor client confidentiality, specific client brands and proprietary details remain undisclosed.",
      whyIBuiltIt: "Professional enterprise consulting and engineering engagements.",
      keyFeatures: [
        "Endpoint Management: Global device policy, compliance & profile administration across Windows, iOS, and Android.",
        "Mobility & MDM: AirWatch / Workspace ONE and Intune application publishing, enrollment & lifecycle workflows.",
        "Application Deployment: Enterprise-wide software distribution using SCCM/MECM and Intune Win32/MSI packaging.",
        "Endpoint Operations: L2 escalation support, Active Directory governance, and global OS update rings (EMEA/LATAM)."
      ],
      status: "Enterprise Client Engagements (Confidential)",
      demoUrl: null,
      githubUrl: null,
      downloadUrl: null
    }
  ],

  skillsCategorized: [
    {
      category: "Device & Endpoint Management",
      icon: "tablet-alt",
      items: ["Intune (iOS, Android, Windows)", "Compliance", "App Publishing", "Configuration Profiles", "SCCM: Application Deployment", "Task Sequences", "Co-Management", "Logs Analysis", "AirWatch (VMware Workspace ONE)", "Android MDM/MAM", "Application Lifecycle Management", "Device Enrollment", "Compliance Policy Enforcement", "Configuration Profile Deployment", "Patch Management: Feature/Quality Updates", "Windows Autopilot"]
    },
    {
      category: "Scripting & Tools",
      icon: "terminal",
      items: ["PowerShell", "Git", "ServiceNow (Admin/Dev)", "Jira", "Windows Server", "Azure Portal"]
    },
    {
      category: "Programming & Databases",
      icon: "code",
      items: ["Java", "Python", "C++", "C#", "Web (HTML, CSS, PHP, JavaScript, jQuery)", "MySQL", "SQLite"]
    }
  ],

  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Chandigarh University",
      period: "2024",
      description: "Post-graduate degree in computer applications and software development."
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "GGSIPU, Delhi",
      period: "2020",
      description: "Undergraduate degree focusing on computer applications, programming, and system fundamentals."
    }
  ],

  certifications: [
    {
      title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
      issuer: "Oracle",
      date: "Jan 2026"
    },
    {
      title: "Oracle Cloud Infrastructure 2025 Foundations Associate",
      issuer: "Oracle",
      date: "Jan 2026"
    },
    {
      title: "Intune with Microsoft Endpoint Manager",
      issuer: "Udemy",
      date: "Completed"
    },
    {
      title: "The Complete ServiceNow Developer Course",
      issuer: "Udemy",
      date: "Completed"
    },
    {
      title: "Programming in C++",
      issuer: "IIT Bombay",
      date: "Completed"
    },
    {
      title: "Java Programming",
      issuer: "IIT Bombay",
      date: "Completed"
    },
    {
      title: "PHP/MySQL Web Technologies",
      issuer: "Isaac IT Labs",
      date: "Completed"
    },
    {
      title: "Google Play Store Listing Certificate",
      issuer: "Google",
      date: "Completed"
    },
    {
      title: "Microsoft MD-102: Endpoint Administrator Associate",
      issuer: "Microsoft",
      date: "In Progress",
      status: "In Progress"
    }
  ],

  awards: [
    {
      title: "6× On-the-Spot Awards",
      subtitle: "6x On-the-Spot Awards for outstanding performance & client appreciations",
      period: "2022–2023",
      icon: "award"
    },
    {
      title: "Contextual Masters Award",
      subtitle: "Recognized for deep domain expertise and operational excellence",
      period: "Jan 2024",
      icon: "trophy"
    },
    {
      title: "Service Commitment Award",
      subtitle: "Honored for sustained dedication and exceptional service delivery",
      period: "Feb 2024",
      icon: "star"
    },
    {
      title: "Client Appreciation Notes",
      subtitle: "Formal written client commendations for timely incident resolutions",
      period: "Mar & Oct 2023",
      icon: "certificate"
    }
  ],

  beyondTheEnterprise: [
    {
      id: "card-coding",
      title: "I Like Building Things",
      icon: "code-branch",
      description: "I genuinely enjoy coding and creating projects in my own time. Some are practical tools, some are experiments, and some exist simply because I wanted to see if I could build them.",
      tags: ["UEM Tools", "Automation", "Simulators", "AI Experiments"]
    },
    {
      id: "card-space",
      title: "Science & Space",
      icon: "atom",
      description: "I'm a bit of a science nerd. Space, astrophysics, cosmology and the big questions about how the universe works can keep me occupied for hours.",
      tags: ["Space", "Astrophysics", "Cosmology", "Physics"]
    },
    {
      id: "card-tbbt",
      title: "The Big Bang Theory",
      icon: "tv",
      description: "Big fan of The Big Bang Theory — because apparently a software engineer, science nerd and someone who enjoys arguing about fictional universes needed one more thing in common.",
      tags: ["Science Humor", "Nerd Culture", "Sitcom Fan"]
    },
    {
      id: "card-writing",
      title: "Writing & Fan Fiction",
      icon: "pen-nib",
      description: "When I'm not writing code, I sometimes write stories. Fan fiction lets me explore familiar characters and worlds while experimenting with my own ideas and narratives.",
      tags: ["Creative Writing", "Storytelling", "World Building"]
    },
    {
      id: "card-cricket",
      title: "Cricket",
      icon: "baseball-ball",
      description: "Long-time cricket fan. I enjoy following the game, discussing teams and players, and occasionally getting far too invested in imaginary squads and tournament scenarios.",
      tags: ["Cricket", "Match Analytics", "Sports Fan"]
    },
    {
      id: "card-outside",
      title: "Beyond the Keyboard",
      icon: "compass",
      description: "Photography, gaming, fitness, travel and exploring whatever happens to catch my attention next.",
      tags: ["Photography", "Gaming", "Fitness", "Travel"]
    }
  ]
};
