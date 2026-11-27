import { create } from 'zustand';
import type { NotificationItem } from '@/types/domain';

interface NotificationAlertState {
  liveAlert: NotificationItem | null;
  setLiveAlert: (item: NotificationItem | null) => void;
  dismissLiveAlert: () => void;
}

export const useNotificationAlertStore = create<NotificationAlertState>((set) => ({
  liveAlert: null,
  setLiveAlert: (item) => set({ liveAlert: item }),
  dismissLiveAlert: () => set({ liveAlert: null }),
}));

export function resolveNotificationTargetRoute(notification: NotificationItem): string | null {
  if (!notification.dataPayload) return null;
  try {
    const parsed = JSON.parse(notification.dataPayload) as {
      kind?: string;
      orderId?: string;
      customerId?: string;
    };
    if (parsed.kind === 'new_customer' || parsed.customerId) {
      return '/customers';
    }
    if (parsed.kind === 'new_order' || parsed.orderId) {
      return '/orders';
    }
  } catch {
    return null;
  }
  return null;
}

let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctx =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return null;
  if (!sharedAudioCtx) {
    sharedAudioCtx = new Ctx();
  }
  return sharedAudioCtx;
}

export function unlockNotificationAudio(): void {
  const ctx = getAudioContext();
  if (ctx && ctx.state === 'suspended') {
    void ctx.resume().catch(() => undefined);
  }
}

export function playNotificationChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;
  try {
    if (ctx.state === 'suspended') {
      void ctx.resume().catch(() => undefined);
    }
    const now = ctx.currentTime;
    const notes = [880, 1174.66];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.14);
      gain.gain.setValueAtTime(0.001, now + idx * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.18, now + idx * 0.14 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.28);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.14);
      osc.stop(now + idx * 0.14 + 0.3);
    });
  } catch {
    // Ignore Web Audio restrictions when user hasn't interacted yet
  }
}
