express = require('express');
app = express();



app.post('/addPost', (request, response)=>{

    let obj = {
        userId:request.body.userId,
        title:request.body.title,
        body:request.body.body
    };

    response.locals.connection.query('INSERT INTO posts SET ?', obj ,(error, results) => {
        if(error) {
            // 400 BAD REQUEST if post not Added to Database
            response.status(400).send(error);
            }
        else
        {   // Success 201 for POST methods
            response.status(201).send(obj);
            }
    });

});

module.exports = app;