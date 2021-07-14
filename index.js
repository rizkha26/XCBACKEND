const bodyParser = require("body-parser")
const express = require("express")
const cors = require("cors")
const app = express()
const PORT = 3000

var corsOption = {
    origin: "http://localhost:8501"
}

// app.use(cors(corsOption))
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//config untuk connection ke database
global.config = require('./config/connection');


//Example API
app.get('/api/example', (req, res) => {
    res.send(200, {
        data: {
            name: 'rizkha',
            alamat: 'bekasi',
            age: '17',
            no: '0892738263',
            gender: 'P'
        }
    })
});

app.get('/api/example/:id', (req, res) => {
    const id = req.params.id;
    res.send(200, {
        data: {
            id: id,
            name: 'rizkha',
            alamat: 'bekasi',
            age: '17',
            no: '0892738263'
        }
    })
});
//End Example


//import service
require('./service/pointService')(app, global.config.pool);
require('./service/saldoService')(app, global.config.pool);
require('./service/productService')(app, global.config.pool);





app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT)
})