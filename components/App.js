import React, { Component } from 'react';
import io from 'socket.io-client';

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
            socket.emit('my other event', { my: 'data' });
        });
        socket.on('newMessage', (data) => {
            const allMessages = this.state.allMessages.slice();
            allMessages.push(data.message);
            this.setState({ allMessages });
        });
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
        return this.state.allMessages.map((message) => (<li>{message}</li>)); 
    }

    render() {
        return (
            <div>
                <h1>
                    CHUT UPP
                </h1>
                <ul>
                    {this.renderMessages()}
                </ul>
                <input 
                value={this.state.message} 
                onChange={this.handleChange.bind(this)} 
                type='text' 
                />
                <button onClick={this.submitMessage.bind(this)}>Submit</button>
            </div>
        );
    }
}

export default App;
