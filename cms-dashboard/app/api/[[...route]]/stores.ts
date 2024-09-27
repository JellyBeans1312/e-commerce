import { Hono } from "hono";
import { zValidator } from '@hono/zod-validator';
import { clerkMiddleware, getAuth } from "@hono/clerk-auth";
import { stores, insertStoreSchema } from "@/db/schema";
import { db } from "@/db/drizzle";
import { createId } from '@paralleldrive/cuid2'


const app = new Hono()
.post(
    '/',
    clerkMiddleware(),
    zValidator('json', insertStoreSchema.pick({
        name: true,
    })),
    async (c) => {
        const auth = getAuth(c);
        const { name } = c.req.valid('json');

        if(!auth?.userId) {
            return c.json({ error: 'Unauthorized' }, 401);
        };

        if(!name) {
            return c.json({ error: "Missing name field"}, 400);
        };

        const [ data ] = await db
            .insert(stores)
            .values({
                id: createId(),
                userId: auth.userId,
                name,
            }).returning();
            
        return c.json({ data });
    }
);

export default app;
