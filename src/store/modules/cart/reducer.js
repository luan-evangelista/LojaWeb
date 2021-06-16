import produce from 'immer';

export default function cart(state = [], action) {
    switch (action.type) {
        case '@cart/ADD_SUCCESS':
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
        case '@cart/REMOVE':
            return produce(state, draft => {
                const productsIndex = draft.findIndex(p => p.id === action.id);

                if (productsIndex >= 0) {
                    draft.splice(productsIndex, 1);
                }
            });
        case '@cart/UPDATE_AMOUNT': {
            if (action.amount <= 0) {
                return state;
            }

            return produce(state, draft => {
                const productsIndex = draft.findIndex(p => p.id === action.id);

                if (productsIndex >= 0) {
                    draft[productsIndex].amount = Number(action.amount);
                }
            });
        }
        default:
            return state;
    }
}