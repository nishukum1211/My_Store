import React, { useState, useEffect } from 'react';  // Import useState and useEffect from React
import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom


const WishList = () => {
    const [wishlist, setWishlist] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadWishlist(); // Load wishlist on mount
    }, []);

    const loadWishlist = async () => {
        try {
            const userId = JSON.parse(localStorage.getItem('user'))._id;
            console.log('Fetching wishlist for user:', userId);

            const result = await fetch(`http://localhost:8080/wishlist/${userId}`, {
                headers: {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
                },
            });

            const data = await result.json();
            console.log('Wishlist Data:', data);
            
            if (result.ok) {
                setWishlist(data);  // Update the state with the wishlist data
            } else {
                console.error('Error response:', data);
            }
        } catch (error) {
            console.error('Failed to load wishlist:', error);
        }
    };

    const removeFromWishlist = async (id) => {
        await fetch(`http://localhost:8080/wishlist/${id}`, {
            method: "DELETE",
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`,
            },
        });
        
        loadWishlist();  // Refresh the wishlist after removal
    };

    const handleBuy = (item) => {
        // Navigate to the payment page and pass the product data via state
        navigate('/checkout', { state: { item } });
    };

    return (
        <div className='wishlists'>
            <h1>My WishList</h1>
            {
                wishlist.length > 0 ? (
                    <ol>
                        {wishlist.map((item, index) => (
                            <li key={item._id}>
                                <h4>{item.name}</h4>
                                <h4>{item.price}</h4>
                                <h4>{item.category}</h4>
                                <button onClick={() => removeFromWishlist(item._id)}>Remove from Wishlist</button>
                                <button onClick={() => handleBuy(item)}>Buy Product</button>
                            </li>
                        ))}
                    </ol>
                ) : <h1>No Items in Wishlist</h1>
            }
        </div>
    );
};

export default WishList;
