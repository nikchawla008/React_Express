express = require('express');
app = express();


app.get('/searchPost/:title', (request, response)=>{

    response.locals.connection.query(`SELECT * FROM posts WHERE LOWER(title) like '%${request.params.title}%'`, (error, results) => {
        if(error) {
            //Return not found 404 error
            response.status(404).send(error);
        }
        // Return Success 200 for get requests
        response.status(200).send(results);

    });

});

module.exports = app;