export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  bloodType: string;
  condition: string;
  status: 'Active' | 'Discharged' | 'Critical' | 'Stable';
  doctor: string;
  lastVisit: string;
  nextAppointment: string;
  phone: string;
  email: string;
  address: string;
  insurance: string;
  admissionDate: string;
  vitals: {
    heartRate: number;
    bloodPressure: string;
    temperature: number;
    oxygenSaturation: number;
    weight: number;
    height: number;
  };
  medications: Medication[];
  notes: string;
  avatar?: string;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
}

export interface AnalyticsData {
  month: string;
  patients: number;
  revenue: number;
  appointments: number;
  recoveryRate: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  timestamp: Date;
  read: boolean;
}

export type ViewMode = 'grid' | 'list';
