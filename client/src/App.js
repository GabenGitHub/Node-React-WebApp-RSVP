import React from 'react';
// import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Admin from './components/admin/admin.component';
import Footer from './components/footer/footer.component';

class App extends React.Component {
    state = {
        participants: []
    };

    async componentDidMount() {
        try {
            const respond = await fetch('/api/participants');
            const resJson = await respond.json();
            this.setState({ participants: resJson });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <div className='grid-container'>
                <BrowserRouter>
                        <Navbar />
                        <Switch>
                            <Route exact path='/'>
                                <Home participants={this.state.participants} />
                            </Route>
                            <Route path='/admin'>
                                <Admin participants={this.state.participants} />
                            </Route>
                        </Switch>
                        <Footer />
                </BrowserRouter>
            </div>
        );
    };
};

export default App;
