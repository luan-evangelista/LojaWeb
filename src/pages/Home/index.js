import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { formatPrice } from '../../util/format';
import api from '../../services/api';

import * as CartActions from '../../store/modules/cart/actions';



import { ProductList } from './styles';

class Home extends Component {
    state = {
        products: [],
    };

    async componentDidMount() {
        const response = await api.get('products');

        const data = response.data.map(products => ({
            ...products,
            priceFormatted: formatPrice(products.price),
        }));

        this.setState({ products: data });
    }

    handleAddProduct = products => {
        const { addToCart } = this.props;

        addToCart(products);
    };

    render() {
        const { products } = this.state;

        return (
            <ProductList>
                { products.map(products => (
                    <li key={products.id}>
                        <img src={products.image} alt={products.title} />
                        <strong>{products.title}</strong>
                        <span>{products.priceFormatted}</span>

                        <button type="button" onClick={() => this.handleAddProduct(products)}>
                            <div>
                                <MdAddShoppingCart size={16} color="#FFF" /> 3
                            </div>

                            <span>ADICIONAR AO CARRINHO</span>
                        </button>
                    </li>
                ))}
            </ProductList>
        );
    }
}

const mapDispatchToProps = dispatch =>
    bindActionCreators(CartActions, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(Home);