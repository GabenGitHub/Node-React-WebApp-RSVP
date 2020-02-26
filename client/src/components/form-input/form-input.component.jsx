import React from 'react';

class FormInput extends React.Component {
    state = {
        id: Math.floor(Math.random() * 10000),
        name: '',
        participate: '',
        plusOne: false,
        plusOneName: '',
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
                // "isInvited": this.state.isInvited
            })
        });
        if (response.ok) {
            console.log(response.body);
            this.setState({ isInvited: 'yes' })
        } else {
            this.setState({ isInvited: 'no' })
            console.log(response.text())
        }
    }

    handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event)
        if(this.state.isInvited === 'yes') {
            this.props.addGuest(this.state);
            this.setState({ 
                id: Math.floor(Math.random() * 10000), 
                name: '', 
                participate: '',
                plusOne: false,
                plusOneName: '',
                isInvited: false
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
                    <label>Your name: </label>
                    <input 
                        type="text" 
                        name='name' 
                        placeholder='type your name'
                        onChange={this.checkName} 
                        value={this.state.name}
                        required/>
                    {
                        this.state.isInvited === 'yes' &&
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
                    }
                    {
                        this.state.participate === 'yes' &&
                        <div>
                            <input 
                            type='checkbox'
                            name='plusOne'
                            onChange={this.handleChange}
                            checked={this.state.plusOne}
                            />
                            <label> +1 guest</label>
                        </div>
                    }
                    {
                        this.state.plusOne && 
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
                    }
                    {
                        this.state.isInvited === 'yes' &&
                        <div>
                            <button>Submit</button>
                        </div>
                    }
                </form>
            </div>
        )
    };
};

export default FormInput;