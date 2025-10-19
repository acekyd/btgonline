export interface StreamerLinkMap { twitch?: string; youtube?: string; twitter?: string; instagram?: string }
export interface StreamerColor { from: string; to: string }
export interface StreamerSchedule { 
  monday: string; tuesday: string; wednesday: string; thursday: string; 
  friday: string; saturday: string; sunday: string; 
}
export interface Streamer { 
  id: string; 
  name: string; 
  handle: string; 
  initials: string; 
  role: string; 
  bio: string; 
  description?: string;
  color: StreamerColor; 
  links: StreamerLinkMap; 
  avatar?: string | null; 
  order: number; 
  active: boolean;
  isLive?: boolean;
  currentGame?: string;
  lastStreamTitle?: string;
  followers?: string;
  hoursStreamed?: string;
  rating?: string;
  schedule?: StreamerSchedule;
  contentTypes?: string[];
}
export interface StreamersDoc { streamers: Streamer[] }


