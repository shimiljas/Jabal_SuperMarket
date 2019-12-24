const express = require('express')
const path = require('path')
const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/ping', (req, res) => {
    return res.send('pong')
})


app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'), function (err) {
        if (err) {
            console.log('1111111111', err)
            res.status(500).send(err)
        }
    })
})

app.listen(8086, () => {
    console.log('listening on PORT 8086')
})
