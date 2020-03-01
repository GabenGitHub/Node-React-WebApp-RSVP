import React from 'react';
import { connect } from 'react-redux';
import { submitResponse } from '../../redux/actions/guestList.actions';

class FormInput extends React.Component {
    state = {
        _id: '',
        name: '',
        participate: '',
        plusOne: false,
        plusOneName: '',
        isOnTheList: false
    };

    handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        type === 'checkbox'
            ? this.setState({ [name]: checked })
            : this.setState({ [name]: value });
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
    };

    handleSubmit = (event) => {
        event.preventDefault();
        
        const guestData = {
            "_id": this.state._id,
            "name": this.state.name,
            "participate": this.state.participate,
            "plusOne": this.state.plusOne,
            "plusOneName": this.state.plusOneName,
        }

        this.props.submitResponse(guestData);
        this.setState({
                // Reset input from
                _id: '',
                name: '',
                participate: '',
                plusOne: false,
                plusOneName: '',
                isOnTheList: false
            });
    }

    render() {
        return(
            <div className="user-form">
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
                    {
                        this.state.isOnTheList &&
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
                            <div>
                                <input 
                                type='checkbox'
                                name='plusOne'
                                onChange={this.handleChange}
                                checked={this.state.plusOne}
                                />
                                <label> +1 guest</label>
                            </div>
                            {
                                this.state.plusOne === true &&
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
                        </div>
                    }
                    {
                    this.state.isOnTheList &&
                    <div>
                        <button>Submit</button>
                    </div>
                    }
                </form>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        response: state.response
    }
};

export default connect(mapStateToProps, { submitResponse })(FormInput);