export interface TeamMember {
  role: string;
  gamerTag: string;
}

export interface TeamLinks {
  twitter?: string;
  discord?: string;
  youtube?: string;
  twitch?: string;
  instagram?: string;
  website?: string;
}

export interface Team {
  id: string;
  name: string;
  tagline?: string;
  logo?: string;
  region?: string;
  captain?: string;
  founded?: number;
  division?: string;
  achievements?: string[];
  playstyle?: string;
  primaryColors?: string[];
  members?: TeamMember[];
  links?: TeamLinks;
}

export interface TeamsDoc {
  teams: Team[];
}

