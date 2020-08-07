const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
var cors = require('cors');
//connect database
connectDB();

const app = express();
app.use(cors());
app.options('*', cors());

//INIT MIDDLEWARE
app.use(express.json({ extended: false }));

//Defining routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/posts', require('./routes/api/posts'));

//serve static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
