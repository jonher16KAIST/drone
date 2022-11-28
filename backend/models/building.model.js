const mongoose = require('mongoose')

const Building = new mongoose.Schema(
	{
		name: { type: String, required: true, unique: false },
		id_key: { type: String, required: true, unique: false },
	},
	{ collection: 'buildingdata' }
)

const model = mongoose.model('BuildingData', Building)

module.exports = model