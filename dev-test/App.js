/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import MakerLookup from '../src/index';
import './locales/i18n';
import './styles/style.scss';

const clientUrl ="https://nusbci15xg.execute-api.us-east-1.amazonaws.com/dev"
const token="eyJraWQiOiI0WGFpRlA0VFBrZElQRXBRZDIrbXlYeDNXanJhY00wc3FsOXluaGxCZVE4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxYzA5NjhiMi05ZmY4LTRkMzAtODQ4Ny1jNmYwOTM5NGNjNTYiLCJjb2duaXRvOmdyb3VwcyI6WyJWaWFUb3BVcCIsIkEwMDAwMiIsIkRldGFsbGVEZUJpbGxlcyIsIkJpbGxQYXltZW50IiwiQW1hem9uQ2FzaCIsIlZpYUNoZWNrIiwiR0VORVJBTCIsIlRyYW5zYWNjaW9uZXNEZU90cm9zQ2FqZXJvcyIsIkNvbWlzaW9uZXMiLCJIaXN0b3JpYWxEZVRyYW5zYWNjaW9uZXMiLCJSZXBvcnRzIiwiQWRtaW4iLCJJbXByZXNvcmFzIiwiRGV0YWxsZURlRW52aW9zIiwiRW52aW9zRGVPdHJvc0NhamVyb3MiLCJFc3RhZG9EZUN1ZW50YSIsIkNoZXF1ZXNEZU90cm9zQ2FqZXJvcyIsIk1vbmV5VHJhbnNmZXIiLCJWaWFUYXNhIiwiUmVwb3J0ZURlQ2hlcXVlcyJdLCJjb2duaXRvOnByZWZlcnJlZF9yb2xlIjoiYXJuOmF3czppYW06OjM4NzA5NTEwNjM5Mjpyb2xlXC9MYW1iZGEtQ29nbml0by1SZWFkV3JpdGVBY2Nlc3MtUm9sZSIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZmaHFIcnN2TCIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJjbGFtYWRyaWQiLCJjb2duaXRvOnJvbGVzIjpbImFybjphd3M6aWFtOjozODcwOTUxMDYzOTI6cm9sZVwvTGFtYmRhLUNvZ25pdG8tUmVhZFdyaXRlQWNjZXNzLVJvbGUiXSwiYXVkIjoiNzBwZWM1dWZzN3YxbDQ3aTE0dTF0bmE5ZTEiLCJldmVudF9pZCI6IjY5ZDhlY2RjLWQ3MGYtNGYwNy04NjBkLTY0OWIzZjcwYmI4YyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYyMTM4Nzg3LCJwaG9uZV9udW1iZXIiOiIrNTczMDIyODgxNTA2IiwiY3VzdG9tOklkQnJhbmNoIjoiQTAwNzY1LEEwMDAwMixBMDAxMjEsQTEwNTA5LEExOTI4OCIsImV4cCI6MTY2MjE2NzU4NywiaWF0IjoxNjYyMTM4Nzg3fQ.WQY7lbhAvtvG-OIwvA901onBvVQbPibYilvYAd8WvGl7kXS3TAUDzUq-xrDq3pWHVk6creadj23QusL-eq9WsaV52ih_YKdpX87zGHw0oXAF7Ud2l8G6ONLO-KinyfS7BMRJUUtPdLTLAmSor0UDjpDryL_if5jcZUnzSGUtliR6QqiIsmeU2IBbAPbog1cEvAk0AEnZQE3qC_MqH7ZqLcsG2t2uPFbbJAq3jcx6H-WcHFnbllrRh9s6L84lkb6NsiWKZF1kk7odaCEef7405963Is3YRsm6Go_rebx5mB5UV3fDB5Rv26jxADPCALOefaBH2G8a2S7P5YjUv4dT9g"
const axiosInstance= null;

const AppTest = () => {
   return(
     <>
     <MakerLookup
          bucket="viacheck.dev.viamericas.net"
          language=  "en"  
          clientUrl={clientUrl} 
          token={token}  
          onShowLoading={()=>{}}   
          viachecks={{enableRouteValidation:true}}
       />
     <br/>
    
     </>
   )
};

ReactDOM.render(
  <Suspense fallback={<div>Loading...</div>}>
    <AppTest    
    />
  </Suspense>,
  document.getElementById('app')
);
