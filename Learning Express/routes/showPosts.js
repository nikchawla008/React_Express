express = require('express');
router = express();


router.get('/showPosts', (request, response) => {
    response.locals.connection.query('SELECT * from posts', (error, results)=>{
        if(error) {
            //Return Internal Server Error
            response.status(500).send(error);
        }
        else
        {
        //Return Success 200 for get requests
        return response.status(200).send(results);}
    });
});

module.exports = router;