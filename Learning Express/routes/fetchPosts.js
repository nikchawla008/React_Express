express = require('express');
router = express();
axios = require('axios');



router.get('/fetchPosts', (request, response)=>{

    //drop table if it already exists
    response.locals.connection.query('DROP TABLE IF EXISTS posts');

    //create the table
    let table = 'CREATE TABLE IF NOT EXISTS posts (id int PRIMARY KEY AUTO_INCREMENT, userId int, title varchar(255), body MEDIUMTEXT)';

    //run SQL
    response.locals.connection.query(table, (error, result)=>{
        if (error) throw error;
    });


    //fetch the posts using axios from the website
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>{let postlist=res.data;
            const insertPost = 'INSERT INTO posts SET ?';

            //map all posts to temp obj and insert into the table
            postlist.map((post) => {
                let obj = {id:post.id,userId: post.userId, title: post.title, body: post.body};

                response.locals.connection.query(insertPost, obj, (error, results) => {
                        if (error) {
                            //Return 400 BAD REQUEST in case of Error
                            response.status(400).send('Unable to fetch Posts');
                        }
                    }
                )
            });
            //Return Success 200 for get requests
            response.status(200).send(postlist);

        });


});

module.exports = router;