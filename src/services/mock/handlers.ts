import { http, HttpResponse, delay } from 'msw';
import { env } from '@/lib/env';
import type { OrderStatus, UserAccountStatus } from '@/types/domain';
import { mockDb } from './db';

const base = env.apiBaseUrl.replace(/\/$/, '');

export const handlers = [
  http.post(`${base}/auth/login`, async ({ request }) => {
    await delay(180);
    const body = (await request.json()) as { email: string; password: string };
    const admin = mockDb.users.find(
      (u) => u.role === 'admin' && u.email.toLowerCase() === body.email.toLowerCase(),
    );
    if (!admin || body.password.length < 6) {
      return HttpResponse.json(
        { message: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' },
        { status: 401 },
      );
    }
    return HttpResponse.json({
      user: admin,
      token: `mock-admin-token-${admin.id}`,
    });
  }),

  http.get(`${base}/dashboard/overview`, async () => {
    await delay(150);
    return HttpResponse.json(mockDb.getOverview());
  }),

  http.get(`${base}/orders`, async ({ request }) => {
    await delay(140);
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const paymentStatus = url.searchParams.get('paymentStatus');
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';

    const filtered = mockDb.orders.filter((order) => {
      if (status && status !== 'all' && order.status !== status) return false;
      if (paymentStatus && paymentStatus !== 'all' && order.paymentStatus !== paymentStatus) {
        return false;
      }
      if (search) {
        const matchesCode = order.code.toLowerCase().includes(search);
        const matchesName = order.customerName.toLowerCase().includes(search);
        if (!matchesCode && !matchesName) return false;
      }
      return true;
    });

    return HttpResponse.json(filtered);
  }),

  http.patch(`${base}/orders/:id/status`, async ({ params, request }) => {
    await delay(140);
    const body = (await request.json()) as { status: OrderStatus };
    const updated = mockDb.updateOrderStatus(String(params.id), body.status);
    if (!updated) {
      return HttpResponse.json({ message: 'الطلب غير موجود' }, { status: 404 });
    }
    return HttpResponse.json(updated);
  }),

  http.get(`${base}/products`, async ({ request }) => {
    await delay(140);
    const url = new URL(request.url);
    const categoryId = url.searchParams.get('categoryId');
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';

    const filtered = mockDb.products.filter((product) => {
      if (categoryId && categoryId !== 'all' && product.categoryId !== categoryId) return false;
      if (search) {
        const matchesName = product.name.toLowerCase().includes(search);
        const matchesSku = product.sku.toLowerCase().includes(search);
        if (!matchesName && !matchesSku) return false;
      }
      return true;
    });

    return HttpResponse.json(filtered);
  }),

  http.post(`${base}/products`, async ({ request }) => {
    await delay(160);
    const body = (await request.json()) as {
      name: string;
      sku: string;
      categoryId: string;
      price: number;
      stock: number;
      stockUnit?: string;
    };
    const created = mockDb.createProduct(body);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${base}/products/:id`, async ({ params, request }) => {
    await delay(160);
    const body = (await request.json()) as {
      name?: string;
      sku?: string;
      categoryId?: string;
      price?: number;
      stock?: number;
      stockUnit?: string;
    };
    const updated = mockDb.updateProduct(String(params.id), body);
    if (!updated) {
      return HttpResponse.json({ message: 'المنتج غير موجود' }, { status: 404 });
    }
    return HttpResponse.json(updated);
  }),

  http.delete(`${base}/products/:id`, async ({ params }) => {
    await delay(140);
    const removed = mockDb.deleteProduct(String(params.id));
    if (!removed) {
      return HttpResponse.json({ message: 'المنتج غير موجود' }, { status: 404 });
    }
    return HttpResponse.json({ success: true });
  }),

  http.get(`${base}/categories`, async ({ request }) => {
    await delay(120);
    const url = new URL(request.url);
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';
    const filtered = mockDb.categories.filter((c) =>
      search ? c.name.toLowerCase().includes(search) : true,
    );
    return HttpResponse.json(filtered);
  }),

  http.post(`${base}/categories`, async ({ request }) => {
    await delay(150);
    const body = (await request.json()) as { name: string; isActive: boolean };
    const created = mockDb.createCategory(body);
    return HttpResponse.json(created, { status: 201 });
  }),

  http.patch(`${base}/categories/:id`, async ({ params, request }) => {
    await delay(150);
    const body = (await request.json()) as { name?: string; isActive?: boolean };
    const updated = mockDb.updateCategory(String(params.id), body);
    if (!updated) {
      return HttpResponse.json({ message: 'القسم غير موجود' }, { status: 404 });
    }
    return HttpResponse.json(updated);
  }),

  http.delete(`${base}/categories/:id`, async ({ params }) => {
    await delay(140);
    const removed = mockDb.deleteCategory(String(params.id));
    if (!removed) {
      return HttpResponse.json({ message: 'القسم غير موجود' }, { status: 404 });
    }
    return HttpResponse.json({ success: true });
  }),

  http.get(`${base}/customers`, async ({ request }) => {
    await delay(140);
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search')?.trim().toLowerCase() ?? '';

    const filtered = mockDb.users
      .filter((u) => u.role === 'user')
      .filter((customer) => {
        if (status && status !== 'all' && customer.status !== status) return false;
        if (search) {
          const matchesName = customer.name.toLowerCase().includes(search);
          const matchesPhone = customer.phone.toLowerCase().includes(search);
          const matchesArea = customer.area.toLowerCase().includes(search);
          if (!matchesName && !matchesPhone && !matchesArea) return false;
        }
        return true;
      });

    return HttpResponse.json(filtered);
  }),

  http.patch(`${base}/customers/:id/status`, async ({ params, request }) => {
    await delay(140);
    const body = (await request.json()) as { status: UserAccountStatus };
    const updated = mockDb.updateCustomerStatus(String(params.id), body.status);
    if (!updated) {
      return HttpResponse.json({ message: 'العميل غير موجود' }, { status: 404 });
    }
    return HttpResponse.json(updated);
  }),

  http.get(`${base}/customers/:id/orders`, async ({ params }) => {
    await delay(120);
    const orders = mockDb.orders.filter((o) => o.customerId === String(params.id));
    return HttpResponse.json(orders);
  }),

  http.get(`${base}/notifications`, async () => {
    await delay(100);
    return HttpResponse.json(mockDb.notifications);
  }),

  http.post(`${base}/notifications/read-all`, async () => {
    await delay(100);
    return HttpResponse.json(mockDb.markAllNotificationsRead());
  }),
];
