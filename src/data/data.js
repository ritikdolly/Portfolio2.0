export const personalInfo = {
  name: "Ritik Kumar",
  role: "Full Stack Developer",
  titles: [
    "Backend Developer",
    "React Specialist",
    "Java Developer",
    "UI/UX Designer",
    "Frontend Developer",
    "Algorithm Enthusiast",
    "Software Tester",
  ],
  email: "ritik409kumar@gmail.com",
  phone: "+91-9798904589",
  linkedin: "https://www.linkedin.com/in/ritikkumar04/", // Example, user input "Ritik Kumar"
  github: "https://github.com/ritikdolly",
  leetcode: "https://leetcode.com/u/ritik_856/",
  summary:
    // "Entry-level Software Developer with hands-on experience in building scalable web applications. Passionate about creating premium user experiences and robust backend architectures.",
    "Passionate about building impactful applications, exploring new technologies, and gaining hands-on experience through real-world software development projects.",
    resumeUrl:
    "https://drive.google.com/file/d/1mMiBjkZR2WqrgX1vgn9PTM4HquFHxUNi/view?usp=drive_link", // Placeholder
};

export const skills = [
  {
    category: "Languages",
    description: "Proficient in multiple programming languages, focusing on clean and efficient code.",
    items: ["Java", "C", "Python", "JavaScript"],
    icon: "code",
  },
  {
    category: "Frontend",
    description: "Building responsive and interactive UIs using modern frameworks and styling libraries.",
    items: [
      "ReactJS",
      "Angular",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Framer Motion",
      "Redux",
    ],
    icon: "layers",
  },
  {
    category: "Backend",
    description: "Developing robust server-side logic and scalable REST APIs with Spring Boot.",
    items: [
      "Spring Boot",
      "Spring MVC",
      "Spring Security",
      "REST APIs",
      "Hibernate",
      "Advance Java"
    ],
    icon: "database",
  },
  {
    category: "Quality & Testing",
    description: "Ensuring application reliability through rigorous manual testing and quality assurance.",
    items: [
      "Manual Testing",
      "Bug Tracking",
      "Test Case Design",
      "STLC",
      "SDLC Integration",
    ],
    icon: "check",
  },
  {
    category: "Databases & Tools",
    description: "Managing data efficiently and utilizing tools for seamless development workflows.",
    items: [
      "MySQL", 
      "MongoDB", 
      "Docker", 
      "Git", 
      "Postman",
    ],
    icon: "settings",
  },
  {
    category: "Core Concepts",
    description: "Strong grasp of CS fundamentals for building scalable and optimized systems.",
    items: [
      "Data Structures and Algorithms",
      "System Design",
      "Microservices",
      "Operating System"
    ],
    icon: "cpu",
  },
];

export const projects = [
  {
    id: 1,
    title: "Testavax – Online Coding Assessment Platform",
    description:
      "Built an online coding assessment platform for creating and solving coding tests. Implemented Docker-based code execution for secure compilation and automated evaluation using predefined test cases. Developed REST APIs and scoring logic to track submissions and evaluate student performance.",
    tech: ["React", "Spring Boot", "MySQL", "Docker"],
    features: [
      "Docker-based code execution sandbox",
      "Automated evaluation with predefined test cases",
      "REST APIs for tracking submissions",
    ],
    github: "https://github.com/ritikdolly/codeEditorfd",
    liveUrl: "https://code-editorfd.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    date: "Mar 2026",
  },
  {
    id: 2,
    title: "Mentoring Application",
    description:
      "Built a modular ERP platform for 200+ students with role-based dashboards. Automated semester workflows, reducing manual effort by 40%. Optimized backend queries to improve data retrieval speed and performance.",
    tech: ["ReactJS", "Spring Boot", "SQL", "Tailwind"],
    features: [
      "Role-based dashboards",
      "Automated semester workflows",
      "Optimized backend queries",
    ],
    github: "https://github.com/ritkdolly/MentoringApplication",
    // liveUrl: "https://mentoring-application.vercel.app/",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026&auto=format&fit=crop",
    date: "Nov 2025",
  },
  {
    id: 3,
    title: "Face Recognition Attendance System",
    description:
      "Developed a full-stack Face Recognition Attendance System using React.js, Python (Flask), and MongoDB to automate attendance with real-time face recognition. Applied Computer Vision techniques including facial encoding, image processing, and model training on student datasets for accurate identification. Built RESTful APIs and backend automation for course management, student data handling, and attendance storage.",
    tech: ["Python", "ReactJS", "MongoDB", "Flask","OpenCV"],
    features: [
      "Real-time face recognition attendance",
      "Computer Vision & facial encoding",
      "Backend automation and course management",
    ],
    github: "https://github.com/ritikdolly/face_recognition_attendance_system",
    liveUrl: "#",
    image:
    // "data:image/jpeg;base64,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",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRbH_uxGn3EZNeYhoogXI0CRaRXy5Waae98zQ&s",
    date: "Apr 2025",
  },
  {
    id: 4,
    title: "Banking Management System",
    description:
      "Designed secure account management and fund transfer modules. Improved database query performance by 30%. Applied SDLC principles and design patterns to enhance reliability.",
    tech: ["Servlet", "MySQL", "JSP", "JDBC", "REST API"],
    features: [
      "Secure fund transfer modules",
      "Improved query performance",
      "Applied design patterns",
    ],
    github: "https://github.com/ritikdolly/BankingSystem",
    liveUrl: "#",
    image:
      "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=2070&auto=format&fit=crop",
    date: "Oct 2024",
  },
  {
    id: 5,
    title: "PLH – Full-Stack Food Delivery Platform",
    description:
      "A comprehensive food ordering application featuring a seamless delivery experience. Developed with a full-stack architecture to handle secure payments, real-time order tracking, and a dedicated admin panel for restaurant management.",
    tech: ["React", "Spring Boot", "MySQL", "Tailwind CSS", "Razorpay"],
    features: [
      "Secure payment integration with Razorpay",
      "Real-time order tracking and status updates",
      "Role-based access (Admin, Customer, Delivery Partner)",
    ],
    github: "https://github.com/ritikdolly/PHLAppBD",
    liveUrl: "#",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=2028&auto=format&fit=crop",
    date: "Jan 2026",
  },
];

export const education = [
  {
    degree: "Bachelor of Technology (B.Tech), Computer Science Engineering",
    institution:
      "Centurion University of Technology and Management, Bhubaneswar (Odisha) - 752050",
    period: "2022 - 2026",
    description: "Domain: Software Technology",
    // "CGPA: 8.79 * 10 (Equivalent to 87.9%) | Domain: Software Technology",
    resultLink: "", // Add your B.Tech result/marksheet Google Drive link here
  },
  {
    degree: "Intermediate (12th), Science Stream",
    institution: "Pitts Modern School, Gomia, Bokaro (Jharkhand) - 829112",
    period: "2021 - 2022",
    description: "Subject: PCMCs.",
    resultLink: "", // Add your 12th result Google Drive link here
  },
  {
    degree: "Matriculation (10th)",
    institution: "Pitts Modern School, Gomia, Bokaro (Jharkhand) - 829112",
    period: "2019 - 2020",
    // description: "Percentage: 60.4%",
    resultLink: "", // Add your 10th result Google Drive link here
  },
];

export const certifications = [
  {
    title: "Java Full Stack",
    issuer: "Wipro Talent-Next",
    date: "2025",
    link: "https://drive.google.com/file/d/1kKJrLshc3yqCI4TJZjgUdkwm1dIS3neR/view?usp=drive_link",
  },
  {
    title: "Data Structures & Algorithms",
    issuer: "GeeksforGeeks",
    date: "2025",
    link: "https://drive.google.com/file/d/12lssy7feyfIHHDLRht7khUHZjtnJMY8o/view?usp=drive_link",
  },
  {
    title: "Java Programming & Problem Solving",
    issuer: "Code Chef",
    date: "2023",
    link: "https://drive.google.com/file/d/1J-atnLu2re6MlF-DbHnF39Phz7FTVodO/view?usp=drive_link",
  },
  {
    title: "TCS iON Career Edge - Young Professional",
    issuer: "TCS iON",
    date: "2025",
    link: "https://drive.google.com/file/d/1_jZKDR5ws6urINlQBPUhZPFKLqqeTJFl/view?usp=drive_link",
  },
];
