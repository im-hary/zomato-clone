const mongosh = require('mongoose')
const UserSchema = new mongosh.Schema({
    location_id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    locality: { type: String, required: true },
    city: { type: String },
    aggregate_rating: { type: Number },
    rating_text: { type: String },
    min_price: { type: Number },
    contact_number: { type: String },
    content: { type: String, required: true },
    Img: { type: String, required: true }
})

const Usermodel = mongosh.model("res", UserSchema)
// const Mealtype = mongosh.model("mealtype", UserSchema)
module.exports = Usermodel
// module.exports = Mealtype