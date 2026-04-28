import { Patient, AnalyticsData } from '../types';

export const mockPatients: Patient[] = [
  {
    id: 'P001',
    name: 'Sarah Mitchell',
    age: 45,
    gender: 'Female',
    bloodType: 'O+',
    condition: 'Hypertension',
    status: 'Active',
    doctor: 'Dr. James Reid',
    lastVisit: '2024-03-10',
    nextAppointment: '2024-04-15',
    phone: '+1 (555) 234-5678',
    email: 'sarah.mitchell@email.com',
    address: '123 Maple St, Boston, MA 02101',
    insurance: 'BlueCross BlueShield',
    admissionDate: '2023-11-20',
    vitals: { heartRate: 82, bloodPressure: '140/90', temperature: 98.6, oxygenSaturation: 97, weight: 68, height: 165 },
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2023-11-20' },
      { name: 'Amlodipine', dosage: '5mg', frequency: 'Once daily', startDate: '2023-11-20' }
    ],
    notes: 'Patient responding well to medication. Monitor BP weekly.'
  },
  {
    id: 'P002',
    name: 'Robert Chen',
    age: 62,
    gender: 'Male',
    bloodType: 'A+',
    condition: 'Type 2 Diabetes',
    status: 'Stable',
    doctor: 'Dr. Priya Sharma',
    lastVisit: '2024-03-12',
    nextAppointment: '2024-04-20',
    phone: '+1 (555) 345-6789',
    email: 'robert.chen@email.com',
    address: '456 Oak Ave, Chicago, IL 60601',
    insurance: 'Aetna',
    admissionDate: '2022-05-15',
    vitals: { heartRate: 76, bloodPressure: '128/82', temperature: 98.4, oxygenSaturation: 98, weight: 85, height: 175 },
    medications: [
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2022-05-15' },
      { name: 'Glipizide', dosage: '5mg', frequency: 'Once daily', startDate: '2022-06-01' }
    ],
    notes: 'Blood sugar levels improving. Continue current regimen.'
  },
  {
    id: 'P003',
    name: 'Emma Johnson',
    age: 28,
    gender: 'Female',
    bloodType: 'B-',
    condition: 'Asthma',
    status: 'Active',
    doctor: 'Dr. Michael Torres',
    lastVisit: '2024-03-08',
    nextAppointment: '2024-04-10',
    phone: '+1 (555) 456-7890',
    email: 'emma.johnson@email.com',
    address: '789 Pine Rd, Seattle, WA 98101',
    insurance: 'United Healthcare',
    admissionDate: '2024-01-10',
    vitals: { heartRate: 72, bloodPressure: '115/75', temperature: 98.2, oxygenSaturation: 96, weight: 58, height: 162 },
    medications: [
      { name: 'Albuterol', dosage: '90mcg', frequency: 'As needed', startDate: '2024-01-10' },
      { name: 'Fluticasone', dosage: '110mcg', frequency: 'Twice daily', startDate: '2024-01-10' }
    ],
    notes: 'Asthma well-controlled. Avoid known triggers.'
  },
  {
    id: 'P004',
    name: 'William Davis',
    age: 71,
    gender: 'Male',
    bloodType: 'AB+',
    condition: 'Coronary Artery Disease',
    status: 'Critical',
    doctor: 'Dr. James Reid',
    lastVisit: '2024-03-14',
    nextAppointment: '2024-03-21',
    phone: '+1 (555) 567-8901',
    email: 'william.davis@email.com',
    address: '321 Elm St, Houston, TX 77001',
    insurance: 'Medicare',
    admissionDate: '2024-02-28',
    vitals: { heartRate: 95, bloodPressure: '155/100', temperature: 99.1, oxygenSaturation: 94, weight: 90, height: 178 },
    medications: [
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily', startDate: '2024-02-28' },
      { name: 'Atorvastatin', dosage: '40mg', frequency: 'Once daily', startDate: '2024-02-28' },
      { name: 'Metoprolol', dosage: '50mg', frequency: 'Twice daily', startDate: '2024-02-28' }
    ],
    notes: 'Requires close monitoring. Cardiac catheterization scheduled.'
  },
  {
    id: 'P005',
    name: 'Lisa Park',
    age: 35,
    gender: 'Female',
    bloodType: 'O-',
    condition: 'Rheumatoid Arthritis',
    status: 'Active',
    doctor: 'Dr. Priya Sharma',
    lastVisit: '2024-03-05',
    nextAppointment: '2024-04-05',
    phone: '+1 (555) 678-9012',
    email: 'lisa.park@email.com',
    address: '654 Cedar Ln, Phoenix, AZ 85001',
    insurance: 'Cigna',
    admissionDate: '2023-08-12',
    vitals: { heartRate: 68, bloodPressure: '118/76', temperature: 98.8, oxygenSaturation: 99, weight: 62, height: 160 },
    medications: [
      { name: 'Methotrexate', dosage: '15mg', frequency: 'Once weekly', startDate: '2023-08-12' },
      { name: 'Hydroxychloroquine', dosage: '200mg', frequency: 'Twice daily', startDate: '2023-08-12' }
    ],
    notes: 'Joint inflammation reducing. Physical therapy recommended.'
  },
  {
    id: 'P006',
    name: 'Thomas Wright',
    age: 55,
    gender: 'Male',
    bloodType: 'A-',
    condition: 'COPD',
    status: 'Stable',
    doctor: 'Dr. Michael Torres',
    lastVisit: '2024-03-11',
    nextAppointment: '2024-04-25',
    phone: '+1 (555) 789-0123',
    email: 'thomas.wright@email.com',
    address: '987 Birch Blvd, Philadelphia, PA 19101',
    insurance: 'Humana',
    admissionDate: '2023-04-20',
    vitals: { heartRate: 80, bloodPressure: '132/85', temperature: 98.6, oxygenSaturation: 93, weight: 78, height: 180 },
    medications: [
      { name: 'Tiotropium', dosage: '18mcg', frequency: 'Once daily', startDate: '2023-04-20' },
      { name: 'Ipratropium', dosage: '17mcg', frequency: 'Four times daily', startDate: '2023-04-20' }
    ],
    notes: 'Pulmonary function tests scheduled. Smoking cessation ongoing.'
  },
  {
    id: 'P007',
    name: 'Maria Garcia',
    age: 42,
    gender: 'Female',
    bloodType: 'B+',
    condition: 'Hypothyroidism',
    status: 'Discharged',
    doctor: 'Dr. Priya Sharma',
    lastVisit: '2024-02-20',
    nextAppointment: '2024-05-20',
    phone: '+1 (555) 890-1234',
    email: 'maria.garcia@email.com',
    address: '147 Walnut St, San Antonio, TX 78201',
    insurance: 'BlueCross BlueShield',
    admissionDate: '2023-06-15',
    vitals: { heartRate: 65, bloodPressure: '110/70', temperature: 97.8, oxygenSaturation: 99, weight: 70, height: 163 },
    medications: [
      { name: 'Levothyroxine', dosage: '75mcg', frequency: 'Once daily', startDate: '2023-06-15' }
    ],
    notes: 'Thyroid levels normalized. Continue current dosage.'
  },
  {
    id: 'P008',
    name: 'James Thompson',
    age: 67,
    gender: 'Male',
    bloodType: 'AB-',
    condition: 'Chronic Kidney Disease',
    status: 'Critical',
    doctor: 'Dr. James Reid',
    lastVisit: '2024-03-13',
    nextAppointment: '2024-03-20',
    phone: '+1 (555) 901-2345',
    email: 'james.thompson@email.com',
    address: '258 Spruce Ave, Denver, CO 80201',
    insurance: 'Medicare',
    admissionDate: '2024-01-05',
    vitals: { heartRate: 88, bloodPressure: '148/95', temperature: 99.0, oxygenSaturation: 95, weight: 82, height: 177 },
    medications: [
      { name: 'Epoetin alfa', dosage: '4000 units', frequency: 'Three times weekly', startDate: '2024-01-05' },
      { name: 'Calcium carbonate', dosage: '500mg', frequency: 'Three times daily', startDate: '2024-01-05' }
    ],
    notes: 'Dialysis being evaluated. Nephrologist consultation pending.'
  }
];

export const mockAnalytics: AnalyticsData[] = [
  { month: 'Sep', patients: 185, revenue: 42000, appointments: 310, recoveryRate: 87 },
  { month: 'Oct', patients: 210, revenue: 48500, appointments: 345, recoveryRate: 89 },
  { month: 'Nov', patients: 198, revenue: 45200, appointments: 328, recoveryRate: 85 },
  { month: 'Dec', patients: 175, revenue: 39800, appointments: 290, recoveryRate: 88 },
  { month: 'Jan', patients: 220, revenue: 52000, appointments: 368, recoveryRate: 91 },
  { month: 'Feb', patients: 245, revenue: 58500, appointments: 412, recoveryRate: 90 },
  { month: 'Mar', patients: 268, revenue: 63200, appointments: 445, recoveryRate: 93 }
];
