import { relations, sql } from 'drizzle-orm'
import * as pg from 'drizzle-orm/pg-core'

export const users = pg.pgTable('users', {
	id: pg
		.varchar('id', { length: 255 })
		.notNull()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	name: pg
		.text()
		.notNull(),
	email: pg
		.text()
		.notNull()
		.unique(),
	dateOfBirth: pg
		.timestamp()
		.notNull()
})

export const userToCartsAndFavoursRelation = relations(users, ({ many }) => ({
	carts: many(cart),
	favours: many(favour)
}))

export const products = pg.pgTable('products', {
	id: pg
		.varchar({length:255})
		.notNull()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	imageUrl: pg
		.text('url'),
	name: pg
		.text('name')
		.notNull(),
	description: pg
		.text('description')
		.notNull()
})

export const favour = pg.pgTable('favourites', {
	id: pg
		.varchar('id', {length: 255})
		.notNull()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	userId: pg
		.varchar('userId', {length: 255})
		.notNull()
		.references(() => users.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
	productId: pg
		.varchar('productId', {length: 255})
		.notNull()
		.references(() => products.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
	createdAt: pg
		.timestamp('createdAt').notNull().default(sql`now()`)
})

export const favourToUserAndProductRelation = relations(favour, ({one}) => ({
	product: one(products, {
		fields: [favour.productId],
		references: [products.id]
	}),
	user: one(users, {
		fields: [favour.userId],
		references: [users.id]
	})
}))

export const cart = pg.pgTable('cart', {
	id: pg
		.varchar('id', {length: 255})
		.notNull()
		.primaryKey()
		.$defaultFn(() => Bun.randomUUIDv7()),
	productId: pg
		.varchar('productId', {length: 255})
		.notNull()
		.references(() => products.id, {onDelete: 'cascade', onUpdate: 'cascade'}),
	userId: pg
		.varchar('userId', {length: 255})
		.notNull()
		.references(() => users.id, {onDelete: 'cascade', onUpdate: 'cascade'})
})

export const cartToUserAndProductRelation = relations(cart, ({ one }) => ({
	product: one(products, {
		fields: [cart.productId],
		references: [products.id]
	}),
	user: one(users, {
		fields: [cart.userId],
		references: [users.id]
	})
}))