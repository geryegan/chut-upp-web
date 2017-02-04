import React, { Component } from 'react';
import io from 'socket.io-client';
import Chut from './Chut';
import MessageInput from './MessageInput';
import UserInput from './UserInput';

require('../less/main.less');

class App extends Component {
    
    constructor() {
        super();
        this.state = {
            allMessages: [],
            message: '',
            user: ''           
        };
    }

    componentDidMount() {
        const socket = io();
        io.connect('http://localhost:3000');
        socket.emit('test');
        socket.on('mount', (data) => {
            console.log('where are we', data);
            this.setState({ 
                allMessages: data.allMessages,
                allUsers: data.allUsers
         });
        });
        console.log('component did mount state', this.state);
        socket.on('newMessage', (data) => {
            const allMessages = this.state.allMessages.slice();
            const message = {
                text: data.message,
                user: data.user
            };
            allMessages.push(message);
            this.setState({ allMessages });
        });
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            this.submitMessage();
        }
    }

    setUser() {
        const socket = io();
        const data = {
            user: this.state.user,
            allUsers: this.state.allUsers
        };
        socket.emit('newUser', data);
    }

    handleMessageChange(event) {
        this.setState({ message: event.target.value });
    }

    handleUserChange(event) {
        this.setState({ user: event.target.value });
    }

    submitMessage() {
        const socket = io();
        const data = {
            message: this.state.message,
            user: this.state.user,
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
        return this.state.allMessages.map((message) => (
            <Chut message={message.user + ': ' + message.text} />)
        ); 
    }

    render() {
        return (
            <div>
                <h1>
                    chut upp
                </h1>
                <UserInput 
                submit={this.setUser.bind(this)} 
                changeHandler={this.handleUserChange.bind(this)}
                value={this.state.user}
                />
                <div>
                    {this.renderMessages()}
                </div>
                    <MessageInput
                    onEnter={this.onKeyPress.bind(this)}
                    value={this.state.message}
                    user={this.state.user} 
                    changeHandler={this.handleMessageChange.bind(this)} 
                    type='text' 
                    submit={this.submitMessage.bind(this)}
                    />
                
            </div>
        );
    }
}

export default App;
