import React from 'react';

class Image extends React.Component {

    render() {
        if (!this.props.src) {
            return <div style={{ width: '100%', height: '400px' }} />
        }

        return <img src={this.props.src} style={{ width: '100%', height: '400px' }} />
    }
}

export default Image;