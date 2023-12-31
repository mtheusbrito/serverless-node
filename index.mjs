import express from 'express'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
const app = express()
const __dirname = dirname(fileURLToPath(import.meta.url))



app.use(express.json())
app.use(express.static(join(__dirname, 'interface')))
app.listen(process.env.PORT || 3000, () => {
  console.log('Server started')
})
