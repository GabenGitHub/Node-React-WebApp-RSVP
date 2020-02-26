import React from 'react';

class FormInput extends React.Component {
    state = {
        id: Math.floor(Math.random() * 10000),
        name: '',
        participate: '',
        plusOne: false,
        plusOneName: '',
        isOnTheList: ''
    };

    checkName = async (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
        const response = await fetch('/api/addGuest', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                // "id": this.state.id,
                "name": event.target.value,
                // "participate": this.state.participate,
                // "plusOne": this.state.plusOne,
                // "plusOneName": this.state.plusOneName,
            })
        });
        if (await response.ok) {
            this.setState({ isOnTheList: 'yes' })
            const foundGuest = await response.json()
            console.log(foundGuest);
            const {name, participate, plusOne, plusOneName} = foundGuest;
            this.setState({ name, participate, plusOne, plusOneName});
            console.log(`Current state: ${this.state.name}`)
        } else {
            this.setState({ isOnTheList: 'no' })
            console.log(await response.text())
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event)
        if(this.state.isOnTheList === 'yes') {
            this.props.addGuest(this.state);
            this.setState({ 
                id: Math.floor(Math.random() * 10000), 
                name: '', 
                participate: '',
                plusOne: false,
                plusOneName: '',
                isOnTheList: false
            });
        }
    };

    handleChange = (event) => {
        console.log(event.target)
        const { name, value, type, checked } = event.target;
        type === 'checkbox' 
            ? this.setState({ [name]: checked }) 
            : this.setState({ [name]: value });
    };

    render() {
        return(
            <div className="form">
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Your name: </label>
                        <input 
                            type="text" 
                            name='name' 
                            placeholder='type your name'
                            onChange={this.checkName} 
                            value={this.state.name}
                            required
                        />
                    </div>
                    <div>
                        <label>Are you participate? </label>
                        <select 
                            name='participate' 
                            onChange={this.handleChange} 
                            value={this.state.participate}
                            required
                        >
                            <option disabled hidden value=''> -- select an option -- </option>
                            <option value='yes'>Coming</option>
                            <option value='no'>Not coming</option>
                        </select>
                    </div>
                    <div>
                        <input 
                        type='checkbox'
                        name='plusOne'
                        onChange={this.handleChange}
                        checked={this.state.plusOne}
                        />
                        <label> +1 guest</label>
                    </div>
                    <div>
                        <input
                            type='text'
                            name='plusOneName'
                            placeholder='name of +1'
                            onChange={this.handleChange}
                            value={this.state.plusOneName}
                            required
                        />
                    </div>
                    <div>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        )
    };
};

export default FormInput;