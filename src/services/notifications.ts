export const requestNotificationPermission = async (): Promise<boolean> => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications');
    return false;
  }

  if (Notification.permission === 'granted') return true;

  const permission = await Notification.requestPermission();
  return permission === 'granted';
};

export const sendNotification = (title: string, options?: NotificationOptions): void => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/logo192.png',
      badge: '/logo192.png',
      ...options,
    });
  }
};

export const registerServiceWorker = async (): Promise<ServiceWorkerRegistration | null> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', registration.scope);
      return registration;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return null;
    }
  }
  return null;
};

export const scheduleLocalNotification = (
  title: string,
  body: string,
  delayMs: number = 0
): void => {
  setTimeout(() => {
    sendNotification(title, {
      body,
      tag: `health-${Date.now()}`,
    });
  }, delayMs);
};
