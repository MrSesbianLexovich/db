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
