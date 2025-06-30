import { Card, GameTile, PlayerArchetype } from './types';

export const PLAYER_ARCHETYPES: Record<PlayerArchetype, {
  name: string;
  description: string;
  startingSkills: Record<string, number>;
  bonus: string;
}> = {
  'developer': {
    name: 'The Developer',
    description: 'Builds MVPs faster and handles technical challenges better',
    startingSkills: { development: 3, design: 1, growth: 1, operations: 1 },
    bonus: '+25% build speed, -50% technical crisis impact'
  },
  'designer': {
    name: 'The Designer',
    description: 'Creates beautiful products with higher conversion rates',
    startingSkills: { development: 1, design: 3, growth: 1, operations: 1 },
    bonus: '+25% user conversion, +50% brand reputation gain'
  },
  'growth-hacker': {
    name: 'The Growth Hacker',
    description: 'Acquires users at lower costs and scales faster',
    startingSkills: { development: 1, design: 1, growth: 3, operations: 1 },
    bonus: '+50% user acquisition, -25% marketing costs'
  },
  'operator': {
    name: 'The Operator',
    description: 'Manages resources efficiently with lower burn rates',
    startingSkills: { development: 1, design: 1, growth: 1, operations: 3 },
    bonus: '-25% burn rate, +25% team efficiency'
  }
};

export const OPPORTUNITY_CARDS: Card[] = [
  {
    id: 'newsletter-launch',
    title: 'Launch Newsletter',
    description: 'Start building an audience with regular content updates',
    type: 'opportunity',
    cost: 0,
    effects: [
      { type: 'mrr', value: 100, delay: 2 },
      { type: 'reputation', value: 10 }
    ],
    tags: ['passive_income', 'content', 'audience'],
    phase: 'indie-hustler'
  },
  {
    id: 'freelance-gig',
    title: 'Premium Freelance Gig',
    description: 'High-paying client work to fund your startup',
    type: 'opportunity',
    cost: 0,
    effects: [
      { type: 'cash', value: 2000 },
      { type: 'energy', value: -15 }
    ],
    tags: ['income', 'burnout_risk'],
    phase: 'indie-hustler'
  },
  {
    id: 'beta-users',
    title: 'Beta User Program',
    description: 'Early adopters provide feedback and initial traction',
    type: 'opportunity',
    cost: 500,
    effects: [
      { type: 'users', value: 50 },
      { type: 'reputation', value: 15 }
    ],
    tags: ['validation', 'community'],
    phase: 'launch'
  },
  {
    id: 'tech-blog-feature',
    title: 'Tech Blog Feature',
    description: 'Get featured on a popular tech publication',
    type: 'opportunity',
    cost: 0,
    effects: [
      { type: 'users', value: 500 },
      { type: 'reputation', value: 25 }
    ],
    tags: ['press', 'viral'],
    phase: 'launch'
  },
  {
    id: 'partnership-deal',
    title: 'Strategic Partnership',
    description: 'Partner with complementary service for mutual growth',
    type: 'opportunity',
    cost: 1000,
    effects: [
      { type: 'mrr', value: 500, delay: 1 },
      { type: 'users', value: 200 }
    ],
    tags: ['partnership', 'growth'],
    phase: 'growth'
  },
  {
    id: 'hire-developer',
    title: 'Hire Star Developer',
    description: 'Bring on technical talent to accelerate development',
    type: 'opportunity',
    cost: 3000,
    effects: [
      { type: 'skill', value: 2 }, // development skill
      { type: 'cash', value: -1000, duration: 3 } // monthly salary
    ],
    tags: ['team', 'scaling'],
    phase: 'growth'
  }
];

export const EVENT_CARDS: Card[] = [
  {
    id: 'hn-surge',
    title: 'Hacker News Surge',
    description: 'Your post went viral! Massive traffic incoming.',
    type: 'event',
    effects: [
      { type: 'users', value: 1000 },
      { type: 'reputation', value: 30 }
    ],
    tags: ['viral', 'traffic'],
    phase: 'launch'
  },
  {
    id: 'api-deprecation',
    title: 'API Deprecation',
    description: 'Critical API you depend on is shutting down',
    type: 'event',
    effects: [
      { type: 'energy', value: -20 },
      { type: 'cash', value: -1500 }
    ],
    tags: ['crisis', 'technical'],
    phase: 'growth'
  },
  {
    id: 'cofounder-leaves',
    title: 'Co-founder Departure',
    description: 'Your co-founder decided to pursue other opportunities',
    type: 'event',
    effects: [
      { type: 'energy', value: -25 },
      { type: 'skill', value: -1 },
      { type: 'reputation', value: -15 }
    ],
    tags: ['crisis', 'team'],
    phase: 'growth'
  },
  {
    id: 'funding-rejected',
    title: 'Funding Rejected',
    description: 'Investors passed on your pitch. Time to bootstrap.',
    type: 'event',
    effects: [
      { type: 'energy', value: -15 },
      { type: 'reputation', value: -10 }
    ],
    tags: ['funding', 'rejection'],
    phase: 'growth'
  },
  {
    id: 'security-breach',
    title: 'Security Incident',
    description: 'Data breach! Emergency response mode activated.',
    type: 'event',
    effects: [
      { type: 'users', value: -200 },
      { type: 'reputation', value: -30 },
      { type: 'cash', value: -2000 }
    ],
    tags: ['crisis', 'security'],
    phase: 'growth'
  },
  {
    id: 'burnout-warning',
    title: 'Burnout Warning',
    description: 'You\'re working too hard. Time to rest or face consequences.',
    type: 'event',
    effects: [
      { type: 'energy', value: -30 }
    ],
    tags: ['burnout', 'health'],
    phase: 'indie-hustler'
  }
];

export const GAME_BOARD: GameTile[] = [
  // Indie Hustler Phase
  { id: 'start', type: 'start', title: 'The Idea', description: 'Your entrepreneurial journey begins', phase: 'indie-hustler', position: 0 },
  { id: 'first-code', type: 'milestone', title: 'First Lines of Code', description: 'You start building your MVP', phase: 'indie-hustler', position: 1 },
  { id: 'burnout-1', type: 'crisis', title: 'Late Night Coding', description: 'Working too hard takes its toll', phase: 'indie-hustler', position: 2, effects: [{ type: 'energy', value: -10 }] },
  { id: 'validation', type: 'opportunity', title: 'Idea Validation', description: 'Get feedback from potential users', phase: 'indie-hustler', position: 3 },
  { id: 'mvp-complete', type: 'milestone', title: 'MVP Complete', description: 'Your minimum viable product is ready', phase: 'indie-hustler', position: 4 },
  
  // Launch Phase
  { id: 'launch-day', type: 'milestone', title: 'Launch Day', description: 'Your product goes live to the world', phase: 'launch', position: 5 },
  { id: 'first-user', type: 'milestone', title: 'First User', description: 'Someone actually uses your product!', phase: 'launch', position: 6 },
  { id: 'bug-reports', type: 'crisis', title: 'Bug Reports Flood In', description: 'Users found issues you missed', phase: 'launch', position: 7, effects: [{ type: 'energy', value: -15 }] },
  { id: 'product-hunt', type: 'opportunity', title: 'Product Hunt Launch', description: 'Feature your product to early adopters', phase: 'launch', position: 8 },
  { id: 'hundred-users', type: 'milestone', title: '100 Users!', description: 'Reached your first major user milestone', phase: 'launch', position: 9 },
  
  // Growth Phase
  { id: 'growth-mode', type: 'milestone', title: 'Growth Mode', description: 'Time to scale your user base', phase: 'growth', position: 10 },
  { id: 'first-revenue', type: 'milestone', title: 'First Revenue', description: 'Someone paid for your product!', phase: 'growth', position: 11 },
  { id: 'competition', type: 'crisis', title: 'Competitor Launch', description: 'A well-funded competitor enters your space', phase: 'growth', position: 12, effects: [{ type: 'users', value: -50 }] },
  { id: 'thousand-users', type: 'milestone', title: '1,000 Users', description: 'Significant user base achieved', phase: 'growth', position: 13 },
  { id: 'team-growth', type: 'opportunity', title: 'Team Expansion', description: 'Consider hiring your first employees', phase: 'growth', position: 14 },
  
  // Exit Phase  
  { id: 'exit-decision', type: 'milestone', title: 'Exit Decision', description: 'Choose your path forward', phase: 'exit', position: 15 }
];