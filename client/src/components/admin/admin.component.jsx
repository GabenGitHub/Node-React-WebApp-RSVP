import React from 'react';
import './admin.styles.css';

import Participants from '../participants/participants.component';

// const { participants } = this.props;

class Admin extends React.Component {
    render() {
        return (
            <div className="container main">
                <h1>Admin page</h1>
                <Participants participants={this.props.participants}/>
            </div>
        )
    };
};

export default Admin;