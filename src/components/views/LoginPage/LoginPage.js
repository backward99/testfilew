// import { response } from 'express';
import React, { useState } from 'react';
import { loginUser } from '../../../_actions/user_action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../hoc/auth';

function LoginPage() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")


  const dispatch = useDispatch();
  
  let navigate = useNavigate();

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onSubmitLogin = (event) =>{
    event.preventDefault();

    let body = {
      email: Email,
      password: Password
    }

    dispatch(loginUser(body))
    .then(response => {
      if(response.payload.loginSuccess){
        window.localStorage.setItem('userId', response.payload.userId);
        navigate('/land');
        
      }else{
        alert('error');
      }
    });
  }
  
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitLogin}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <br/>
        <button>
          Login
        </button>
      </form>
    </div>
  )
}


// export default Auth(LoginPage, false)
export default LoginPage;