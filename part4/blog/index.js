const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogRouter = require('./controllers/blogs')


mongoose.set('strictQuery', false)

mongoose.connect(config.MONGODB_URI).then(()=> {
  logger.info('database connected')
}).catch(error => {
  logger.error(error)
})


app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})