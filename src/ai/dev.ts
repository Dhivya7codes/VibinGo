import { config } from 'dotenv';
config();

import '@/ai/flows/local-assistant.ts';
import '@/ai/flows/instant-translator.ts';
import '@/ai/flows/pg-room-matcher.ts';
import '@/ai/flows/vibe-checker.ts';