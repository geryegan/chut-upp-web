import React, { Component } from 'react';

require('../less/main.less');

class Chut extends Component {
    
    render() {
        return (
            <div className='chat'>{this.props.message}</div>
        );
    }
}

export default Chut;
