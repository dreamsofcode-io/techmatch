export interface TechProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  pros: string[];
  cons: string[];
  logo: string;
  logoUrl?: string;
  color: string;
  category: string;
}

export const techProfiles: TechProfile[] = [
  {
    id: 'vercel',
    name: 'Vercel',
    tagline: 'Deploy. Preview. Ship.',
    description: 'The platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration.',
    pros: [
      'Lightning-fast deployments',
      'Automatic HTTPS & CDN',
      'Git integration',
      'Zero configuration'
    ],
    cons: [
      'Can get expensive at scale',
      'Limited backend functionality',
      'Vendor lock-in concerns'
    ],
    logo: '▲',
    logoUrl: '/vercel-black.svg',
    color: 'from-slate-800 to-slate-900',
    category: 'Deployment Platform'
  },
  {
    id: 'railway',
    name: 'Railway',
    tagline: 'Made for any language, for projects big and small',
    description: 'Railway is a deployment platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud.',
    pros: [
      'Full-stack deployments',
      'Database provisioning',
      'Simple pricing',
      'Great developer experience'
    ],
    cons: [
      'Newer platform',
      'Limited regions',
      'Fewer integrations'
    ],
    logo: '🚂',
    logoUrl: 'https://railway.app/brand/logo-light.png',
    color: 'from-indigo-600 to-purple-700',
    category: 'Cloud Platform'
  },
  {
    id: 'docker-stack',
    name: 'Docker Stack',
    tagline: 'Native orchestration for Docker containers',
    description: 'Docker Stack provides native clustering and orchestration capabilities built into Docker. Deploy and manage multi-container applications across a cluster of Docker nodes.',
    pros: [
      'Native Docker integration',
      'Built-in load balancing',
      'Service discovery',
      'Rolling updates',
      'Secrets management'
    ],
    cons: [
      'Limited compared to Kubernetes',
      'Requires Docker Swarm mode',
      'No review apps',
      'Less flexible networking'
    ],
    logo: '🐳',
    logoUrl: '/docker-logo.svg',
    color: 'from-blue-500 to-blue-700',
    category: 'Container Orchestration'
  },
  {
    id: 'coolify',
    name: 'Coolify',
    tagline: 'Self-hostable Heroku & Netlify alternative',
    description: 'An open-source & self-hostable Heroku / Netlify / Vercel alternative for your own VPS.',
    pros: [
      'Self-hosted control',
      'Open source',
      'Cost effective',
      'No vendor lock-in'
    ],
    cons: [
      'Requires server management',
      'Smaller community',
      'More setup complexity'
    ],
    logo: '❄️',
    logoUrl: '/coolify.png',
    color: 'from-sky-600 to-blue-700',
    category: 'Self-Hosted Platform'
  },
  {
    id: 'dokku',
    name: 'Dokku',
    tagline: 'A docker-powered PaaS that helps you build and manage the lifecycle of applications',
    description: 'The smallest PaaS implementation you\'ve ever seen. Deploy your apps with a git push.',
    pros: [
      'Lightweight & fast',
      'Heroku-like workflow',
      'Docker-based',
      'Highly customizable'
    ],
    cons: [
      'Command-line heavy',
      'Requires Linux knowledge',
      'Limited GUI',
      'Single server limitation'
    ],
    logo: '🐋',
    logoUrl: '/dokku.svg',
    color: 'from-teal-700 to-emerald-700',
    category: 'Mini-PaaS'
  },
  {
    id: 'dokploy',
    name: 'Dokploy',
    tagline: 'Effortless deployment and management',
    description: 'Deploy and manage your applications with ease. Dokploy simplifies the deployment process with intuitive tools and powerful automation.',
    pros: [
      'User-friendly interface',
      'Automated deployments',
      'Easy scaling',
      'Built-in monitoring',
      'Review apps support'
    ],
    cons: [
      'Newer in the market',
      'Limited documentation',
      'Smaller community'
    ],
    logo: '🚀',
    logoUrl: '/dokploy.svg',
    color: 'from-blue-600 to-indigo-700',
    category: 'Deployment Platform'
  },
  {
    id: 'systemd',
    name: 'SystemD',
    tagline: 'Linux service management and initialization',
    description: 'SystemD is a system and service manager for Linux operating systems. It provides a standard process for controlling programs that run when a Linux system boots up.',
    pros: [
      'Native Linux integration',
      'Fast parallel startup',
      'Service dependency management',
      'Robust logging with journald',
      'Socket activation'
    ],
    cons: [
      'Linux-only solution',
      'Complex configuration',
      'Steep learning curve',
      'Limited GUI tools'
    ],
    logo: '🐧',
    logoUrl: '/next.svg',
    color: 'from-gray-600 to-gray-800',
    category: 'System Manager'
  }
];