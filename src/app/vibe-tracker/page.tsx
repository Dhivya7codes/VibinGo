import { VibeTrackerClient } from '@/components/features/vibe-tracker/VibeTrackerClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vibe Tracker - VibinGo',
  description: 'Check real-time crowd levels, wait times, trending spots, and user-generated vibe updates for local places.',
};

export default function VibeTrackerPage() {
  return (
    <div>
      <VibeTrackerClient />
    </div>
  );
}
