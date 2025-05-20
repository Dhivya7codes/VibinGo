
import { CityMomentsClient } from '@/components/features/city-moments/CityMomentsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'City Moments - VibinGo',
  description: 'Share and explore real-time moments and experiences from around the city. See what others are up to!',
};

export default function CityMomentsPage() {
  return (
    <div>
      <CityMomentsClient />
    </div>
  );
}
