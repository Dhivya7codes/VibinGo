import { ServicesDirectoryClient } from '@/components/features/services-directory/ServicesDirectoryClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services Directory - VibinGo',
  description: 'Find essential local services like ATMs, grocery stores, pharmacies, and transport information.',
};

export default function ServicesDirectoryPage() {
  return (
    <div>
      <ServicesDirectoryClient />
    </div>
  );
}
