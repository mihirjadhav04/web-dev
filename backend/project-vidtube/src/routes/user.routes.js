import { Router } from "express"
import { 
    registerUser, 
    loginUser, 
    logoutUser, 
    refreshAccessToken,
    changeCurrentPassword,
    updateAccountDetails,
    getCurrentUser
} from "../controllers/user.controllers.js"
import { upload } from "../middlewares/multer.middleware.js"
import { authMiddlewareJWT } from "../middlewares/auth.middleware.js"
const router = Router()

// unsecured routes
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

router.route('/login').post(loginUser);
router.route('/refresh-token').post(refreshAccessToken)

// secured routes
// Apply authMiddleware to ensure only authenticated users can access logout
router.route("/logout").post(authMiddlewareJWT, logoutUser);
router.route("/change-password").post(authMiddlewareJWT, changeCurrentPassword);
router.route("/update-account-details").patch(authMiddlewareJWT, updateAccountDetails);
router.route("/get-current-user").get(authMiddlewareJWT, getCurrentUser);

export default router