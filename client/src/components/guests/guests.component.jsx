import React from 'react';

const Guests = ({ state }) => {
    return(
        <div className='guests'>
            <h5>Invited:</h5>
            {
                state.guests.length > 0 ?
                state.guests.map(guest => {
                        return (
                            <div key={guest._id}>
                                <span>- {guest.name}</span>
                            </div>)
                    }) :
                    <h5>Loading...</h5>
                
            }
            <br/>
            <h5>Participate:</h5>
            {
                state.guests.map(guest => {
                    if(guest.participate === 'yes') {
                        return (
                            <div key={guest._id}>
                                <span>{guest.name}</span> |
                                <span>{guest.participate === 'yes' ? 'Yes' : 'No'}</span> |
                                <span>{guest.plusOne && `+1: ${guest.plusOneName}`}</span>
                            </div>)
                    } else {
                        return (
                            <div key={guest._id}></div>
                        )
                    }
                })
            }
            <br/>
            <h5>Can't participate:</h5>
            {
                state.guests.map(guest => {
                    if(guest.participate === 'no') {
                        return (
                            <div key={guest._id}>
                                <span>{guest.name}</span> |
                                <span>{guest.participate === 'yes' ? 'Yes' : 'No'}</span> |
                            </div>)
                    } else {
                        return (
                            <div key={guest._id}></div>
                        )
                    }
                })
            }
        </div>)
};

export default Guests;