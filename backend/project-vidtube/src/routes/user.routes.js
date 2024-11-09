import { Router } from "express"
import { registerUser, loginUser } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"

const router = Router()


router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1
        }
    ]),
    registerUser)

// Route for user login
router.post('/login', loginUser);


export default router