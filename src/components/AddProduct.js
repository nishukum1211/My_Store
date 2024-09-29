import React from 'react';

import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const [error, setError] = React.useState('');

    const navigate = useNavigate();
    const addProduct = async() =>{

        console.log(!name);
        if(!name || !price || !category || !company){
            setError(true);
            return false;
        }


        console.log(name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log("user for reference:", userId);
        let result = await  fetch("http://localhost:8080/add-product", {
            method : "post",
            body: JSON.stringify({name, price, category, company, userId}),
            headers: {
                "Content-Type": "application/json",
                 authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json();
        if (result) {
            // Redirect to ProductList page after successful addition
            navigate('/');
          }
    }


   return (
    <div className='product'>
    <div className='add-product'>
        <h1>AddProduct</h1>
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
        {error && !name && <span className='valid-name'>Please, Enter valid name</span>}
        <input className="inputBoxProduct" type="Number" placeholder='Enter Product Price' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        {error && !price && <span className='valid-name'>Please, Enter valid price</span>}
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
        {error && !category && <span className='valid-name'>Please, Enter valid category</span>}
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Company' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        {error && !company && <span className='valid-name'>Please, Enter valid company</span>}
        <button onClick={addProduct} type="button" className='productButton'>Add Product</button>



    </div>
    </div>
  )
}

export default AddProduct;