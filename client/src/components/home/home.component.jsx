import React from 'react';
// import './home.styles.css'

import About from '../about/about.component';
import Guests from '../guests/guests.component';
import FormInput from '../form-input/form-input.component';

const Home = ({ guests, addGuest }) => {
    return(
    <div className="main">
            <About />
            <FormInput guests={guests} addGuest={addGuest}/>
            <Guests guests={guests} />
    </div>
)};

export default Home;