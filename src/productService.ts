import { eq } from 'drizzle-orm'
import Elysia from 'elysia'
import z from 'zod'
import { db } from './db'
import { products } from './db/schema/schema'

const productSchema = z.object({
	imageUrl: z.string(),
	name: z.string(),
	description: z.string()
})

export const productsRouter = new Elysia({
	prefix: "/products"
})



//получаем товары
.get("/", async () => {
	const res = await db.query.products.findMany()
	return res
})

// получаем товар
.get("/:id", async ({ params }) => {
	const res = await db.query.products.findFirst({
		where: eq(products.id, params.id)
	})
	return res
})

//создаем товар
.post("/", async ({body}) => {
	await db.insert(products).values(body)
},
{
	body: productSchema
})

// обнавляем товар
.put("/:id", async ({ params, body }) => {
	await db.update(products).set(body).where(eq(products.id, params.id))
},{
	body: productSchema.partial()
})

// удаляем товар
.delete("/:id", async ({ params }) => {
	await db.delete(products).where(eq(products.id, params.id))
})
