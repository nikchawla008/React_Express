express = require('express');
app = express();

app.get('/getPost/:id', (request, response)=>{

    response.locals.connection.query(`SELECT * FROM posts WHERE id=${request.params.id}`, (error, results) => {
        if(error) {
            // 404 Not found error code if no post available
            response.status(404).send(error);
        }
        else {
            //Success status 200 for successful get request
            response.status(200).send(results)
        }
    });

});

module.exports = app;