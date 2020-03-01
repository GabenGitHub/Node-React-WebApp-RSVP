import React from 'react';
import { connect } from 'react-redux';
import { addGuest } from '../../redux/actions/guestList.actions';

// ! serverside addGuest post route

class FormAdmin extends React.Component {
    state = {
        name: '',
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        const guestData = {
            "name": this.state.name,
        }

        this.props.addGuest(guestData);
        this.setState({
            // Reset input from
            name: '',
        });
    }
    render() {
        console.log(this.state)
        return(
            <div className='admin-form'>
                <h1>Admin form</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label>Invite guest </label>
                        <input
                            type="text"
                            name='name'
                            placeholder='Guest name'
                            onChange={this.handleChange}
                            value={this.state.name}
                            required
                        />
                    </div>
                    <button>Invite</button>
                </form>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        response: state.response
    }
};

export default connect(mapStateToProps, { addGuest })(FormAdmin);