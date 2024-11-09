import { Router } from "express"
import { registerUser, loginUser } from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import { authMiddlewareJWT } from "../middlewares/auth.middleware.js"
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
router.route('/login').post(loginUser);

// Apply authMiddleware to ensure only authenticated users can access logout
router.route("/logout").post(authMiddlewareJWT, logoutUser);

export default router