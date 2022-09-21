/* eslint-disable no-unused-vars */
import React, { Suspense, useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';

import MakerLookup from '../src/index';
import './locales/i18n';
import './styles/style.scss';

const clientUrl ="https://nusbci15xg.execute-api.us-east-1.amazonaws.com/dev"
const token="eyJraWQiOiI0WGFpRlA0VFBrZElQRXBRZDIrbXlYeDNXanJhY00wc3FsOXluaGxCZVE4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIxYzA5NjhiMi05ZmY4LTRkMzAtODQ4Ny1jNmYwOTM5NGNjNTYiLCJjb2duaXRvOmdyb3VwcyI6WyJWaWFUb3BVcCIsIkEwMDAwMiIsIkRldGFsbGVEZUJpbGxlcyIsIkFkbWluVXN1YXJpb3MiLCJCaWxsUGF5bWVudCIsIkFtYXpvbkNhc2giLCJWaWFDaGVjayIsIkdFTkVSQUwiLCJUcmFuc2FjY2lvbmVzRGVPdHJvc0NhamVyb3MiLCJDb21pc2lvbmVzIiwiSGlzdG9yaWFsRGVUcmFuc2FjY2lvbmVzIiwiUmVwb3J0cyIsIkFkbWluIiwiSW1wcmVzb3JhcyIsIkRldGFsbGVEZUVudmlvcyIsIkVudmlvc0RlT3Ryb3NDYWplcm9zIiwiRXN0YWRvRGVDdWVudGEiLCJDaGVxdWVzRGVPdHJvc0NhamVyb3MiLCJNb25leVRyYW5zZmVyIiwiVmlhVGFzYSIsIlJlcG9ydGVEZUNoZXF1ZXMiXSwiY29nbml0bzpwcmVmZXJyZWRfcm9sZSI6ImFybjphd3M6aWFtOjozODcwOTUxMDYzOTI6cm9sZVwvTGFtYmRhLUNvZ25pdG8tUmVhZFdyaXRlQWNjZXNzLVJvbGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV82ZmhxSHJzdkwiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJjb2duaXRvOnVzZXJuYW1lIjoiY2xhbWFkcmlkIiwiY29nbml0bzpyb2xlcyI6WyJhcm46YXdzOmlhbTo6Mzg3MDk1MTA2MzkyOnJvbGVcL0xhbWJkYS1Db2duaXRvLVJlYWRXcml0ZUFjY2Vzcy1Sb2xlIl0sImF1ZCI6IjcwcGVjNXVmczd2MWw0N2kxNHUxdG5hOWUxIiwiZXZlbnRfaWQiOiIxYmE0NjBjZS1hODMwLTRmNzEtYjhkYS0xYzZmZmU3MTBlYWQiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY2MzY3ODc4NywicGhvbmVfbnVtYmVyIjoiKzU3MzAyMjg4MTUwNiIsImN1c3RvbTpJZEJyYW5jaCI6IkEwMDc2NSxBMDAwMDIsQTAwMTIxLEExMDUwOSxBMTkyODgiLCJleHAiOjE2NjM3MDc1ODcsImlhdCI6MTY2MzY3ODc4N30.C9HfHFtyNdr30f75U9mc-PVkgVtF-Jh2PkHgqRG78zfiHPRiW0pin10v7mmffwkTy4dILcndARiADa1byVaqDdCfXdz1ohs6TsWZ6CKd3T5ATsNXozWS6qBFEYNEvrdhBEBrltdNSTyYrpTdX6p2fI0vRmJ_sCbdNVc-91zTe0G0KOtE2pnQoC6ThAMGn8QXpk8oaq_RUhrg-whHyA3v2EQDcpjrFKW8JLO8Mb0TTp91QU1HNMIemt8ko9P2cGfmgYZ_Poc4o_vTFbZgBglH_EdLQRnUA3tgFjUVsNyozG5YNNWR9v9KeOU871SPUDYLd2vEcgs5PaQ2DKMWOgr0MQ"
const axiosInstance= null;
const lighthelp = require('./icons/Lighthelp.png');

const onShowRiskAnalysis=()=>{
  
}

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
          icons={{ lighthelp }}
          onShowRiskAnalysis={onShowRiskAnalysis}
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
