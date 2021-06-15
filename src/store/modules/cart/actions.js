export function addToCart(products) {
    return {
        type: '@cart/ADD',
        products,
    };
}

export function removeFromCart(id) {
    return{
        type: '@cart/REMOVE', 
        id,
    };
}

export function updateAmount(id, amount) {
    return {
        type: '@cart/UPDATE_AMOUNT',
        id,
        amount,
    };
}