export const addGuestToList = (guests, guestToAdd) => {
    return [...guests, { ...guestToAdd }]
};

// export const removeItemFromCart = (cartItems, cartItemToRemove) => {
//     const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

//     if (existingCartItem.quantity === 1) {
//         return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
//     } else {
//         return cartItems.map(cartItem =>
//             cartItem.id === cartItemToRemove.id
//                 ? { ...cartItem, quantity: cartItem.quantity - 1 }
//                 : cartItem
//         )
//     }
// };