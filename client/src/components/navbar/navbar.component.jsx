import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = () => (
    <header className='navbar'>
        <nav className="nav-wrapper #007261 teal darken-3">
            <div className="container">
                <Link to='/' className='brand-logo'>Logo</Link>
                <ul id="nav-mobile" className="right">
                    <li className='hide-on-small-and-down'><Link to='/'>Home</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                </ul>
            </div>
        </nav>
    </header>
);

export default Navbar;