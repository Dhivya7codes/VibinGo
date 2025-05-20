
import { LocalAssistantClient } from '@/components/features/local-assistant/LocalAssistantClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Local Assistant - VibinGo',
  description: 'Your go-to AI for questions about the city, local recommendations, and information.',
};

export default function LocalAssistantPage() {
  return (
    <div>
      <LocalAssistantClient />
    </div>
  );
}
