const {Schema, model} = require('mongoose')

const ListItemSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
})

const ListItem = model('listItem', ListItemSchema)

module.exports = ListItem