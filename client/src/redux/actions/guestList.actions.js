import { FETCH_GUESTS, SUBMIT_RESPONSE, ADD_GUEST, REMOVE_GUEST } from './types';

export const fetchGuestList = () => async dispatch => {
    try {
        const respond = await fetch('/api/guests');
        const guests = await respond.json();
        dispatch({
            type: FETCH_GUESTS,
            payload: guests
        });
    } catch (error) {
        console.error(`Fetching error: ${error}`);
    }
};

export const submitResponse = (guestData) => async dispatch => {
    try {
        const respond = await fetch('/api/guests/edit', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        });
        if (await respond.ok) {
            const foundGuest = await respond.json();
            dispatch({
                type: SUBMIT_RESPONSE,
                payload: foundGuest
            });
        } else {
            console.log(await respond.text()) // Not found on the guest list
        }
    } catch (error) {
        console.error(error);
    }
};

export const addGuest = (guestData) => async dispatch => {
    try {
        const respond = await fetch('/api/guests/add', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        });
        if (await respond.ok) {
            const guestAdded = await respond.json();
            dispatch({
                type: ADD_GUEST,
                payload: guestAdded
            });
        } else {
            console.log(await respond.text());
        }
    } catch (error) {
        console.error(error);
    }
};

export const removeGuest = (guestData) => async dispatch => {
    try {
        const respond = await fetch('/api/guests/remove', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(guestData)
        });
        if (await respond.ok) {
            const guestRemoved = await respond.json();
            dispatch({
                type: REMOVE_GUEST,
                payload: guestRemoved
            });
        } else {
            console.log(await respond.text());
        }
    } catch (error) {
        console.error(error);
    }
};