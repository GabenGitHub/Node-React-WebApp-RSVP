import React from 'react';

const Participants = ({ participants }) => {
    let isThereParticipant = false;

    return(
    <div className='participants'>
        <h5>Participants:</h5>
        {
            participants.length > 0 ?
                participants.map(participant => {
                    if (participant.participate) {
                        isThereParticipant = true;
                    } 
                    
                    return participant.participate &&
                    <p key={participant.id}>{participant.name}</p>
                }) :
                <h5>Loading...</h5>
            
        }
        {
                participants.length > 0 && !isThereParticipant ? <h5>No participants</h5> : ''
        }
    </div>
)};

export default Participants;