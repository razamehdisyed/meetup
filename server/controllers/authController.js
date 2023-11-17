import Users from "../models/userModel.js";
import { compareString, createJWT, hashString } from "../utils/index.js";

export const register = async (req, res, next) => {
    const {firstName, lastName, email, password} = req.body

    if (!(firstName || lastName || email || password)) {
        next("Provide required inputs")
        return
    }
    try {
        
        const userExist = await Users.findOne({email})
        if(userExist) {
            next("Email Address already exists")
            return
        }

        const hashedPassword = await hashString(password)

        const user = await Users.create({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

        sendVerificationEmail(user, res)
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

export const login = async (req, res, next) => {
    const { email, password} = req.body

    try {
        //validation
        if (!email || password) {
            next("Please provide user credentials")
            return
        }
        //find user by email
        const user = await Users.findOne({email}).select("+password").populate({
            path: "friends",
            select: "firstName lastName location profileUrl -password"
        })

        if(!user) {
            next("invalid email or password")
            return
        }

        if (!user?.verified) {
            next("user email not verified. check your email and verify")
            return
        }

        //compare password
        const isMatch  = await compareString(password, user?.password)
         if(!isMatch) {
            next("incorrect password")
            return
         }
         user.password = undefined
         const token = createJWT(user?._id)

         res.status(201).json({
            success: true,
            message: 'Login successful',
            token,
            user,
         })
        
    } catch (error) {
        console.log(error)
        res.status(404).json({message: error.message})
    }
}

