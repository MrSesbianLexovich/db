import Elysia from 'elysia'
import { cartRouter } from './cartService'
import { favourRouter } from './favourService'
import { productsRouter } from './productService'
import { usersRouter } from './userService'



const app = new Elysia().use(usersRouter).use(productsRouter).use(cartRouter).use(favourRouter)

app.listen(3000)

