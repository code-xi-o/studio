import type { Roadmap } from '@/types/roadmap';
import { BrainCircuit, Bot, ShieldCheck, Code2, DatabaseZap } from 'lucide-react';

export const roadmaps: Roadmap[] = [
  {
    id: 'ai-ml',
    slug: 'ai-ml',
    title: 'Artificial Intelligence & Machine Learning',
    description: 'Master the fundamentals and advanced concepts of AI and Machine Learning, from algorithms to deployment.',
    icon: BrainCircuit,
    modules: [
      {
        id: 'aiml-m1',
        title: 'Foundations of AI & ML',
        description: 'Understand the core principles, mathematics, and programming languages essential for AI/ML.',
        resources: [
          { id: 'aiml-r1', title: 'Python for Data Science', type: 'course', url: '#', description: 'Learn Python, the primary language for AI/ML.' },
          { id: 'aiml-r2', title: 'Linear Algebra for ML', type: 'article', url: '#', description: 'Key mathematical concepts.' },
          { id: 'aiml-r3', title: 'Calculus & Probability for ML', type: 'course', url: '#', description: 'Essential math for understanding algorithms.' },
        ],
      },
      {
        id: 'aiml-m2',
        title: 'Machine Learning Algorithms',
        description: 'Explore various supervised, unsupervised, and reinforcement learning algorithms.',
        resources: [
          { id: 'aiml-r4', title: 'Supervised Learning In-Depth', type: 'video', url: '#', description: 'Regression, Classification techniques.' },
          { id: 'aiml-r5', title: 'Unsupervised Learning Techniques', type: 'course', url: '#', description: 'Clustering, Dimensionality Reduction.' },
          { id: 'aiml-r6', title: 'Intro to Reinforcement Learning', type: 'article', url: '#', description: 'Basics of RL agents and environments.' },
        ],
      },
      {
        id: 'aiml-m3',
        title: 'Deep Learning',
        description: 'Dive into neural networks, CNNs, RNNs, and popular deep learning frameworks.',
        resources: [
          { id: 'aiml-r7', title: 'Deep Learning Specialization (Coursera)', type: 'course', url: '#', description: 'Comprehensive course by Andrew Ng.' },
          { id: 'aiml-r8', title: 'TensorFlow and Keras Guide', type: 'documentation', url: '#', description: 'Official docs for popular frameworks.' },
          { id: 'aiml-r9', title: 'PyTorch Tutorials', type: 'documentation', url: '#', description: 'Learn PyTorch step by step.' },
        ],
      },
      {
        id: 'aiml-m4',
        title: 'Natural Language Processing (NLP)',
        description: 'Learn how machines process and understand human language.',
        resources: [
          { id: 'aiml-r10', title: 'Stanford CS224n: NLP with Deep Learning', type: 'course', url: '#', description: 'Advanced NLP course.' },
          { id: 'aiml-r11', title: 'Hugging Face Transformers', type: 'tool', url: '#', description: 'State-of-the-art NLP models.' },
        ],
      },
    ],
  },
  {
    id: 'ai-ds',
    slug: 'ai-ds',
    title: 'AI & Data Science',
    description: 'Learn to extract insights from data using AI techniques, statistical analysis, and visualization.',
    icon: DatabaseZap,
    modules: [
      {
        id: 'aids-m1',
        title: 'Data Science Fundamentals',
        description: 'Core concepts including data collection, cleaning, processing, and exploratory data analysis (EDA).',
        resources: [
          { id: 'aids-r1', title: 'Pandas for Data Manipulation', type: 'course', url: '#', description: 'Master data handling with Pandas.' },
          { id: 'aids-r2', title: 'NumPy for Numerical Computing', type: 'documentation', url: '#', description: 'Essential for scientific computing.' },
          { id: 'aids-r3', title: 'Data Visualization with Matplotlib & Seaborn', type: 'course', url: '#', description: 'Techniques for visualizing data.' },
        ],
      },
      {
        id: 'aids-m2',
        title: 'Statistical Analysis & Inference',
        description: 'Understand statistical methods for data analysis and hypothesis testing.',
        resources: [
          { id: 'aids-r4', title: 'Think Stats: Probability and Statistics for Programmers', type: 'article', url: '#', description: 'Practical statistics book.' },
          { id: 'aids-r5', title: 'Hypothesis Testing in Python', type: 'video', url: '#', description: 'Learn to perform hypothesis tests.' },
        ],
      },
      {
        id: 'aids-m3',
        title: 'Machine Learning for Data Science',
        description: 'Apply machine learning models to solve data science problems like prediction and classification.',
        resources: [
          { id: 'aids-r6', title: 'Scikit-learn User Guide', type: 'documentation', url: '#', description: 'Comprehensive guide to scikit-learn.' },
          { id: 'aids-r7', title: 'Applied Machine Learning Course', type: 'course', url: '#', description: 'Focus on practical applications.' },
        ],
      },
      {
        id: 'aids-m4',
        title: 'Big Data Technologies',
        description: 'Introduction to tools and frameworks for handling large datasets.',
        resources: [
          { id: 'aids-r8', title: 'Apache Spark Overview', type: 'article', url: '#', description: 'Learn about Spark for big data processing.' },
          { id: 'aids-r9', title: 'Introduction to Hadoop', type: 'course', url: '#', description: 'Fundamentals of the Hadoop ecosystem.' },
        ],
      },
    ],
  },
  {
    id: 'cybersecurity',
    slug: 'cybersecurity',
    title: 'Cybersecurity',
    description: 'Explore the world of cybersecurity, from ethical hacking to network defense and cryptography.',
    icon: ShieldCheck,
    modules: [
      {
        id: 'cs-m1',
        title: 'Cybersecurity Fundamentals',
        description: 'Basic concepts, threats, vulnerabilities, and risk management.',
        resources: [
          { id: 'cs-r1', title: 'CompTIA Security+ Overview', type: 'course', url: '#', description: 'Foundation for cybersecurity careers.' },
          { id: 'cs-r2', title: 'OWASP Top 10', type: 'documentation', url: '#', description: 'Awareness of critical web app security risks.' },
        ],
      },
      {
        id: 'cs-m2',
        title: 'Network Security',
        description: 'Securing networks, firewalls, IDS/IPS, and VPNs.',
        resources: [
          { id: 'cs-r3', title: 'Wireshark Tutorials', type: 'tool', url: '#', description: 'Learn network protocol analysis.' },
          { id: 'cs-r4', title: 'Understanding Firewalls', type: 'article', url: '#', description: 'How firewalls protect networks.' },
        ],
      },
      {
        id: 'cs-m3',
        title: 'Ethical Hacking & Penetration Testing',
        description: 'Learn to find and exploit vulnerabilities legally and ethically.',
        resources: [
          { id: 'cs-r5', title: 'Kali Linux Revealed', type: 'course', url: '#', description: 'Master the Kali Linux distribution.' },
          { id: 'cs-r6', title: 'Metasploit Framework Guide', type: 'tool', url: '#', description: 'Learn to use Metasploit.' },
        ],
      },
      {
        id: 'cs-m4',
        title: 'Cryptography',
        description: 'Principles of encryption, hashing, and digital signatures.',
        resources: [
          { id: 'cs-r7', title: 'Cryptography I (Coursera - Stanford)', type: 'course', url: '#', description: 'In-depth cryptography course.' },
          { id: 'cs-r8', title: 'Applied Cryptography (Book)', type: 'article', url: '#', description: 'Classic text on cryptography.' },
        ],
      },
    ],
  },
  {
    id: 'web-development',
    slug: 'web-development',
    title: 'Web Development',
    description: 'Become a full-stack web developer, covering front-end, back-end, databases, and deployment.',
    icon: Code2,
    modules: [
      {
        id: 'wd-m1',
        title: 'Frontend Fundamentals',
        description: 'HTML, CSS, and JavaScript basics for building user interfaces.',
        resources: [
          { id: 'wd-r1', title: 'MDN Web Docs: HTML, CSS, JS', type: 'documentation', url: '#', description: 'The ultimate reference for web technologies.' },
          { id: 'wd-r2', title: 'freeCodeCamp Responsive Web Design', type: 'course', url: '#', description: 'Learn HTML and CSS by building projects.' },
          { id: 'wd-r3', title: 'JavaScript Algorithms and Data Structures (freeCodeCamp)', type: 'course', url: '#', description: 'Master JavaScript fundamentals.' },
        ],
      },
      {
        id: 'wd-m2',
        title: 'Frontend Frameworks/Libraries',
        description: 'Learn popular tools like React, Angular, or Vue.js for building dynamic UIs.',
        resources: [
          { id: 'wd-r4', title: 'React Official Tutorial', type: 'documentation', url: '#', description: 'Learn React from the source.' },
          { id: 'wd-r5', title: 'Vue.js Guide', type: 'documentation', url: '#', description: 'Comprehensive guide for Vue.js.' },
          { id: 'wd-r6', title: 'Angular Docs', type: 'documentation', url: '#', description: 'Official Angular documentation.' },
        ],
      },
      {
        id: 'wd-m3',
        title: 'Backend Development',
        description: 'Server-side programming, APIs, and databases.',
        resources: [
          { id: 'wd-r7', title: 'Node.js and Express.js Course', type: 'course', url: '#', description: 'Build backend APIs with Node/Express.' },
          { id: 'wd-r8', title: 'Python with Django/Flask', type: 'course', url: '#', description: 'Backend development using Python frameworks.' },
          { id: 'wd-r9', title: 'SQL Fundamentals', type: 'course', url: '#', description: 'Learn relational databases.' },
          { id: 'wd-r10', title: 'MongoDB University', type: 'course', url: '#', description: 'Learn NoSQL with MongoDB.' },
        ],
      },
      {
        id: 'wd-m4',
        title: 'DevOps & Deployment',
        description: 'Learn about version control, CI/CD, and deploying web applications.',
        resources: [
          { id: 'wd-r11', title: 'Git & GitHub Crash Course', type: 'video', url: '#', description: 'Master version control.' },
          { id: 'wd-r12', title: 'Docker for Developers', type: 'course', url: '#', description: 'Containerize your applications.' },
          { id: 'wd-r13', title: 'Deploying to Netlify/Vercel/AWS', type: 'article', url: '#', description: 'Guides for popular hosting platforms.' },
        ],
      },
    ],
  },
];

export const getRoadmapBySlug = (slug: string): Roadmap | undefined => {
  return roadmaps.find(roadmap => roadmap.slug === slug);
};
