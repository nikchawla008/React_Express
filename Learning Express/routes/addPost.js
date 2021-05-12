express = require('express');
app = express();



app.post('/addPost', (request, response)=>{

    let obj = {
        userId:request.body.userId,
        title:request.body.title,
        body:request.body.body
    };

    console.log(obj)
    response.locals.connection.query('INSERT INTO posts SET ?', obj ,(error, results) => {
        if(error) throw error;
        response.send('Object added')
        console.log(results)
    });

});

module.exports = app;