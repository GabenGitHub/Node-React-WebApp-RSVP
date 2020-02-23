import React from 'react';
// import './admin.styles.css';

import Participants from '../participants/participants.component';


class Admin extends React.Component {
    render() {
        return (
            <div className="main">
                <h5 className='about'>Here you can manage the participants</h5>
                <Participants participants={this.props.participants}/>
            </div>
        )
    };
};

export default Admin;