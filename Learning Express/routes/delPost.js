express = require('express');
app = express()

app.delete('/deletePost/:id', (request, response)=>{

    response.locals.connection.query(`DELETE FROM posts WHERE id=${request.params.id}`, (error, results) => {
        if(error) throw error;
        response.send('Deleted Object');

    });

});

module.exports = app;