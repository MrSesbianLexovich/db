import "dotenv/config";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { productsTable, usersTable } from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!);

async function createUser(
	name: string,
	email: string,
	birthdate: string,
	age: number,
) {
	const [newUser] = await db
		.insert(usersTable)
		.values({
			name: name,
			email: email,
			birthdate: birthdate,
			age: age,
		})
		.returning();
	console.log("Создан новый пользователь:");
	console.log(newUser);
}

async function deleteUser(id: string) {
	await db.delete(usersTable).where(eq(usersTable.id, id));
}

async function updateUser(id: string, name: string) {
	await db.update(usersTable).set({ name: name }).where(eq(usersTable.id, id));
}

async function createProduct(
	imageURL: string,
	name: string,
	description: string,
) {
	await db.insert(productsTable).values({
		imageURL: imageURL,
		name: name,
		description: description,
	});
}

// createUser("TestName", "email1@gmail.com", "2008-01-14", 17);

// deleteUser("019a95c5-32f6-7000-8901-a4ee71bd22a9");

// updateUser("019a95d5-efb3-7000-b26d-51736ed2f3b1", "NewName");
