const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    bio: String,
    password: { type: String, required: true },
    cars: [{ type: Schema.Types.ObjectId, ref:'Car' }],
})

module.exports = model('User', userSchema)