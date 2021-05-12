express = require('express');
router = express();


router.get('/showPosts', (request, response) => {
    response.locals.connection.query('SELECT * from posts', (error, results)=>{
        if(error) {
            throw error
        }
        else
        {console.log('Posts sent to show');
        return response.json(results);}
    });
});

module.exports = router;