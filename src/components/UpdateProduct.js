import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [company, setCompany] = React.useState('');
    const params = useParams();
    const navigate = useNavigate();
    
    useEffect(()=>{
        
        getProductDetails();

    },[])

    const getProductDetails = async()=>{
        console.log(params);
        let result = await fetch(`http://localhost:8080/product/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);


    }
    const UpdateProduct = async() =>{
        let result = await fetch(`http://localhost:8080/product/${params.id}`, {
            method: 'Put',
            body: JSON.stringify({name, price, category, company}),
            headers:{
                'Content-Type': 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log(result);
        navigate('/')

    }

        


       


   return (
    <div className='U-product'>
    <div className='update-product'>
        <h1>Update Product</h1>
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
        
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Price' value={price} onChange={(e)=>{setPrice(e.target.value)}}/>
        
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Category' value={category} onChange={(e)=>{setCategory(e.target.value)}} />
        
        <input className="inputBoxProduct" type="text" placeholder='Enter Product Company' value={company} onChange={(e)=>{setCompany(e.target.value)}}/>
        
        <button onClick={UpdateProduct} type="button" className='productButton'>Update Product</button>



    </div>
    </div>
  )
}

export default UpdateProduct;