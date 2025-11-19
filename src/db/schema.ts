import { relations } from "drizzle-orm";
import * as pg from "drizzle-orm/pg-core";

export const usersTable = pg.pgTable("users", {
	id: pg
		.varchar({ length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => Bun.randomUUIDv7()),
	name: pg.varchar({ length: 255 }).notNull(),
	email: pg.varchar({ length: 255 }).notNull().unique(),
	birthdate: pg.timestamp({ mode: "string" }),
	age: pg.integer().notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
	favourites: many(favouritesTable),
	cart: many(cartTable),
}));

export const productsTable = pg.pgTable("products", {
	imageURL: pg.varchar({ length: 255 }),
	name: pg.varchar({ length: 255 }).notNull(),
	description: pg.text().notNull(),
	id: pg
		.varchar({ length: 255 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => Bun.randomUUIDv7()),
});

export const productsRelations = relations(productsTable, ({ many }) => ({
	favourites: many(favouritesTable),
}));

export const favouritesTable = pg.pgTable("favourites", {
	userId: pg
		.varchar({ length: 255 })
		.notNull()
		.references(() => usersTable.id),
	productId: pg
		.varchar({ length: 255 })
		.notNull()
		.references(() => productsTable.id),
	time: pg.time().defaultNow(),
});

export const favouritesRelations = relations(favouritesTable, ({ one }) => ({
	user: one(usersTable, {
		fields: [favouritesTable.userId],
		references: [usersTable.id],
	}),
	product: one(productsTable, {
		fields: [favouritesTable.productId],
		references: [productsTable.id],
	}),
}));

export const cartTable = pg.pgTable("cart", {
	productId: pg
		.varchar({ length: 255 })
		.notNull()
		.references(() => productsTable.id),
	userId: pg
		.varchar({ length: 255 })
		.notNull()
		.references(() => usersTable.id),
	amount: pg.integer().$default(() => 1),
});
