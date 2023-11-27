import express from 'express'
import path from 'path'
import { changePassword,
         getUser,
         updateUser,
         requestPasswordReset,
         resetPassword,
         verifyEmail,
         friendRequest, 
         getFriendRequest,
         acceptRequest,
         profileViews,
         suggestedFriends} from '../controllers/userController.js'
import userAuth from '../middleware/authMiddleware.js'


const router = express.Router()
const __dirname = path.resolve(path.dirname(""))

router.get("/verify/:userId/:token", verifyEmail)
// RESET PASSWORD
router.post("/request-passwordreset", requestPasswordReset)
router.get("/reset-password/:userId/:token", resetPassword)
router.post("/reset-password", changePassword)

// USER ROUTES
router.post("/get-user/:id?", userAuth, getUser)
router.put("/update-user/:id?", userAuth, updateUser)

// FRIEND REQUEST
router.post("/friend-request",userAuth, friendRequest)
router.post("/get-friend-request",userAuth, getFriendRequest)

//ACCEPT OR DENY FRIEND REQUEST
router.post("/accept-request", userAuth, acceptRequest)
// PROFILE VIEW
router.post("/profile-view",userAuth, profileViews)
// SUGGEST FRIENDS
router.post("/suggested-friends",userAuth, suggestedFriends)
router.get("/verified", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build/index.html"))
})
router.get("/resetpassword", (req, res) => {
    res.sendFile(path.join(__dirname, "./views/build/index.html"))
})
export default router

