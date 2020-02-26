import React from 'react';

const Guests = ({ guests }) => {
    return(
    <div className='guests'>
        <h5>Guests:</h5>
        <p>Name | Participate | +1 | Name of +1</p>
        {
            Guests.length > 0 ?
                guests.map(guest => {
                    return (
                        <div key={guest._id}>
                            <span>{guest.name}</span> | 
                            <span>{guest.participate === 'yes' ? 'Yes': 'No'}</span> | 
                            <span>{guest.plusOne && `+1: ${guest.plusOneName}`}</span>
                        </div>)
                }) :
                <h5>Loading...</h5>
            
        }
    </div>
)};

export default Guests;