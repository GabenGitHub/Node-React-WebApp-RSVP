import React from 'react';
// import './admin.styles.css';

import Guests from '../guests/guests.component';


const Admin = ({ state }) => {
    return (
        <div className="main admin">
            <h2 className='about'>Here you can manage the participants</h2>
            <Guests state={state}/>
        </div>
    )
};

export default Admin;