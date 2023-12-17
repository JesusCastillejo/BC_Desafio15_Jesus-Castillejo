import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';


const ProductForm = ({ editingProduct, setEditingProduct }) => {
    const [product, setProduct] = useState({ name: '', description: '', price: '' });

    useEffect(() => {
        if (editingProduct) {
            setProduct(editingProduct);
        }
    }, [editingProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const nameRegex = /^[A-Za-z0-9 .]*$/;
        const descriptionRegex = /^[A-Za-z0-9 .,¿?¡!]*$/;
        const priceRegex = /^[0-9]*$/;

        if (!nameRegex.test(product.name)) {
            alert('El nombre solo puede contener letras (mayúsculas y minúsculas), números y puntos.');
            return;
        }

        if (!descriptionRegex.test(product.description)) {
            alert('La descripción solo puede contener letras (mayúsculas y minúsculas), números, puntos, comas, signos de interrogación y signos de exclamación.');
            return;
        }

        if (!priceRegex.test(product.price)) {
            alert('El precio solo puede contener números.');
            return;
        }


        if (editingProduct) {
            const productRef = firebase.database().ref(`/products/${editingProduct.id}`);
            productRef.update(product);
            setEditingProduct(null);
        } else {
            firebase.database().ref('products').push(product);
        }

        setProduct({ name: '', description: '', price: '' });
    };

    return (
        <form onSubmit={handleSubmit} className="product-form">
            <div>
                <input type="text" placeholder="Nombre" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
                <input type="text" placeholder="Descripción" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })} />
                <input type="number" placeholder="Precio" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} />
            </div>
            <div>
                <button type="submit">{editingProduct ? 'Actualizar' : 'Crear'}</button>
            </div>
        </form>
    );
};

export default ProductForm;