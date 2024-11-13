import app from './app.js'
import { connetToDB } from './db/index.db.js'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env',
})
connetToDB()
    .then(() => {
        app.listen(process.env.PORT || 500, () => {
            console.log('Server running at port 8000')
        })
    })
    .catch((err) => {
        console.log('connection Failed : ', err.message)
    })
