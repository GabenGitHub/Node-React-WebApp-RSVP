import React from 'react';
import { connect } from 'react-redux';
import { addGuest, removeGuest } from '../../redux/actions/guestList.actions';

class FormAdmin extends React.Component {
    state = {
        nameAdd: '',
        nameRemove: '',
    }

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
            const { name } = foundGuest;
            this.setState({ nameRemove: name });
        }
    };

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmitAdd = (event) => {
        event.preventDefault();

        const guestData = {
            "name": this.state.nameAdd,
        }

        this.props.addGuest(guestData);
        this.setState({
            // Reset input from
            nameAdd: '',
        });
    };
    handleSubmitRemove = (event) => {
        event.preventDefault();

        const guestData = {
            "name": this.state.nameRemove,
        }

        this.props.removeGuest(guestData);
        this.setState({
            // Reset input from
            nameRemove: '',
        });
    };

    render() {
        return(
            <div className='admin-form'>
                <form onSubmit={this.handleSubmitAdd}>
                    <div>
                        <label>Invite guest </label>
                        <input
                            type="text"
                            name='nameAdd'
                            placeholder='Guest name'
                            onChange={this.handleChange}
                            value={this.state.nameAdd}
                            required
                        />
                    </div>
                    <button>Invite</button>
                </form>
                <br/>
                <hr/>
                <br/>
                <form onSubmit={this.handleSubmitRemove}>
                    <div>
                        <label>Remove guest </label>
                        <input
                            type="text"
                            name='nameRemove'
                            placeholder='Guest name'
                            onChange={this.checkName}
                            value={this.state.nameRemove}
                            required
                        />
                    </div>
                    <button>Remove</button>
                </form>
            </div>
        );
    };
};

export default connect(null, { addGuest, removeGuest })(FormAdmin);