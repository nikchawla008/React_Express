import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'
import axios from 'axios'
import './edit.css'

class Edit extends Component{

    constructor(props) {
        super(props);
        let id_edited = this.props.match.params.id;

        this.state = {id:id_edited, posts:[], newtitle:'', newbody:''};

        //this.submitAction = this.submitAction.bind(this)

    }

    componentDidMount() {
        axios.get('http://localhost:4007/getPost/' + this.state.id)
            .then(response => {this.setState({id:this.state.id, posts:response.data});
                        console.log(this.state.posts[0]);
                        this.setState({newtitle:response.data[0].title, newbody:response.data[0].body});
            })
            .catch((err) => console.log(err));

        console.log(this.state.posts);
    }


    render() {

        const post = this.state.posts[0];


        return(

            <div className='bgcolor'>
                {post && (<form className='form' onSubmit={this.submitAction} method='get'>
                <div className='form-header'><h4>EDIT POST</h4> </div>
                      <div className='form-body'>
                                <label className='label_fields' htmlFor='title_input'>Title   </label>
                                <input className='input_fields' onChange={this.handleTitleChange} type='text' id='title_input' placeholder='Title' defaultValue={post.title}/>
                                <br/>
                                <label className='label_fields' htmlFor='body_input'>Body     </label>
                                <input className='input_fields' onChange={this.handleBodyChange} type='text' id='body_input' placeholder='Body' defaultValue={post.body}/>
                                <br/>
                                <button type='submit' className='button right'>Submit</button>
                      </div>

            </form>)}

            </div>
)

        }



        handleTitleChange = (e) => this.setState({newtitle:e.target.value});


        handleBodyChange = (e) => this.setState({newbody:e.target.value});

    submitAction = (e) =>
    {
        e.preventDefault();

        const post = this.state.posts[0]

        if (this.state.newbody !== post.body || this.state.newtitle !== post.title ){

            axios.put('http://localhost:4007/editPost',
                {title:this.state.newtitle,
                    body: this.state.newbody,
                    userId : post.userId,
                    id: post.id
                })
            .then(response => console.log(response));

            axios.get('http://localhost:4007/getPost/' + this.state.id)
            .then(response => {this.setState({id:this.state.id, posts:response.data});
                        this.setState({newtitle:response.data[0].title, newbody:response.data[0].body});
            })
            .catch((err) => console.log(err));

        }


    }


}

export default withRouter(Edit);

