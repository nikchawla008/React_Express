import React, {Component} from 'react';
import './getPosts.css'
import {Link, withRouter} from 'react-router-dom'
import axios from 'axios';



class GetPosts extends Component{

    constructor(props) {
        super(props);
        this.state = {
            filtered_posts:[],
            newtitle:'',
            newbody:'',
            newuserId:''};
        this.delPost = this.delPost.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.fetchAgain = this.fetchAgain.bind(this);
        this.addPost = this.addPost.bind(this);
        this.handleBodyChange = this.handleBodyChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleUserIdChange = this.handleUserIdChange.bind(this);


    }


    // Loading the posts using fetch

    componentDidMount() {

        //fetch posts from database
        axios.get('http://localhost:4007/api/showPosts')
            .then(response => {
            this.setState({filtered_posts:response.data})
            });

    }


    render() {
        let posts = this.state.filtered_posts;
            return (
                <div className='page'>
                    <h1 align='center'>POSTS</h1>
                    <div>
                    <input type='text' id='sb' onChange={this.handleChange} className='searchbar' placeholder='Enter Search Text'/>
                    <button className='button right' onClick={()=>this.fetchAgain()}>Refetch Posts from REST API</button>
                    <br /> <br/>
                    </div>
                    <div>
                        <input type='text' onChange={this.handleTitleChange} className='searchbar' id='newposttitle'  placeholder='New Post Title' />
                        <input type='text' onChange={this.handleBodyChange} className='searchbar' id='newpostbody' placeholder='New Post Body' />
                        <input type='text' onChange={this.handleUserIdChange} className='searchbar' id='newpostuser' placeholder='New Post UserId'/>
                        <button className='button' onClick={()=> this.addPost()}>Add new post</button>
                    </div>
                        <ul>
                        {posts.map(post => (<li key={post.id}>
                            <div className='rounded_border'>
                                <p className='posttitle'>{post.title}</p>
                                <p className='postbody'>{post.body}</p>
                                <Link  className='button' to={{pathname: '/edit/' + post.id}}>Edit</Link>
                                <button className='button' onClick={() => this.delPost(post)}> Delete</button>
                            </div>
                        </li>))

                        }
                    </ul>
                </div>
            )


    }


//SearchBar Functionality
        handleChange(e){
            //fetch the searchbar value
            let searchfield = e.target.value;

            // if searchfield is not empty, set state filtered_posts = searchPost/e.target.value
            if (searchfield!==''){
                axios.get('http://localhost:4007/api/searchPost/' + searchfield)
                    .then(response => this.setState({filtered_posts:response.data}));

            }
            //if searchfield is empty, set state filtered_posts = showPosts output
            else {
                axios.get('http://localhost:4007/api/showPosts')
                .then(response => this.setState({filtered_posts:response.data}));
            }

    }



// Delete post from database
    delPost(item){
        const id_deleted = item.id;
        axios.delete('http://localhost:4007/api/deletePost/' + id_deleted)
            .then(res=>{
                console.log(res);
                // don't hit api
                axios.get('http://localhost:4007/api/showPosts')
                .then(response => this.setState({filtered_posts:response.data}));
            });

    }


//Fetch posts from source again and set new state
    fetchAgain(){

        axios.get('http://localhost:4007/api/fetchPosts')
            .then((response)=> {
                console.log(response);
                this.setState({filtered_posts:response.data})
            });
    }



//Handle change methods for taking in new title, new body and new userId for addPost
    handleTitleChange(e){
            this.setState({newtitle:e.target.value});
    }

    handleBodyChange(e){
            this.setState({newbody:e.target.value});
    }

    handleUserIdChange(e){
            this.setState({newuserId:e.target.value});
}


// Add new post to database functionality
    addPost()
    {
        let obj = {title:this.state.newtitle, body:this.state.newbody, userId:this.state.newuserId};

        axios.post('http://localhost:4007/api/addPost', obj )
            .then(response => console.log(response));

        //resetting the input boxes
        document.getElementById('newposttitle').value = '';
        document.getElementById('newpostbody').value = '';
        document.getElementById('newpostuser').value = '';

        this.setState({newtitle:'', newbody:'', newuserId:''});

        axios.get('http://localhost:4007/showPosts')
                .then(response => this.setState({filtered_posts:response.data}));


    }


}

export default withRouter(GetPosts);