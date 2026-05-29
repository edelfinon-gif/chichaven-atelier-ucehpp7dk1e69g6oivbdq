import { Hono } from "hono";
import type { Env } from './core-utils';
import { ProductEntity, WishlistEntity } from "./entities";
import { ok, notFound } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'ChicHaven API' }}));
  app.get('/api/products', async (c) => {
    await ProductEntity.ensureSeed(c.env);
    const cursor = c.req.query('cursor');
    const category = c.req.query('category');
    const brand = c.req.query('brand');
    const priceMin = c.req.query('priceMin');
    const priceMax = c.req.query('priceMax');
    const result = await ProductEntity.list(c.env, cursor ?? null);
    let filteredItems = result.items;
    if (category && category !== 'all') {
      filteredItems = filteredItems.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    if (brand && brand !== 'all') {
      filteredItems = filteredItems.filter(p => p.brand.toLowerCase() === brand.toLowerCase());
    }
    if (priceMin) {
      filteredItems = filteredItems.filter(p => p.price >= Number(priceMin));
    }
    if (priceMax) {
      filteredItems = filteredItems.filter(p => p.price <= Number(priceMax));
    }
    return ok(c, { items: filteredItems, next: result.next });
  });
  app.get('/api/products/:id', async (c) => {
    const id = c.req.param('id');
    const product = new ProductEntity(c.env, id);
    if (!await product.exists()) return notFound(c, 'produto não encontrado');
    return ok(c, await product.getState());
  });
  app.get('/api/wishlist/:userId', async (c) => {
    const userId = c.req.param('userId');
    const wishlist = new WishlistEntity(c.env, userId);
    const state = await wishlist.getState();
    const productResults = await Promise.all(
      state.productIds.map(async (id) => {
        const p = new ProductEntity(c.env, id);
        const exists = await p.exists();
        return exists ? await p.getState() : null;
      })
    );
    return ok(c, productResults.filter(Boolean));
  });
  app.post('/api/wishlist/:userId', async (c) => {
    const userId = c.req.param('userId');
    const { productId } = await c.req.json<{ productId: string }>();
    const wishlist = new WishlistEntity(c.env, userId);
    await wishlist.mutate(s => ({
      ...s,
      productIds: s.productIds.includes(productId) ? s.productIds : [...s.productIds, productId]
    }));
    return ok(c, { success: true });
  });
}