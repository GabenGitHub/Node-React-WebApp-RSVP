import React from 'react';

import Guests from '../guests/guests.component';
import FormAdmin from '../form-admin/form-admin.component';

const Admin = () => {
    return (
        <div className="main admin">
            <h2 className='about'>Here you can manage the participants</h2>
            <FormAdmin
                // state={state}
                // checkName={checkName}
                // handleSubmit={handleSubmit}
                // handleChange={handleChange}
            />
            <Guests />
        </div>
    )
};

export default Admin;