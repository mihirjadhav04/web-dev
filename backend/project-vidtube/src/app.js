// import and create express app and export the app.
import express from 'express'
import cors from "cors"

const app = express()

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true
    })
)


// common middlewares.
app.use(
    express.json({limit: "16kb"})
)

app.use(
    express.urlencoded({
        extended: true,
        limit: "16kb"
    })
)

app.use(
    express.static("public")
)


export { app }