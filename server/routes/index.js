import express from 'express'
import authRoute from './authRoutes.js'
const router = express.Router()

app.use("/auth", authRoute) //auth/register

export default router
