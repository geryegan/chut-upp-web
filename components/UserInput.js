import React, { Component } from 'react';
import { Button, FormControl } from 'react-bootstrap';


class UserInput extends Component {
    render() {
        return (
            <div>
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

export default UserInput;
