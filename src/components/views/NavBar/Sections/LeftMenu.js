import React from 'react';
import { Menu } from 'antd';

function LeftMenu(props) {
    const items = [
        { label: <a href="/land">Home</a>, key: 'mail' }, // remember to pass the key prop
        // {
        //     label: "메뉴",
        //     key: "SubMenu",
        //     children: [
        //       {
        //         type: "group",
        //         label: "앱",
        //         children: [
        //           {
        //             label: "Option 1",
        //             key: "setting:1"
        //           },
        //           {
        //             label: "Option 2",
        //             key: "setting:2"
        //           }
        //         ]
        //       },
        //       {
        //         type: "group",
        //         label: "데스크탑",
        //         children: [
        //           {
        //             label: "sql 인젝션",
        //             key: "setting:3"
        //           },
        //           {
        //             label: <a href="https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%A9%B0-%EB%B0%B0%EC%9A%B0%EB%8A%94-%EB%85%B8%EB%93%9C-%EB%A6%AC%EC%95%A1%ED%8A%B8-%EC%98%81%ED%99%94%EC%82%AC%EC%9D%B4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0/lecture/36370?tab=community" target='_blank'>인프런 강의 듣기</a>,
        //             key: "setting:4"
        //           }
        //         ]
        //       }
        //     ]
        //   },
    ]
  return (
  <Menu items={items}/>
  )
}

export default LeftMenu