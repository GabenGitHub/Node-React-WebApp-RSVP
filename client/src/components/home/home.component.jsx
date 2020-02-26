import React from 'react';
// import './home.styles.css'

import About from '../about/about.component';
import Guests from '../guests/guests.component';
import FormInput from '../form-input/form-input.component';

const Home = ({ state, checkName, handleSubmit, handleChange }) => {
    return(
    <div className="main">
            <About />
            <FormInput 
                state={state}
                checkName={checkName}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
            />
            <Guests state={state} />
    </div>
)};

export default Home;