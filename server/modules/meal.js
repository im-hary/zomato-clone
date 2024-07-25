
const mongosh = require('mongoose')
const UserSchema = new mongosh.Schema({
    name: { type: String },
    content: { type: String, required: true },
    Img: { type: String, required: true }
})
const Mealtype = mongosh.model("mealtypes", UserSchema)
module.exports = Mealtype
