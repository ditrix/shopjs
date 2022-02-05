
import config from 'dotenv/config'
import express from 'express'
import sequelize from './sequelize.js'
import * as mapping from './models/mapping.js'
import cors from 'cors'
import router from './routes/index.js'
import ErrorHandler from './middleware/ErrorHandler.js' 

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/api',router)
app.use(ErrorHandler)

app.get('/',(req,res)=>{
	res.status(200).json({message:'Hello'})
})

app.post('/',(req,res) => {
    res.status(200).json(req.body)
})

const start = async () => {
	try {

		await sequelize.authenticate()

		await sequelize.sync()

		app.listen(PORT,() => console.log('server listen port ',PORT))

	} catch(e){
		console.log(e)
	}
}


start()
