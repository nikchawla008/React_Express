express = require('express');
app = express()

app.delete('/deletePost/:id', (request, response)=>{

    response.locals.connection.query(`DELETE FROM posts WHERE id=${request.params.id}`, (error, results) => {
        if(error) {
            // 400 INTERNAL SERVER ERROR if Error has occured
            response.status(500).send(error);
        }
        else if(results.affectedRows === 0){
            //BAD REQUEST
            response.status(400).send(results);
        }
        else {
            //Return Success 201 as object has been deleted, 202 if only marked for deletion
        response.status(201).send(results);
        }
    });

});

module.exports = app;