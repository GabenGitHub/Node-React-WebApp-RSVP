import React from 'react';

import Guests from '../guests/guests.component';
import FormAdmin from '../form-admin/form-admin.component';

const Admin = () => {
    return (
        <div className="main admin">
            <div className='about'>
                <h2>Admin form</h2>
                <p>Here you can manage the participants</p>
            </div>
            
            <FormAdmin />
            <Guests />
        </div>
    )
};

export default Admin;