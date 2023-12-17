import React, { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import ProductForm from './Componentes/ProductForm/ProductForm';
import ProductList from './Componentes/ProductList/ProductList';
import './App.css';

const firebaseConfig = {
  apiKey: "AIzaSyCWdAP8i2dOYXwxwm9WW_Ib4IrDSlh40ds",
  authDomain: "lista-productos-1efe3.firebaseapp.com",
  databaseURL: "https://lista-productos-1efe3-default-rtdb.firebaseio.com",
  projectId: "lista-productos-1efe3",
  storageBucket: "lista-productos-1efe3.appspot.com",
  messagingSenderId: "767959092264",
  appId: "1:767959092264:web:4fe4595d49ed5f2ac5f91d"
};

firebase.initializeApp(firebaseConfig);

const App = () => {
  const [showProducts, setShowProducts] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  return (
    <div className="container">
      <ProductForm editingProduct={editingProduct} setEditingProduct={setEditingProduct} />
      <button className="show-hide-button" onClick={() => setShowProducts(!showProducts)}>{showProducts ? 'Ocultar' : 'Mostrar'}</button>
      {showProducts && <ProductList setEditingProduct={setEditingProduct} />}
    </div>
  );
};


export default App;