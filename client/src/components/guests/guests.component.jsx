import React from 'react';
import { connect } from 'react-redux';
import { fetchGuestList } from '../../redux/actions/guestList.actions';

class Guests extends React.Component {
    componentDidMount() {
        this.props.fetchGuestList();
    }
    
    render() {
        const guests = this.props.guests;

        // Counter
        let counter = {
            coming: 0,
            notComing: 0
        }
        guests.map(guest => {
            if(guest.participate === 'yes') {
                counter.coming++;
            }
            if(guest.participate === 'no') {
                counter.notComing++;
            }
            return counter;
        });
    return(
        <div className='guests'>
            <h5>Invited ({guests.length}):</h5>
            {
                guests.map(guest => {
                    return (
                        <div key={guest._id}>
                            {
                                guest.participate === 'yes' &&
                                <span><i className="far fa-check-circle"></i></span>
                            }
                            {
                                guest.participate === 'no' &&
                                <span><i className="far fa-times-circle"></i></span>
                            }
                            {
                                guest.participate === '' &&
                                <span><i className="far fa-envelope"></i></span>
                            }
                            <span> {guest.name}</span>
                        </div>
                    )
                })
                
            }
            <br/>
            <h5>Participate ({counter.coming}):</h5>
            {
                guests.map(guest => {
                    if(guest.participate === 'yes') {
                        return (
                            <div key={guest._id}>
                                <span><i className="far fa-check-circle"></i></span>
                                <span> {guest.name} </span>
                                {
                                    guest.plusOne &&
                                    <span><i className="fas fa-user-plus"></i>{` ${guest.plusOneName}`}</span>
                                }
                            </div>)
                    } else {
                        return (
                            <div key={guest._id}></div>
                        )
                    }
                })
            }
            <br/>
            <h5>Can't participate ({counter.notComing}):</h5>
            {
                guests.map(guest => {
                    if(guest.participate === 'no') {
                        return (
                            <div key={guest._id}>
                                <span><i className="far fa-times-circle"></i></span>
                                <span> {guest.name}</span>
                            </div>)
                    } else {
                        return (
                            <div key={guest._id}></div>
                        )
                    }
                })
            }
            <br/>
            <h5>Pending respond ({guests.length - counter.notComing - counter.coming}):</h5>
            {
                guests.map(guest => {
                    if(guest.participate === '') {
                        return (
                            <div key={guest._id}>
                                <span><i className="far fa-envelope"></i></span>
                                <span> {guest.name}</span>
                            </div>)
                    } else {
                        return (
                            <div key={guest._id}></div>
                        )
                    }
                })
            }
        </div>)
    }
};

const mapStateToProps = (state) => {
    return {
        guests: state.guestList.guests
    }
};

export default connect(mapStateToProps,{ fetchGuestList })(Guests);