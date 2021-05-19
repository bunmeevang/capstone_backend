const { Schema, model} = require('mongoose');

const carSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
})

module.exports = model('Car', carSchema)