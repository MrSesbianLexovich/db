import { eq } from 'drizzle-orm'
import Elysia from 'elysia'
import z from 'zod'
import { db } from './db'
import { cart } from './db/schema/schema'

const cartSchema = z.object({
	productId: z.string(),
	userId: z.string(),
})

export const cartRouter = new Elysia({
	prefix: "/cart"
})

//получаем корзину пользователя
.get('/:id', async ({ params }) => {
	await db.query.cart.findMany({
		where: eq(cart.userId, params.id)
	})
})

//добавляем товар в корзину
.post('/', async ({ body}) => {
	await db.insert(cart).values(body)
},{
	body: cartSchema
})

// удаляем товар из корзины
.delete("/:id", async ({ params }) => {
	await db.delete(cart).where(eq(cart.id, params.id))
})