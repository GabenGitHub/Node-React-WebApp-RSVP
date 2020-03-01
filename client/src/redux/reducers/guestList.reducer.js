import { FETCH_GUESTS, SUBMIT_RESPONSE, ADD_GUEST } from '../actions/types';
import { addGuestToList } from '../actions/guest.util';

const initState = {
    guests: []
};

export default function(state = initState, action) {
    switch (action.type) {
        case FETCH_GUESTS:
            return {
                ...state,
                guests: action.payload
            }
        case SUBMIT_RESPONSE:
            return {
                ...state,
                guests: action.payload
            }
        case ADD_GUEST:
            return {
                ...state,
                guests: addGuestToList(state.guests, action.payload)
            }
        default:
            return state;
    };
};

