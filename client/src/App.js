import React from 'react';
import './App.css'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Navbar from './components/navbar/navbar.component';
import Home from './components/home/home.component';
import Admin from './components/admin/admin.component';
import Footer from './components/footer/footer.component';

class App extends React.Component {
    state = {
        guests: [],
        _id: '',
        name: '',
        participate: '',
        plusOne: false,
        plusOneName: '',
        isOnTheList: false
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

    checkName = async (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        const respond = await fetch('/api/checkGuest', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "name": event.target.value,
            })
        });
        if (await respond.ok) {
            const foundGuest = await respond.json()
            const { _id, name, participate, plusOne, plusOneName } = foundGuest;
            this.setState({ _id, name, participate, plusOne, plusOneName, isOnTheList: true });
        } else {
            this.setState({ isOnTheList: false })
        }
    }

    handleSubmit = async (event) => {
        try {
            event.preventDefault();
            const respond = await fetch('/api/editGuest', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "_id": this.state._id,
                    "name": this.state.name,
                    "participate": this.state.participate,
                    "plusOne": this.state.plusOne,
                    "plusOneName": this.state.plusOneName,
                })
            });
            if (await respond.ok) {
            const resJson = await respond.json();
            this.setState({ 
                guests: resJson,
                // Reset input from
                _id: '',
                name: '',
                participate: '',
                plusOne: false,
                plusOneName: '',
                isOnTheList: false
            });
            } else {
                console.log(await respond.text())
            }
        } catch (error) {
            console.log(error);
        }
    };

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        type === 'checkbox'
            ? this.setState({ [name]: checked })
            : this.setState({ [name]: value });
    };

    render() {
        return (
            <div className='grid-container'>
                <BrowserRouter>
                    <Navbar />
                    <Switch>
                        <Route exact path='/'>
                            <Home 
                                state={this.state}
                                checkName={this.checkName}
                                handleChange={this.handleChange}
                                handleSubmit={this.handleSubmit}
                            />
                        </Route>
                        <Route path='/admin'>
                        <Admin state={this.state}/>
                        </Route>
                    </Switch>
                    <Footer />
                </BrowserRouter>
            </div>
        );
    };
};

export default App;
