'use client';

import { useEffect } from 'react';
import { api } from '@/lib/api';

export default function Home() {
  useEffect(() => {
    api.get('/buildings').then(res => {
      console.log('Buildings:', res.data);
    });
  }, []);

  return <div className="p-6">Open console</div>;
}
