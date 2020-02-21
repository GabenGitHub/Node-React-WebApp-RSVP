import React from 'react';
import './home.styles.css'

import About from '../about/about.component';
import Participants from '../participants/participants.component';

const Home = ({ participants }) => {
    return(
    <div className="container main">
        <About />
        <Participants participants={participants} />
    </div>
)};

export default Home;