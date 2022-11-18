const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')

app.use(cors())
app.use(express.json())

const mongo = {ip: '192.168.0.105', port: "27017"}


mongoose.connect(`mongodb://${mongo.ip}:${mongo.port}/drone`)

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.pwd,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {

	const user = await User.findOne({
		email: req.body.email,
		password: req.body.pwd,
	})

	if (user) {
		return res.json({ status: 'ok', user: true })
	} else {
		return res.json({status:'error', user: false})
	}

	
})

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: req.body.pwd,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: err })
	}
})

app.listen(1337, () => {
	console.log('Server started on 1337')
})


