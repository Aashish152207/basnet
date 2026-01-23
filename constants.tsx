
import React from 'react';
import { DiamondPack, NewsItem } from './types';

export const INITIAL_DIAMONDS: DiamondPack[] = [
  { id: '1', amount: 100, bonus: 10, price: 0.99, currency: 'USD', icon: '💎' },
  { id: '2', amount: 310, bonus: 35, price: 2.99, currency: 'USD', icon: '💎' },
  { id: '3', amount: 520, bonus: 60, price: 4.99, currency: 'USD', icon: '💎' },
  { id: '4', amount: 1060, bonus: 120, price: 9.99, currency: 'USD', icon: '💎' },
  { id: '5', amount: 2180, bonus: 250, price: 19.99, currency: 'USD', icon: '💎' },
  { id: '6', amount: 5600, bonus: 700, price: 49.99, currency: 'USD', icon: '💎' },
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'New Seasonal Battle Pass!',
    content: 'Unlock exclusive cyber-skins and heavy-duty weaponry in our latest Season 5 update.',
    date: 'Oct 24, 2023',
    imageUrl: 'https://picsum.photos/seed/game1/800/400'
  },
  {
    id: 'n2',
    title: 'Top-Up Bonus Event',
    content: 'Get up to 50% extra diamonds on all packs above $10 for a limited time!',
    date: 'Oct 22, 2023',
    imageUrl: 'https://picsum.photos/seed/game2/800/400'
  }
];

export const DEFAULT_QR = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=NexusGamingPaymentGate';
