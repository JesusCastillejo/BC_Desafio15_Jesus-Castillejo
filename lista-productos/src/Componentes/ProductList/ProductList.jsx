import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const ProductList = ({ setEditingProduct }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const productsRef = firebase.database().ref('products');
        productsRef.on('value', (snapshot) => {
            const products = snapshot.val();
            const newState = [];
            for (let product in products) {
                newState.push({
                    id: product,
                    name: products[product].name,
                    description: products[product].description,
                    price: products[product].price,
                });
            }
            setProducts(newState);
        });
    }, []);

    const deleteProduct = (productId) => {
        const productRef = firebase.database().ref(`/products/${productId}`);
        productRef.remove();
    };

    return (
        <ul className="product-list">
            {products.map((product) => (
                <li key={product.id}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>${product.price}</p>
                    <button onClick={() => deleteProduct(product.id)}>Eliminar</button>
                    <button onClick={() => setEditingProduct(product)}>Modificar</button>
                </li>
            ))}
        </ul>
    );
};

export default ProductList;