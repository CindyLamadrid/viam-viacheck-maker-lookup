/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import MakerLookup from '../src/index';
import './locales/i18n';
import './styles/style.scss';

const clientUrl ="https://nusbci15xg.execute-api.us-east-1.amazonaws.com/dev"
const token="eyJraWQiOiI0WGFpRlA0VFBrZElQRXBRZDIrbXlYeDNXanJhY00wc3FsOXluaGxCZVE4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMmEyOGE5MC0wMTYwLTQyMWEtODA0MC0zNmFkMzk3MWRlZjgiLCJjb2duaXRvOmdyb3VwcyI6WyJWaWFUb3BVcCIsIkJpbGxQYXltZW50IiwiQW1hem9uQ2FzaCIsIlZpYUNoZWNrIiwiQWRtaW4iLCJNb25leVRyYW5zZmVyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZmaHFIcnN2TCIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJBMjE2MTYxIiwiYXVkIjoiNzBwZWM1dWZzN3YxbDQ3aTE0dTF0bmE5ZTEiLCJldmVudF9pZCI6IjNhYjE1YzM3LWFjZWItNGJiZi05OTM2LTdkMWU3ZjFiMzdiZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYxMzU1MjA5LCJwaG9uZV9udW1iZXIiOiIrMTk0MTk2Mjg2ODIiLCJjdXN0b206SWRCcmFuY2giOiJBMjE2MTYiLCJleHAiOjE2NjEzODQwMDksImlhdCI6MTY2MTM1NTIwOX0.IQTMWD-MTm2D6McW-XpxHBgqQZ-kwOCnH1r2A-mQABZzYwmnzXDpENui256Jb-_tgipgb1Hzsby8dUDCvcAY0G8mvhKoy7OUOrFM8yx4eBBmzyh-V4DkNUtg7Nc1DHwhaIWlWeKNkxhlj5RMnfta5dR-T6hZDibPvzkuXYbheKTsv68gXAAN6HJEtNYjPHjHgIiBm4BEN8P7PDZLcEYsxIAUttaSNq6Dfu09EsyYUpaKUnPDFFJwC7zJ5UqmU4jpTFrR3TP63NQUnMCIj1wTaGz0tW5RKc95m_9CpkCTa-ewlfUAUMltZwWPywdJmC4LN5SIyEDLP72JPQSX8us7XA"
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
