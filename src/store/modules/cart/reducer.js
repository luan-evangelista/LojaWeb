import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case 'ADD_TO_CART':
            return produce(state, draft => {
                const productsIndex = draft.findIndex(p => p.id === action.products.id);

                if (productsIndex >= 0) {
                    draft[productsIndex].amount += 1;
                } else {
                    draft.push({
                        ...action.products,
                        amount: 1,
                    });
                }
            });
        case 'REMOVE_FROM_CART':
            return produce(state, draft => {
                const productsIndex = draft.findIndex(p => p.id === action.id);

                if (productsIndex >= 0) {
                    draft.splice(productsIndex, 1);
                }
            });
        default:
            return state;
    }
}