import { eq } from 'drizzle-orm'
import Elysia from 'elysia'
import z from 'zod'
import { db } from './db'
import { favour } from './db/schema/schema'

const favourSchema = z.object({
	userId: z.string(),
	productId: z.string()
})

export const favourRouter = new Elysia({
	prefix: "/favour"
})

// получаем избранное пользователя
.get("/:id", async ({ params }) => {
	const res = await db.query.favour.findMany({
		where: eq(favour.userId, params.id)
	})
	return res
})

// добавляем товар в избранное
.post("/", async ({ body }) =>{
	await db.insert(favour).values(body)
},
{
	body: favourSchema
})

//удаляем товар из избранного
.delete("/:id", async ({ params }) => {
	await db.delete(favour).where(eq(favour.id, params.id))
})