/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
// import {axiosInstance} from "../../../Config";

function RightMenu() {
    let navigate = useNavigate();

    const user = useSelector(state => state.user);

    console.log("userData = ");
    console.log( useSelector(state => state));

    
    // console.log("userData.isAuth = ");
    // console.log(user.userData.isAuth);
        // 로그인이 안된 상태인데 로그인 된 상태라고 인지하고 로그아웃을 화면에 띄워줌
        //코드가 뭔가 잘못된듯
        //user.userData가 비어있음
        //이제 비어있지는 않은데 뭐가 잘못됐지
    const logoutHandler = () => {
        axios.get(`${USER_SERVER}/logout`).then(response => {
            // axiosInstance.get(`${USER_SERVER}/logout`).then(response => {
            if (response.status === 200) {
                navigate('/login');
            } else {
                alert('Log Out Failed')
            }
        });
    };

    if (user.userData && !user.userData.isAuth) {
        const items = [
        { label: <a href="/login">Signin</a>, key: 'mail' }, // remember to pass the key prop
        { label: <a href="/register">Signup</a>, key: 'app' }, // which is required
      ];
        return (
            <Menu items={items}/>
        )
    } else {
        const items = [
            { label: <a onClick={logoutHandler}>Logout</a>, key: 'logout' }
          ];
        return (
            <Menu items={items}/>
        )
    }
}

export default RightMenu;