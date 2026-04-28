import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, Patient, Notification, ViewMode } from '../types';
import { mockPatients } from '../services/mockData';

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  setUser: (user: User | null) => void;
  setAuthLoading: (loading: boolean) => void;
  logout: () => void;

  // Patients
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  searchQuery: string;
  filterStatus: string;
  setSelectedPatient: (patient: Patient | null) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;

  // Notifications
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      authLoading: true,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setAuthLoading: (authLoading) => set({ authLoading }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Patients
      patients: mockPatients,
      selectedPatient: null,
      viewMode: 'grid',
      searchQuery: '',
      filterStatus: 'all',
      setSelectedPatient: (patient) => set({ selectedPatient: patient }),
      setViewMode: (viewMode) => set({ viewMode }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setFilterStatus: (filterStatus) => set({ filterStatus }),

      // Notifications
      notifications: [
        {
          id: '1',
          title: 'Critical Patient Alert',
          message: 'William Davis vitals require immediate attention',
          type: 'error',
          timestamp: new Date(),
          read: false
        },
        {
          id: '2',
          title: 'Appointment Reminder',
          message: 'Sarah Mitchell appointment tomorrow at 10:00 AM',
          type: 'info',
          timestamp: new Date(Date.now() - 3600000),
          read: false
        },
        {
          id: '3',
          title: 'Lab Results Ready',
          message: 'Robert Chen blood work results are now available',
          type: 'success',
          timestamp: new Date(Date.now() - 7200000),
          read: true
        }
      ],
      unreadCount: 2,
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: Date.now().toString(),
          timestamp: new Date(),
          read: false
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));
      },
      markAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        }));
      },
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0
        }));
      },
      clearNotifications: () => set({ notifications: [], unreadCount: 0 }),

      // UI
      sidebarOpen: true,
      setSidebarOpen: (sidebarOpen) => set({ sidebarOpen })
    }),
    {
      name: 'healthsaas-storage',
      partialize: (state) => ({
        viewMode: state.viewMode,
        sidebarOpen: state.sidebarOpen
      })
    }
  )
);
