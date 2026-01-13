
export enum FlowStep {
  LANDING = 'LANDING',
  GOOGLE_SIGN_IN = 'GOOGLE_SIGN_IN',
  PERMISSIONS = 'PERMISSIONS',
  WELCOME = 'WELCOME',
  DASHBOARD = 'DASHBOARD',
}

export interface ScreenProps {
  onNext: () => void;
  onBack?: () => void;
  onScanComplete?: () => void;
}

export type Tab = 'overview' | 'applications' | 'calendar' | 'portals' | 'plus';

export interface TimelineEvent {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'pending' | 'upcoming';
  description?: string;
  urgent?: boolean;
}

export interface PortalCredentials {
  portalName: string;
  url: string;
  username: string;
  password?: string; // Optional, may be masked
  status: 'Active' | 'Pending' | 'Inactive';
  lastLogin?: string;
}

export interface Application {
  id: number;
  university: string;
  program: string;
  status: string;
  date: string;
  icon: string;
  color: string;
  actionItem: string | null;
  timeline: TimelineEvent[];
  credentials?: PortalCredentials[];
}
