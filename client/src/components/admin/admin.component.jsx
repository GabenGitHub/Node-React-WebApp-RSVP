import React from 'react';
// import './admin.styles.css';

import Guests from '../guests/guests.component';


class Admin extends React.Component {
    render() {
        return (
            <div className="main admin">
                <h2 className='about'>Here you can manage the participants</h2>
                <Guests guests={this.props.guests}/>
            </div>
        )
    };
};

export default Admin;