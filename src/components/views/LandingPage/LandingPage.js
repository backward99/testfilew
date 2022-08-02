import React, { useEffect, useState } from 'react';
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config';
import MainImage from './Sections/MainImage';
import GridCards from '../commons/GridCards';
import { Avatar, Col, Row } from 'antd';
import { Descriptions } from 'antd';
import Item from 'antd/lib/list/Item';
import Auth from '../../../hoc/auth';
import Meta from 'antd/lib/card/Meta';
// import { json } from 'body-parser';
import axios from 'axios';
import moment from 'moment';  
// import {axiosInstance} from "../../Config";
function LandingPage() {
  // Auth(null);

  const [Json, setJson] = useState([]);


  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [PageNum, setPageNum] = useState(0);

  useEffect(() => {
    // const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

    const userVariables = {
      _id : localStorage.getItem('userId')
    }

    // axios.get('api/json/getJsons')
    // .then(response => {
    //   if(response.data.success){
    //     console.log(response.data);
    //     setJson(response.data.jsons)
    //   }else { 
    //     alert('json 가져오기를 실패했습니다.');
    //   }
    // })

    // axiosInstance.post('api/json/getUserJsons', userVariables)
    axios.post('api/json/getUserJsons', userVariables)
    .then(response => {
      if(response.data.success){
        console.log("response.data : ", response.data);
        console.log("userVariables : ", userVariables);
        console.log("userJson response.data : ", response.data)
        setJson(response.data.jsons)
      }else { 
        alert('json 가져오기를 실패했습니다.');
      }
    })
    // fetchFuc(endpoint);

  }, [])

  // const fetchFuc = (endpoint) => {
  //   fetch(endpoint)
  //     .then(response => response.json())
  //     .then(response => {
  //       setMovies([...Movies, ...response.results]);
  //       setMainMovieImage(response.results[0]);
  //       setPageNum(response.page)
  //     });
  // }

  // const pageAddBtn = () => {
  //   const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${PageNum + 1}`;

  //   fetchFuc(endpoint);
  // }
  // console.log(MainMovieImage.background_path)


  const renderCards = Json.map((json,index)=>{
    console.log('json:',json);
    return <Col key = {index} lg={6} md={8} xs={24}>
            <a href={`/json/post/${json._id}`} >
              <div style={{ position : 'relative'}}>
              </div>
            </a>
            <br/>
            <Meta
                // title={json.title}
                // description=""
            >
            </Meta>
            <div> 제목 : {json.title}</div>
            <div> 파일 이름 : {json.realName}</div>
            <div> 검사 결과 기록 : {json.description} </div>
            <div> 작성자 : {json.writer.name}</div>

            
            
            
            <div>날짜 :  {moment(json.createdAt).format("MMM Do YY")} </div>
          </Col>
  })
  return (
    <div>
      <div style={{ width: '85%', margin: '3rem auto' }}>
        {/* <Title level={2}> Recommended</Title> */}
        <hr />
        <Row gutter={ [32, 16]}>
          {renderCards}


        </Row>


      </div>


      <div style={{ width: '100%', margin: '0' }}>
        {/* {MainMovieImage && 
      <MainImage image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
      title={MainMovieImage.original_title}
      text={MainMovieImage.overview}
      />
    }
      <div style={{width: '85%', margin: '1rem auto'}}>
        <h2> 컴퓨터 소프트웨어 전공 </h2> 
        <hr/>
        <Row gutter={[16,16]}>
          {Movies && Movies.map((movie, index) => (
            <React.Fragment key={index}>
              <GridCards 
              landingPage
              image={movie.poster_path ?
              `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
              movieId={movie.id}
              movieName={movie.original_title}
              />
            </React.Fragment>           
          ))}
        </Row>
        </div>
      <div style={{ display: 'flex', justifyContent: 'center'}}>
        <button onClick={pageAddBtn}> 더 보기 </button>
        
      </div> */}
        <div>
          <Col lg={6} md={8} xs={24}>
            <div style={{ position: 'relative' }}>
              <a href='json/upload'>
                Json파일
              </a>
            </div>
          </Col>
        </div>
        {/* <div>
          {resultValue}
        </div> */}
      </div>
    </div>
  )
}


// export default Auth(LandingPage, null);
export default LandingPage;