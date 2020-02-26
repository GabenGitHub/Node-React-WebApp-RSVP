import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Admin from './components/admin/admin.component';
import Footer from './components/footer/footer.component';

class App extends React.Component {
    state = {
        guests: []
    };

    async componentDidMount() {
        try {
            const respond = await fetch('/api/listGuests');
            const resJson = await respond.json();
            this.setState({ guests: resJson });
        } catch (error) {
            console.log(error);
        }
    };

    addGuest = (guest) => {
        const guests = [...this.state.guests, guest];
        this.setState({ guests })
    };

    render() {
        return (
            <div className='grid-container'>
                <BrowserRouter>
                        <Navbar />
                        <Switch>
                            <Route exact path='/'>
                                <Home guests={this.state.guests} addGuest={this.addGuest} />
                            </Route>
                            <Route path='/admin'>
                                <Admin guests={this.state.guests}  />
                            </Route>
                        </Switch>
                        <Footer />
                </BrowserRouter>
            </div>
        );
    };
};

export default App;
