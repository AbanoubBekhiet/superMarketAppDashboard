import { collection, getDocs } from 'firebase/firestore';
import { firestoreDb } from '@/services/firebase/app';
import type { ActiveCart, CartItem } from '@/types/domain';

interface FirestoreCartDoc {
  userId?: string;
  customerName?: string;
  customerPhone?: string;
  customerArea?: string;
  items?: CartItem[];
  itemsCount?: number;
  subtotal?: number;
  updatedAt?: string;
}

export async function fetchActiveCarts(search = ''): Promise<ActiveCart[]> {
  const snap = await getDocs(collection(firestoreDb, 'carts'));
  const mapped = snap.docs
    .map((d) => {
      const data = d.data() as FirestoreCartDoc;
      const items = Array.isArray(data.items)
        ? data.items.filter((item) => item && item.productId && item.quantity > 0)
        : [];
      const itemsCount =
        typeof data.itemsCount === 'number'
          ? data.itemsCount
          : items.reduce((sum, i) => sum + i.quantity, 0);
      const subtotal =
        typeof data.subtotal === 'number'
          ? data.subtotal
          : Number(items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0).toFixed(2));
      return {
        userId: data.userId ?? d.id,
        customerName: data.customerName ?? 'عميل طازج',
        customerPhone: data.customerPhone ?? '',
        customerArea: data.customerArea ?? '',
        items,
        itemsCount,
        subtotal,
        updatedAt: data.updatedAt ?? '',
      } satisfies ActiveCart;
    })
    .filter((cart) => cart.itemsCount > 0 && cart.items.length > 0)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));

  const q = search.trim().toLowerCase();
  if (!q) return mapped;
  return mapped.filter(
    (c) =>
      c.customerName.toLowerCase().includes(q) ||
      c.customerPhone.toLowerCase().includes(q) ||
      c.customerArea.toLowerCase().includes(q) ||
      c.items.some((item) => item.name.toLowerCase().includes(q)),
  );
}
