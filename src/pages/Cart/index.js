import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import { Container, ProductTable, Total } from './styles';
import produce from 'immer';

function Cart({ cart, total, removeFromCart, updateAmount }) {
    function increment(products) {
        updateAmount(products.id, products.amount + 1);
    }

    function decrement(products) {
        updateAmount(products.id, products.amount - 1);
    }

    return (
        <Container>
            <ProductTable>
                <thead>
                    <tr>
                        <th />
                        <th>PRODUTO</th>
                        <th>QTD</th>
                        <th>SUBTOTAL</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {cart.map(products => (
                        <tr>
                            <td>
                                <img
                                    src={products.image}
                                    alt={products.title}
                                />
                            </td>
                            <td>
                                <strong>{products.title}</strong>
                                <span>{products.priceFormatted}</span>
                            </td>
                            <td>
                                <div>
                                    <button type="button" onClick={() => decrement(products)}>
                                        <MdRemoveCircleOutline size={20} color="#7159c1" />
                                    </button>
                                    <input type="number" readOnly value={products.amount} />
                                    <button type="button" onClick={() => increment(products)}>
                                        <MdAddCircleOutline size={20} color="#7159c1" />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>{products.subtotal}</strong>
                            </td>
                            <td>
                                <button type="button" onClick={() => removeFromCart(products.id)}>
                                    <MdDelete size={20} color="#7159c1" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </ProductTable>

            <footer>
                <button type="button">Finalizar pedido</button>

                <Total>
                    <span>TOTAL</span>
                    <strong>{total}</strong>
                </Total>
            </footer>
        </Container>
    );
}

const mapStateToProps = state => ({
    cart: state.cart.map(products => ({
        ...products,
        subtotal: formatPrice(products.price * products.amount),
    })),
    total: formatPrice(state.cart.reduce((total, products) => {
        return total + products.price * products.amount;
    }, 0)
    ),
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Cart);