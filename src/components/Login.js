import React, {useEffect} from 'react';
import {useNavigate, Link} from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const navigate = useNavigate();

   

    const handleLogin = async() =>{
        console.log(email, password);
        let result = await fetch('http://localhost:8080/login', {
            method: 'post',
            body: JSON.stringify({ email, password}),
            headers: {
              'Content-Type': 'application/json'
            },
        });
        result = await result.json();
        console.log(result);
        if(result.token){
            localStorage.setItem("user", JSON.stringify(result.user));
            localStorage.setItem("token", JSON.stringify(result.token));
            navigate('/');

        }
        else{
            alert("please enter correct details");
        }
    }
  return (
    <div className='login'>
       <h1>Login</h1>
  
        <input className="inputBox_login" type="text" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email} />
        <input className="inputBox_login" type="password" placeholder="Enter password" onChange={(e)=>setPassword(e.target.value)} value={password} />
        <button onClick={handleLogin} className='btn_login'type="button">Login</button>

      
    </div>
  )
}

export default Login