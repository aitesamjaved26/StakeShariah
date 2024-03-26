import { FaTwitter } from 'react-icons/fa';
import {
  airbnb,
  binance,
  coinbase,
  dropbox,
  send,
  shield,
  star,
  facebook,
} from '../assets';

export function navLinks(t) {
  return [
    {
      id: 'home',
      title: t('home'),
    },
    {
      id: 'features',
      title: t('features'),
    },
    {
      id: 'share&earn',
      title: t('Refferal'),
    },
    {
      id: 'clients',
      title: t('how'),
    },
    {
      id: 'presentation',
      title: t('Presentation'),
      link: 'presentation.pdf',
    },
  ];
}

export function features(t) {
  return [
    {
      id: 'feature-1',
      icon: star,
      title: t('Variable Staking Rewards'),
      content: t('features1pr'),
    },
    {
      id: 'feature-2',
      icon: shield,
      title: t('features2'),
      content: t('features2pr'),
    },
  ];
}

export function feedback(t) {
  return [
    {
      id: 'feedback-1',
      content: t('feedback1c'),
      name: t('feedback1'),
      title: t('feedback1t'),
      img: '/TWT.png',
    },
    {
      id: 'feedback-2',
      content: t('feedback2c'),
      name: t('feedback2'),
      title: 'Founder & Leader',
      img: `https://assets-cdn.trustwallet.com/blockchains/smartchain/info/logo.png`,
    },
    {
      id: 'feedback-3',
      content: t('feedback3c'),
      name: t('feedback3'),
      title: 'Founder & Leader',
      img: `/sm.png`,
    },
  ];
}

export const footerLinks = [
  {
    title: 'Useful Links',
    links: [
      {
        name: 'Content',
        link: 'https://www.hoobank.com/content/',
      },
      {
        name: 'How it Works',
        link: 'https://www.hoobank.com/how-it-works/',
      },
      {
        name: 'Create',
        link: 'https://www.hoobank.com/create/',
      },
      {
        name: 'Explore',
        link: 'https://www.hoobank.com/explore/',
      },
      {
        name: 'Terms & Services',
        link: 'https://www.hoobank.com/terms-and-services/',
      },
    ],
  },
  {
    title: 'Community',
    links: [
      {
        name: 'Help Center',
        link: 'https://www.hoobank.com/help-center/',
      },
      {
        name: 'Partners',
        link: 'https://www.hoobank.com/partners/',
      },
      {
        name: 'Suggestions',
        link: 'https://www.hoobank.com/suggestions/',
      },
      {
        name: 'Blog',
        link: 'https://www.hoobank.com/blog/',
      },
      {
        name: 'Newsletters',
        link: 'https://www.hoobank.com/newsletters/',
      },
    ],
  },
  {
    title: 'Partner',
    links: [
      {
        name: 'Our Partner',
        link: 'https://www.hoobank.com/our-partner/',
      },
      {
        name: 'Become a Partner',
        link: 'https://www.hoobank.com/become-a-partner/',
      },
    ],
  },
];

export const socialMedia = [
  {
    id: 'social-media-4',
    icon: send,
    link: 'https://t.me/StakeShariah',
  },

  {
    id: 'social-media5',
    icon: facebook,
    link: 'https://www.facebook.com/stakeshariah',
  },
];

export const clients = [
  {
    id: 'client-1',
    logo: airbnb,
  },
  {
    id: 'client-2',
    logo: binance,
  },
  {
    id: 'client-3',
    logo: coinbase,
  },
  {
    id: 'client-4',
    logo: dropbox,
  },
];
