import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import userRouter from './routes/user.route.js'
import channelRouter from './routes/channel.route.js'
import videoRouter from './routes/video.route.js'

const app = express()

app.use(
    cors({
        origin: '*',
        credentials: true,
    })
)

app.use(cookieParser())
app.use(
    express.urlencoded({
        extended: true,
        limit: '16kb',
    })
)
app.use(express.static('public'))
app.use(express.json())

app.use('/api/v1/users', userRouter)
app.use('/api/v1/channels', channelRouter)
app.use('/api/v1/videos', videoRouter)

export default app
