express = require('express');
app = express();


app.get('/searchPost/:title', (request, response)=>{

    response.locals.connection.query(`SELECT * FROM posts WHERE LOWER(title) like '%${request.params.title}%'`, (error, results) => {
        if(error) throw error;
        response.send(results)

    });

});

module.exports = app;