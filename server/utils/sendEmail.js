import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import {v4 as uuidv4} from 'uuid'
import {hashString} from './index.js'
import Verification from '../models/emailVerification.js'
import PasswordReset from '../models/passwordReset.js'

dotenv.config()

const { SMTP_HOST, AUTH_EMAIL, AUTH_PASSWORD, APP_URL} = process.env

let transporter = nodemailer.createTransport({
    service: SMTP_HOST,
    auth: {
        user: AUTH_EMAIL,
        pass: AUTH_PASSWORD,
    },
})
export const sendVerificationEmail = async (user, res) => {
    const { _id, email, lastName } = user
    
    const token = _id + uuidv4()
    const link  = APP_URL  + "users/verify/" + _id + "/" + token
    //mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Email Verification",
        html: `<div>
        <h1>Please verify your email address</h1>
        <hr>
        <h4>Hi, ${lastName}</h4>
        <p>
        Please verify your email address so we can know, its you.
        <br>
        This link expires in 1 hour.
        <a href= ${link}>Verify Email Address</a>
        </p>
        </div>`,
        
    }
    try {
        const hashedToken = await hashString(token)

        const newVerifiedEmail = await Verification.create({
            userId: _id,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000
        })

        if(newVerifiedEmail) {
            transporter
             .sendMail(mailOptions)
             .then(() => {
                res.status(201).send ({
                    success :  "PENDING",
                    message : "Verification email is sent to your account. Check your email for info"
                })
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: 'Something went wrong'})
        
    }
}

export const resetPasswordLink = async (user, res) => {
    const { _id, email} = user

    const token = _id + uuidv4()
    const link  = APP_URL  + "users/reset-password/" + _id + "/" + token
    //mail options
    const mailOptions = {
        from: AUTH_EMAIL,
        to: email,
        subject: "Password Resset",
        html: `<div>
        <h1>Please reset your password</h1>
        <hr>
        <p>
        Please change your password using following link.
        <br>
        This link expires in 10 minutes.
        <a  type='button' href= ${link}>Reset Password</a>
        </p>
        </div>`,
        
    }
    try {
        const hashedToken = await hashString(token)

        const resetEmail = await PasswordReset.create({
            userId: _id,
            email: email,
            token: hashedToken,
            createdAt: Date.now(),
            expiresAt: Date.now() + 600000
        })

        if(resetEmail) {
            transporter
             .sendMail(mailOptions)
             .then(() => {
                res.status(201).send ({
                    success :  "PENDING",
                    message : "Reset Password link is sent to your account. Check your email for info"
                })
            })
            .catch((err) => {
                console.log(err)
                res.status(404).json({message: "Something went wrong"})
            })
        }
    } catch (error) {
        console.log(error)
        res.status(404).json({message: 'Something went wrong'})
        
    }
}