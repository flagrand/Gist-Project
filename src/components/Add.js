import React from 'react';
import Wrapper from '../Wrapper';
import { Redirect } from 'react-router-dom';

export default class Add extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            redirect: false,
            description: '',
            public: true,
            filename: '',
            content: ''
        }
    }
    handleDescription = (e) => {
        this.setState({ description: e.target.value });
    }
    handleFilename = (e) => {
        this.setState({ filename: e.target.value });
    }
    handleCodeInput = (e) => {
        this.setState({ content: e.target.value });
    }
    makeJson(){
        const json = {
            description: this.state.description,
            public: this.state.public,
            "files": {
                [this.state.filename]: {
                    content: this.state.content,
                }
            }
        };
        return JSON.stringify(json);
    }
    onSubmit = () => {
        let wrapper = new Wrapper();
        wrapper.createGist(this.makeJson()).then(res => {
            console.log(res);
            this.setState({ redirect: true });
        });
    }
    render(){
        if(!this.state.redirect){
            return (
                <div>
                <h1>Make new gist: </h1>
                <div className="form_container">
                    <form tabIndex="0" id="create_form">
                        <fieldset>
                            <div className="bace-inputs">
                                <input type="text" placeholder="description" id="description" name="description" defaultValue={this.state.description} onChange={this.handleDescription} />
                                <input type="text" placeholder="filename" id="filename" name="filename" defaultValue={this.state.filename} onChange={this.handleFilename} />
                            </div>
                            <textarea tabIndex="0" id="code" rows="5" cols="60" name="code" placeholder="code" defaultValue={this.state.content} onChange={this.handleCodeInput}></textarea>
                        </fieldset>
                        <button className="btn submit-btn" type="button" onClick={this.onSubmit}>Submit!</button>
                    </form>
                </div>
            </div>
            )
        }
        if(this.state.redirect){
            return <Redirect to="/" />
        }
    }
}