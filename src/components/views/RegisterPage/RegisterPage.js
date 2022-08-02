import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
// import Auth from '../../../hoc/auth';

function RegisterPage() {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [PasswordOk, setPasswordOk] = useState("")
  const [Name, setName] = useState("")

  const dispatch = useDispatch();
  
  let navigate = useNavigate();

  const onEmailHandler = (event) =>{
    setEmail(event.currentTarget.value)
  }

  const onPasswordHandler = (event) =>{
    setPassword(event.currentTarget.value)
  }

  const onNameHandler = (event) =>{
    setName(event.currentTarget.value)
  } 
  
  const onPasswordOkHandler = (event) =>{
    setPasswordOk(event.currentTarget.value)
  }

  const onSubmitHandler = (event) =>{
    event.preventDefault();

    if(Password !== PasswordOk){
      return alert("비밀번호를 다시 확인해 주세요");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name
    }

    dispatch(registerUser(body))
    .then(response => {
      if(response.payload.success){
        navigate('/login')
      }else{
        alert('error 회원가입 실패');
      }
    });
  }

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: '100vh'
    }}>
      <form style={{display:'flex', flexDirection: 'column'}}
      onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler}/>
        
        <label>name</label>
        <input type="text" value={Name} onChange={onNameHandler}/>

        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler}/>

        <label>PasswordOk</label>
        <input type="password" value={PasswordOk} onChange={onPasswordOkHandler}/>

        <br/>
        <button>
          Register
        </button>
      </form>
    </div>
  )
}


// export default Auth(RegisterPage, false);
export default RegisterPage;