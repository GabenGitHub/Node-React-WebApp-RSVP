import React from 'react';

const Participants = ({ participants }) => (
    <div className='right'>
        <h5>Participants</h5>
        {
            participants.length > 0 ?
                participants.map(participant => (
                    <p key={participant.id}>{participant.name}</p>
                    )) :
                <h5>Loading...</h5>
        }
    </div>
);

export default Participants;