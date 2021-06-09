import React from 'react';
import { connect } from 'react-redux';
import { MdRemoveCircleOutline, MdAddCircleOutline, MdDelete } from 'react-icons/md';

import { Container, ProductTable, Total } from './styles';

function Cart({ cart, dispatch }) {
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
                                    <button type="button">
                                        <MdRemoveCircleOutline size={20} color="#7159c1" />
                                    </button>
                                    <input type="number" readOnly value={products.amount} />
                                    <button type="button">
                                        <MdAddCircleOutline size={20} color="#7159c1" />
                                    </button>
                                </div>
                            </td>
                            <td>
                                <strong>R$258,80</strong>
                            </td>
                            <td>
                                <button type="button" onClick={() => dispatch({ type: 'REMOVE_FROM_CART', id: products.id })}>
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
                    <strong>R$1920,28</strong>
                </Total>
            </footer>
        </Container>
    );
}

const mapStateToProps = state => ({
    cart: state.cart,
});

export default connect(mapStateToProps)(Cart);