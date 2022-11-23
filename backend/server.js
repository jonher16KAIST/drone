const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model')
const Building = require('./models/building.model')
const socket = require("socket.io")
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

app.use(cors())
app.use(express.json())

const mongo = { ip: '192.168.0.105', port: "27017" }

mongoose.connect(`mongodb://${mongo.ip}:${mongo.port}/drone`)

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.pwd, 10)
		await User.create({
			username: req.body.username,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		console.log(err)
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {

	const user = await User.findOne({
		email: req.body.email,
	})

	if(!user) { return {status: 'error', error: 'Invalid login '}}

	const isPasswordValid = await bcrypt.compare(req.body.pwd, user.password)

	if (isPasswordValid) {
		const token = jwt.sign({
			username: user.username,
			email: user.email,
		}, 'secret123')
		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}


})


app.get('/api/buildings', async (req, res) => {

	const buildings = await Building.find()

	if (buildings) {
		return res.json({ status: 'ok', buildings: buildings })
	} else {
		return res.json({ status: 'error', buildings: null })
	}


})

app.listen(1337, () => {
	console.log('Server started on 1337')
})

const httpServer = require("http").createServer();

const io = socket(httpServer, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
})



io.on("connection", (socket) => {
	console.log("connection established for user ", socket.id)

	socket.on("disconnect", () => {
		console.log("A user has been disconnected")
	})
})

httpServer.listen(4000, () => {
	console.log("Socket io server started on 4000")
});
