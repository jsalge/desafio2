const express = require('express')
const app = express()
const port = 3000

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const mysql = require('mysql')

const connection = mysql.createConnection(config)

const sql = `INSERT INTO people(name) values('joao')`

connection.query(sql)

connection.end()

app.get('/', (req,res) => {
    var retorno = '<h1>Full Cycle Rocks!</h1>'
    const connection = mysql.createConnection(config)

    const sqlSelect = `SELECT * FROM people`

    connection.query(sqlSelect, function(err, result, fields){
        if(err) {
            retorno = '<h1>Erro na consulta com o banco de dados</h1>'
            res.send(retorno)
            throw err;
        }
        
        result.map(people => {
            retorno = retorno+'<li>'+people.name+'</li>';
        })
        res.send(retorno)
        

    })
    
})



app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})