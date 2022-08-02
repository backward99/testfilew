import { Button, Form, Input, Descriptions } from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import Title from 'antd/lib/skeleton/Title';
import Auth from '../../../hoc/auth';
import axios from "axios";
// import { axiosInstance } from '../../Config';
import React, { useEffect, useState } from 'react'
// import Dropzone from 'react-dropzone';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// const {TextArea} = Input;
// const {Title} = Typography;

function JSONUploadPage() {

    
    const user = useSelector(state => state.user);

    const [JsonTitle, setJsonTitle] = useState("");
    const [UDescriptions, setUDescriptions] = useState("");
    const [FilePath, setFilePath] = useState("");
    const [RealName, setRealName] = useState("");
    const [PreView, setPreView] = useState("");
    const [CJson, setCJson] = useState("");
    const [ResultValue, setResultValue] = useState("");


    // if (CJson.data != null) {
    //     const resultKeys = Object.keys(CJson.data.attributes.last_analysis_results).map(x => x);
    //     // const TestArray = TestJson.map()
    //     const resultValue = Object.values(CJson.data.attributes.last_analysis_results).map((entrie, idx) => {
    //         // console.log(Object.keys(entrie), entrie, "idx", idx);
    //         return (
    //             <div key={idx}>
    //                 <Descriptions title={resultKeys[idx]} bordered>
    //                     <Descriptions.Item label="category">{entrie.category}</Descriptions.Item>
    //                     <Descriptions.Item label="result">{entrie.result}</Descriptions.Item>
    //                     <Descriptions.Item label="method">{entrie.method}</Descriptions.Item>
    //                     <Descriptions.Item label="engine_name">{entrie.engine_name}</Descriptions.Item>
    //                 </Descriptions>
    //             </div>
    //         )
    //     });
    //     setResultValue(resultValue);
    // }

    useEffect(() => {
        console.log("CJson : ", CJson);
        if (CJson.data != null) {

            const resultKeys = Object.keys(CJson.data.attributes.last_analysis_results).map(x => x);
            // const TestArray = TestJson.map()
            setResultValue(Object.values(CJson.data.attributes.last_analysis_results).map((entrie, idx) => {
                // console.log(Object.keys(entrie), entrie, "idx", idx);
                return (
                    <div key={idx}>
                        <Descriptions title={resultKeys[idx]} bordered>
                            <Descriptions.Item label="category">{entrie.category}</Descriptions.Item>
                            <Descriptions.Item label="result">{entrie.result}</Descriptions.Item>
                            <Descriptions.Item label="method">{entrie.method}</Descriptions.Item>
                            <Descriptions.Item label="engine_name">{entrie.engine_name}</Descriptions.Item>
                        </Descriptions>
                    </div>
                )
            }));

            // console.log("resultValue : ", resultValue);
        };
    }, [PreView])

    

    const onTitleChange = (e) => {
        setJsonTitle(e.currentTarget.value);
    }


    const onDescriptioinChange = (e) => {
        setUDescriptions(e.currentTarget.value);
    }


    const onFileUpload = (e) => {
        
        let file = e.target.files[0];
        let fileReader = new FileReader();
        fileReader.onload = () => {
        //   console.log(fileReader.result);
            //   const obj = fileReader.result;
          const obj = JSON.parse(fileReader.result);
          setCJson(obj);
        
        //   console.log('fileReader : ', fileReader);
        };
        fileReader.readAsText(file);


        
        // console.log('fileReader.result : ', fileReader.result);
        

        // console.log('fileReader : ', fileReader);

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", e.target.files[0]);
        console.log('formData : ', formData);


        // axiosInstance.post('/api/json/uploadfiles', formData, config)
        axios.post('/api/json/uploadfiles', formData, config)
            .then(response => {
                if (response.data.uploadSuccess) {

                    let variable = {
                        jsonText: "",
                        realName : response.data.realName
                    }
                    // console.log('response.data:', response.data);
                    setRealName(response.data.realName);
                    // console.log('CJson : ', CJson);
                    setPreView(fileReader.result);
                    // console.log('PreView : ', PreView);
                } else {
                    alert('파일업로드 실패');
                }
            })
        // console.log('e : ', e);
        // console.log('e[0] : ', e[0]);
        // console.log('e.target.files[0] : ', e.target.files[0]);

      }

    // const resultKeys = Object.keys(CJson.data.attributes.last_analysis_results).map(x => x);
    // // const TestArray = TestJson.map()
    // const resultValue = Object.values(CJson.data.attributes.last_analysis_results).map((entrie, idx) => {
    //     // console.log(Object.keys(entrie), entrie, "idx", idx);
    //     return (
    //         <div key={idx}>
    //             <Descriptions title={resultKeys[idx]} bordered>
    //                 <Descriptions.Item label="category">{entrie.category}</Descriptions.Item>
    //                 <Descriptions.Item label="result">{entrie.result}</Descriptions.Item>
    //                 <Descriptions.Item label="method">{entrie.method}</Descriptions.Item>
    //                 <Descriptions.Item label="engine_name">{entrie.engine_name}</Descriptions.Item>
    //             </Descriptions>
    //         </div>
    //     )



    // });

    // const onDrop = (files) => {

    //     let formData = new FormData();
    //     const config = {
    //         header: { 'content-type': 'multipart/form-data' }
    //     }
    //     formData.append("file", files[0]);
    //     console.log('formData : ', formData);
    //     axios.post('/api/json/uploadfiles', formData, config)
    //         .then(response => {
    //             if (response.data.uploadSuccess) {

    //                 let variable = {
    //                     jsonText: "",
    //                     realName : response.data.realName
    //                 }
    //                 console.log('response.data:', response.data);
    //                 setRealName(response.data.realName);
    //                 // setPreView(response.data);
    //             } else {
    //                 alert('파일업로드 실패');
    //             }
    //         })
        

    // }


    let navigate = useNavigate();
    const onSubmit = (e) => {
        e.preventDefault();
        
        const variables = {
            writer: user.userData._id,
            title: JsonTitle,
            description: UDescriptions,
            filePath: FilePath,
            realName : RealName
        }

        // axiosInstance.post('/api/json/uploadJson', variables)
        axios.post('/api/json/uploadJson', variables)
            .then(response => {
                if (response.data.uploadJsonSuccess) {
                    
                  
                    console.log('uploadJson :', response.data);
                    navigate('/land');
                } else {
                    alert('데이터베이스에 파일 업로드 실패');
                }
            })
    }
    return (
        <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem auto' }}>
                <Title level={2}> Upload Json</Title>
            </div>

            <Form onSubmit={onSubmit}>
                {/* <div style={{ display: 'flex', justifyContent: 'space_between' }}>
                    <Dropzone
                        onDrop={onDrop}
                        multiple={false}
                        maxSize={10000000}
                        // onFileChange={onChange}
                    >
                        {({ getRootProps, getInputProps }) => (
                            <div style={{
                                width: '300px', height: '240px', border: '1px solid lightgray', display: 'flex',
                                alignItems: 'cenetr', justifyContent: 'center'
                            }} {...getRootProps()}>
                                <input {...getInputProps()} />

                            </div>
                        )}
                    </Dropzone>
                </div> */}
                <br />
                {/* <div>{PreView}</div> */}
                {/* <div>{resultValue}</div> */}
                <div>{ResultValue}</div>
                
                
                {/* <div>{resultValue && resultValue}</div> */}
                
                <br />
                <input type='file' onChange={(e) => {onFileUpload(e)}} />
                <label>Title</label>
                <Input
                    onChange={onTitleChange}
                    value={JsonTitle}>

                </Input>
                <br />
                <br />
                <label>Descriptions</label>
                <TextArea
                    onChange={onDescriptioinChange}
                    value={UDescriptions}
                >

                </TextArea>
                <br />

                <br />
                <Button type="primary" size='large' onClick={onSubmit}>
                    submit
                </Button>
            </Form>
        </div>
    )
}


// export default Auth(JSONUploadPage, true)
export default JSONUploadPage;