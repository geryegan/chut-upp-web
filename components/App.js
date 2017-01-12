import React, { Component } from 'react';
import io from 'socket.io-client';
import Chut from './Chut';
import MessageInput from './MessageInput';

require('../less/main.less');

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            allMessages: [],
            message: ''            
        };
    }

    componentDidMount() {
        const socket = io();
        io.connect('http://localhost:3000');
        socket.emit('test');
        socket.on('mount', (data) => {
            console.log('where are we', data);
            this.setState({ allMessages: data.allMessages });
        });
        socket.on('newMessage', (data) => {
            const allMessages = this.state.allMessages.slice();
            allMessages.push(data.message);
            this.setState({ allMessages });
        });
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.submitMessage();
        }
    }

    handleChange(event) {
        this.setState({ message: event.target.value });
    }

    submitMessage() {
        const socket = io();
        const data = {
            message: this.state.message,
            allMessages: this.state.allMessages
        };
        socket.emit('newMessage', data);
        // const allMessages = this.state.allMessages.slice();
        // allMessages.push(this.state.message);
        this.setState({ 
            message: ''
            // allMessages
        });
    }

    renderMessages() {
        return this.state.allMessages.map((message) => (<Chut message={message} />)); 
    }

    render() {
        return (
            <div>
                <h1>
                    chut upp
                </h1>
                <div>
                    {this.renderMessages()}
                </div>
                    <MessageInput
                    onEnter={this.onKeyPress.bind(this)}
                    value={this.state.message} 
                    changeHandler={this.handleChange.bind(this)} 
                    type='text' 
                    submit={this.submitMessage.bind(this)}
                    />
                
            </div>
        );
    }
}

export default App;
