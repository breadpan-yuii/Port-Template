/* ============================================================
   portfolio — config.js
   Content / data layer. Edit THIS file to make the site yours.
   ============================================================ */

const CONFIG = {
  name: 'Your Name',
  initials: 'YN',
  roles: ['Frontend Developer', 'UI Enthusiast', 'Open Source Contributor'],
  email: 'you@example.com',
  location: 'Manila, Philippines',
  cvUrl: '#',
  socials: [
    { label: 'GitHub', url: 'https://github.com/', icon: 'github' },
    { label: 'LinkedIn', url: 'https://linkedin.com/', icon: 'linkedin' },
    { label: 'X', url: 'https://x.com/', icon: 'x' },
    { label: 'Email', url: 'mailto:you@example.com', icon: 'mail' },
  ],
  bio: [
    'I build clean, fast interfaces for the web. I care about typography, motion, and the small details that make products feel polished.',
    'Currently focused on JavaScript, design systems, and turning ideas into shipped side projects.',
  ],
  stats: [
    { value: 3, suffix: '+', label: 'Years coding' },
    { value: 12, suffix: '', label: 'Projects shipped' },
    { value: 5, suffix: '', label: 'Happy clients' },
  ],
  skills: [
    { group: 'Frontend', items: [{ n: 'HTML/CSS', l: 90 }, { n: 'JavaScript', l: 85 }, { n: 'React', l: 75 }] },
    { group: 'Backend', items: [{ n: 'Node.js', l: 80 }, { n: 'Express', l: 78 }, { n: 'SQL', l: 65 }] },
    { group: 'Tools', items: [{ n: 'Git', l: 88 }, { n: 'Figma', l: 70 }, { n: 'Linux', l: 72 }] },
  ],
  projects: [
    { title: 'Project One', desc: 'Short description of this project goes here. Replace me in CONFIG.projects.', tags: ['Placeholder'], live: '#', code: '#', gradient: 'linear-gradient(135deg,#4f46e5,#22d3ee)' },
    { title: 'Project Two', desc: 'Short description of this project goes here. Replace me in CONFIG.projects.', tags: ['Placeholder'], live: '#', code: '#', gradient: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
    { title: 'Project Three', desc: 'Short description of this project goes here. Replace me in CONFIG.projects.', tags: ['Placeholder'], live: '#', code: '#', gradient: 'linear-gradient(135deg,#10b981,#3b82f6)' },
    { title: 'Project Four', desc: 'Short description of this project goes here. Replace me in CONFIG.projects.', tags: ['Placeholder'], live: '#', code: '#', gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
    { title: 'Project Five', desc: 'Short description of this project goes here. Replace me in CONFIG.projects.', tags: ['Placeholder'], live: '#', code: '#', gradient: 'linear-gradient(135deg,#eab308,#f97316)' },
    { title: 'Project Six', desc: 'Short description of this project goes here. Replace me in CONFIG.projects.', tags: ['Placeholder'], live: '#', code: '#', gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)' },
  ],
  experience: [
    { period: '2024 — Now', role: 'Frontend Developer', org: 'Freelance', text: 'Shipping landing pages and web apps for small clients, end to end.' },
    { period: '2023 — 2024', role: 'Web Development Student', org: 'Self-taught', text: 'Learned HTML, CSS, JavaScript and built a dozen practice projects.' },
    { period: '2022 — 2023', role: 'IT Support', org: 'Local Company', text: 'Kept systems running; automated repetitive tasks with small scripts.' },
  ],
  contactBlurb: 'Have a project in mind, a role to fill, or just want to say hi? My inbox is open.',
};