import { FareEstimatorClient } from '@/components/features/fare-estimator/FareEstimatorClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Fare Estimator - VibinGo',
  description: 'Estimate transport fares for two-wheelers, auto-rickshaws, taxis, trains, and flights.',
};

export default function FareEstimatorPage() {
  return (
    <div>
      <FareEstimatorClient />
    </div>
  );
}
