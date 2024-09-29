

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [wishlist, setWishlist] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getProducts();
        loadWishlist(); // Load wishlist from localStorage on component mount
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:8080/products");
        result = await result.json();
        setProducts(result);
    };

    const loadWishlist = () => {
        const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        setWishlist(savedWishlist);
    };

    const addToWishlist = async (product) => {
        const token = JSON.parse(localStorage.getItem('token'));
        localStorage.setItem('token', JSON.stringify(token));


        const userId = JSON.parse(localStorage.getItem('user'))._id;
        const { name, price, category, company } = product;
    
        let result = await fetch("http://localhost:8080/add-wishlist", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                "Content-Type": "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
    
        result = await result.json();
    
        if (result) {
            alert(`${name} has been added to wishlist`);
            // Reload Wishlist to show updated data
            loadWishlist();
        }
    };
    

    const deleteProduct = async (id) => {
        let result = await fetch(`http://localhost:8080/product/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    };

    const searchHandle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:8080/search/${key}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        } else {
            getProducts();
        }
    };

    return (
        <div className='product-list'>
            <h1>ProductList</h1>
            <input className="search-product" type="text" placeholder='Search Product' onChange={searchHandle} />
            <ul>
                <li>S. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Operation</li>
                <li>Wishlist</li>
            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id}>
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li>
                            <button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <button><Link to={"/update/" + item._id}>Update</Link></button>
                        </li>
                        <li>
                            <button onClick={() => addToWishlist(item)}>Add to Wishlist</button>
                        </li>
                    </ul>
                ) : <h1>No Result Found</h1>
            }
        </div>
    );
};

export default ProductList;


