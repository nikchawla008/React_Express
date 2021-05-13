express = require('express');
app = express();

app.put('/editPost', (request, response)=>{

    let obj = {title:request.body.title, body:request.body.body};

    response.locals.connection.query(`UPDATE posts SET ? WHERE id=${request.body.id}`,obj ,(error, results) => {



        if(error) {
            // BAD Request Error
            response.status(500).send(error);}

        else if(results.affectedRows === 0){
            response.status(400).send(results);
        }

        else{
            //Success 201 for PUT requests
        response.status(201).send(obj);
        }
    });

});

module.exports = app;