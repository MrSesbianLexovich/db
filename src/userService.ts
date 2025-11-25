import { eq } from 'drizzle-orm'
import Elysia from 'elysia'
import z from 'zod'
import { db } from './db'
import { users } from './db/schema/schema'

const userSchema = z.object({
  name: z
    .string({
      message: "Введите имя",
    })
    .min(3, "Имя должно быть длинее 3 символов"),
  email: z.email({
    message: "Неверный формат почты",
  }),
  dateOfBirth: z.coerce.date(),
});



export const usersRouter = new Elysia({
	prefix: "/users",
})

//получаем пользователей
.get("/", async () => {
	const res = await db.query.users.findMany()
	return res
})

//получаем пользователя
.get("/:id", async ({ params }) => {
  const res = await db.query.users.findFirst({
    where: eq(users.id, params.id),
    with: {
      favours: {
        with: {
          product: true,
        }
      },
      carts: {
        with: {
          product: true
        }
      }
    }
  })
  return res
})

//создаем пользователя
.post("/", async ({body}) => {
	await db.insert(users).values(body)
},{
	body: userSchema
})

//обновляем пользователя
.put("/:id", async ({ params, body }) => {
  await db.update(users).set(body).where(eq(users.id, params.id))
},{
  body: userSchema.partial()
})

//удаляем пользователя
.delete('/:id', async ({ params }) => {
  await db.delete(users).where(eq(users.id, params.id))
})