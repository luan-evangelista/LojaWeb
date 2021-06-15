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
