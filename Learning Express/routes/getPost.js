express = require('express');
app = express();

app.get('/getPost/:id', (request, response)=>{

    response.locals.connection.query(`SELECT * FROM posts WHERE id=${request.params.id}`, (error, results) => {
        if(error) throw error;
        response.send(results)

    });

});

module.exports = app;