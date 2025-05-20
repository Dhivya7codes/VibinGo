
import { PgFinderClient } from '@/components/features/pg-finder/PgFinderClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'PG - VibinGo',
  description: 'Find your ideal PG or room with AI-powered matching based on your preferences.',
};

export default function PgFinderPage() {
  return (
    <div>
      <PgFinderClient />
    </div>
  );
}
