const axios = require('axios');

const mysql = require('mysql');
const express = require('express');
const cors = require('cors')

//database configuration
const dbconfig = require('./dbconfig');

const app = express();

app.use(express.json());
app.use(cors());

// configure mysql initial stage
const db = mysql.createConnection(dbconfig);

//connect to the database and throw error if any
db.connect((err) => {
    if (err) throw err;
    console.log('MYSQL Connected');
});



//TO fetch all posts from the API, use /fetchPosts.. send
app.get('/fetchPosts', (request, response)=>{

    //drop table if it already exists
    db.query('DROP TABLE IF EXISTS posts');

    //create the table
    let table = 'CREATE TABLE IF NOT EXISTS posts (id int PRIMARY KEY AUTO_INCREMENT, userId int, title varchar(255), body MEDIUMTEXT)';

    //run SQL
    db.query(table, (error, result)=>{
        if (error) throw error;
        console.log(result);
    });


    //fetch the posts using axios from the website
    axios.get('https://jsonplaceholder.typicode.com/posts')
        .then((res)=>{let postlist=res.data;
            const insertPost = 'INSERT INTO posts SET ?';

            //map all posts to temp obj and insert into the table
            postlist.map((post) => {
                let obj = {id:post.id,userId: post.userId, title: post.title, body: post.body};

                db.query(insertPost, obj, (error, results) => {
                        if (error) throw error;
                    }
                )
            });

            response.send(postlist);

        });


});


// to get all the posts in the database, use axios.get('/showPosts') and use response.data in react front-end
app.get('/showPosts', (request, response)=>{

    db.query('SELECT * from posts', (error, results)=>{
        if(error) throw error;
        console.log('Posts sent to show')
        return response.json(results);
    });

});


//Get one specific post by calling axios.get(./getPosts/id) and then using that in edit.js screen
app.get('/getPost/:id', (request, response)=>{

    db.query(`SELECT * FROM posts WHERE id=${request.params.id}`, (error, results) => {
        if(error) throw error;
        response.send(results)

    });

});



//to delete post, send the id
app.delete('/deletePost/:id', (request, response)=>{

    db.query(`DELETE FROM posts WHERE id=${request.params.id}`, (error, results) => {
        if(error) throw error;
        response.send('Deleted Object');

    });

});



//to add post, send the userid, title and body
app.post('/addPost', (request, response)=>{

    let obj = {userId:request.body.userId, title:request.body.title, body:request.body.body};
    console.log(obj)
    db.query('INSERT INTO posts SET ?', obj ,(error, results) => {
        if(error) throw error;
        response.send('Object added')
        console.log(results)
    });

});



//Search using title only
app.get('/searchPost/:title', (request, response)=>{

    db.query(`SELECT * FROM posts WHERE LOWER(title) like '%${request.params.title}%'`, (error, results) => {
        if(error) throw error;
        response.send(results)

    });

});




//edit
app.put('/editPost', (request, response)=>{

    let obj = {title:request.body.title, body:request.body.body};
    db.query(`UPDATE posts SET ? WHERE id=${request.body.id}`,obj ,(error, results) => {
        if(error) throw error;
        response.send('Updated')

    });

});




var http = require('http');
module.exports = app;
var server = http.createServer(app);
server.listen(4007);




