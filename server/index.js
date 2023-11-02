import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dbConnection from './dbConfig/index.js'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 8800

dbConnection()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))

app.listen(PORT, () => {
    console.log(`Dev server running on port: ${PORT}`)
})
