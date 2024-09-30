import { usertocken } from "../middelwares/authMiddleware";
import exprss from 'express'
import { viewproduct,productById,productBycategory } from "../Controllers/productcantrolls";
import TryCatchMiddleware from "../middelwares/TryCatchMiddleware";

const route=exprss.Router()

//products
route.use(usertocken)

route.get('/products',TryCatchMiddleware(viewproduct))
route.get('/products/:id',TryCatchMiddleware(productById))
route.get('/products/category/:categoryname',TryCatchMiddleware(productBycategory))
