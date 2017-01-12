import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';


class MessageInput extends Component {
    render() {
        return (
            <div className='chat-input bottom'>
                <FormControl
                    onKeyPress={this.props.onEnter}
                    value={this.props.value}
                    onChange={this.props.changeHandler}
                    type='text'
                />
                <Button onClick={this.props.submit}>Submit</Button>
            </div>
        );
    }
}

export default MessageInput;
