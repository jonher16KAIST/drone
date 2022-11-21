const mongoose = require('mongoose')

const Building = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: true },
		id_key: { type: String, required: true, unique: true },
	},
	{ collection: 'buildingdata' }
)

const model = mongoose.model('BuildingData', Building)

module.exports = model