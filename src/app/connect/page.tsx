import { ConnectClient } from '@/components/features/connect/ConnectClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Local Friend Finder - VibinGo',
  description: 'Find, connect, and vibe with people in your area. Meet new friends and explore the city together.',
};

export default function ConnectPage() {
  return (
    <div>
      <ConnectClient />
    </div>
  );
}
