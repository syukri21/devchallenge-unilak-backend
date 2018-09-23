import mongoose from "mongoose"

const Schema = mongoose.Schema;


const eventsSchema = new Schema({
	
		eventid : {
			type: String,
			required: true,
			unique: true
		},
		date: Date,
		description : String,
		location: String,
		projectid: {
			type: Array,
		    default: []
		},
		}, {collection: "events", timestamps:true}
	
)


module.exports = mongoose.model("events", eventsSchema)