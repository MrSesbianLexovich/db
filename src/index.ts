import { eq } from 'drizzle-orm'
import { db } from './db'
import { cart, favour, products, users } from './db/schema/schema'


async function createUser(body : {name: string, email: string, dateOfBirth: Date}) {
	const user = await db.insert(users).values(body).returning()
	console.log(`User successfully created: ${user}`)
}

async function updateUser(userId: string, body: {name?: string, email?: string}) {
	const user = await db.update(users).set(body).where(eq(users.id, userId)).returning()
	console.log(`User successfully updated: ${user}`)
}

async function deleteUser(userId:string) {
	await db.delete(users).where(eq(users.id, userId))
	console.log(`${userId} User successfully deleted`)
}

async function getUsers() {
	const res = await db.query.users.findMany({
		with: {
			carts:true,
			favours:true
		}
	})
	console.log(res)
}

async function createProduct(body: {imageUrl: string, name: string, description: string}) {
	const product = await db.insert(products).values(body).returning()
	console.log(`Product successfully created: ${product}`
	)
}

async function updateProduct(productId: string, body: {imageUrl?: string, name?: string, description?: string}) {
	const product = await db.update(products).set(body).where(eq(products.id, productId)).returning()
	console.log(`Product successfully updated: ${product}`)
}

async function deleteProduct(productId:string) {
	await db.delete(products).where(eq(products.id, productId))
	console.log(`${productId} Product successfully deleted`)
}

async function getProducts() {
	const res = await db.query.products.findMany({
	})
	console.log(res)
}

async function addProductToCart(body: {productId:string, userId:string}) {
	const cartRet = await db.insert(cart).values(body).returning()
	console.log(`Cart successfully created: ${cartRet}`)
}

async function deleteCart(cartId: string) {
	await db.delete(cart).where(eq(cart.id, cartId))
}

async function addProductToFavourite(body: {productId:string, userId:string}) {
	const favourite = await db.insert(favour).values(body).returning()
	console.log(`Favourite product successfully created ${favourite}`)
}

async function deleteFavourite(favouriteId: string) {
	await db.delete(favour).where(eq(favour.id, favouriteId))
}



// createUser({name: "TestName", email: "email@gmail.com", dateOfBirth: new Date(2000, 12, 20)})

// getUsers()

// createProduct({imageUrl: "imageurl", name: "product name", description: "product description"})

// updateProduct("019aa0c3-0ffe-7000-b85a-806612101b93", {name: "New name"})

getProducts()

// addProductToCart({productId: "019aa0be-38a1-7000-91e4-e9447606880c", userId: "019aa0a4-bb17-7000-ab34-d747f39b0ee0"})

// addProductToFavourite({productId: "019aa0c3-0ffe-7000-b85a-806612101b93", userId: "019aa0a4-bb17-7000-ab34-d747f39b0ee0"})