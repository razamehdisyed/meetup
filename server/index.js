import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import dbConnection from './dbConfig/index.js'
import errorMiddleware from './middleware/errorMiddleware.js'
import router from './routes/index.js'
import path from "path"

const __dirname = path.resolve(path.dirname(""))

dotenv.config()

const app = express()
app.use(express.static(path.join(__dirname,"views/build")))

const PORT = process.env.PORT || 8800

dbConnection()

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended:true}))

app.use(morgan("dev"))
app.use(router)

// error middleware
app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`Dev server running on port: ${PORT}`)
})
