// import axios from "axios";
import React, {useEffect} from "react";
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {auth} from '../_actions/user_action';


// export default function _auth(option, adminRoute = null) {

//     const navigate = useNavigate()
  
//     const dispatch = useDispatch()
  
//     dispatch(auth()).then((response) => {
  
//       console.log(response)
  
  
  
//       //로그인 하지  않은 상태
  
//       if (!response.payload.isAuth) {
  
//         if (option) {
  
//           navigate("/")
  
//         }
  
//       } else {
  
//         //로그인 한 상태
  
//         if (adminRoute && !response.payload.isAdmin) {
  
//           navigate("/")
  
//         } else {
  
//           if (option === false) {
  
//             navigate("/")
  
//           }
  
//         }
  
//       }
  
//     })
  
//   }
  
export default function (SpecificComponent, option, adminRoute = null){
   function AuthenticationCheck(props){
        const dispatch = useDispatch();
        
        const navigate = useNavigate();
    
        useEffect(() => {
            
            dispatch(auth()).then(response =>{
                console.log("response : ", response)

                if(!response.payload.isAuth){
                  if(option){
                    navigate("/")
                  }
                } else {
                    if (adminRoute && !response.payload.isAdmin) {
                      navigate("/")
                    } else {
                      if (option === false) {
                        navigate("/")
                      }
                    }
                }
            })
        }, [dispatch, navigate])

        return (<SpecificComponent/>)
        
   } 

  //  return AuthenticationCheck;
  //  return (<AuthenticationCheck/>)
   return <AuthenticationCheck/>
}