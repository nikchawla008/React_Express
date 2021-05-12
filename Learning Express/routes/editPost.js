express = require('express');
app = express();

app.put('/editPost', (request, response)=>{

    let obj = {title:request.body.title, body:request.body.body};
    response.locals.connection.query(`UPDATE posts SET ? WHERE id=${request.body.id}`,obj ,(error, results) => {
        if(error) throw error;
        response.send('Updated')

    });

});

module.exports = app;