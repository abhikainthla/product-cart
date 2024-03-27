import React, { useState, useEffect } from 'react';

function Cart() {
    const products = [
        {id: 1, name: 'Product-1', price:100},
        {id: 2, name: 'Product-2', price:200},
        {id: 3, name: 'Product-3', price:300},
    ];
    const [cartItems, setCartItems] = useState({});
    const [total, setTotal] = useState(0);
    
    useEffect(() => {
        calculateTotal();
    }, [cartItems]);

    function calculateTotal() {
        let sum = 0;
        for (let productId in cartItems) {
            const product = products.find(product => product.id === parseInt(productId));
            sum += product.price * cartItems[productId];
        }
        setTotal(sum);
    }
    
    function handleAddToCart(productId) {
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};
            updatedItems[productId] = (updatedItems[productId] || 0) + 1;
            return updatedItems;
        });
    }

    function handleRemoveFromCart(productId) {
        setCartItems(prevItems => {
            const updatedItems = {...prevItems};
            if (updatedItems[productId] && updatedItems[productId] > 0) {
                updatedItems[productId] -= 1;
            }
            return updatedItems;
        });
    }

    return (
        <div className='container'>
            <div className='products'>
                <div><h2>Products</h2></div>
                <div className='productList'>
                    <ul className="cart">
                        {products.map((product) => (
                            <li key={product.id}>
                                <span className='name'>{product.name}</span>
                                <span className='price'>{product.price}</span>
                                <button className='remove-button' onClick={() => handleRemoveFromCart(product.id)}>-</button>
                                <span className='quantity'>{cartItems[product.id] || 0}</span>
                                <button className='add-button' onClick={() => handleAddToCart(product.id)}>+</button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='checkout-cart'>
                <div>
                    <h2>Cart</h2>
                </div>
                <ul className='checkout-cart'>
                    {products.map((product) => (
                        cartItems[product.id] > 0 &&
                        <li key={product.id}>
                            <span className='cart-name'>{product.name}</span> <span className='cart-price'>{product.price * cartItems[product.id]}</span>
                        </li>
                    ))}
                    <li className='total'><span>Total</span><span>${total}</span></li>
                </ul>
                <button className='buy'>Buy</button>
            </div>
        </div>
    );
}

export default Cart;
