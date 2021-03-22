const express = require('express')
const app = express()
const { PORT, mongoUri } = require('./config')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const ListItemRoutes = require('./routes/api/listItems')

app.use(cors())
app.use(morgan('tiny'))
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://admin:admin@cluster0.b96ba.mongodb.net/testDb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log('Conection has been made!'))
    .catch((err) => console.log('Error is: ', error));

app.use('/api/listItems', ListItemRoutes)
app.get('/', (req, res) => res.send('Hello World!'))

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

