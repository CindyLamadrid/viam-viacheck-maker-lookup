import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import findByTestAttrib from '../utils/test/find-attrib';

import MakerLookup from '../src/core/main';
import CheckPreview from '../src/core/components/checkPreview'
import Image from  '../src/core/components/image'

configure({ adapter: new Adapter() });

const  ux={
  row: 'row maker-lookup__no-margin',
  containerResult:'maker-lookup__container-result',
  col4: 'col-4 maker-lookup__no-margin',  
  col6:'col-6',
  containerSearch:'col-12 maker-lookup__text-right',
  noMargin:'maker-lookup__no-margin',
  search:'btn btn-primary',
  label: 'maker-lookup__text-blue  maker-lookup__label',
  inputReadOnly: 'maker-lookup__input-read-only',
  textLeft: 'maker-lookup__text-left',
  paddingTop25: 'maker-lookup__padding-top-25',
  textOrangeColor: 'maker-lookup__text-orange',
  textRed: 'maker-lookup__text-red maker-lookup__alert',
  input: 'maker-lookup__input',
  image:'maker-lookup__image',
  imageExample:'maker-lookup__image-example',
  containerImage:'row maker-lookup__no-margin maker-lookup__container-image',
  subcontainerResult:'maker-lookup__sub-container-result',

  
}

let j = 0;
const onHandler = () => {
  j = 1;
};
const clientUrl ="https://nusbci15xg.execute-api.us-east-1.amazonaws.com/dev"
const token="eyJraWQiOiI0WGFpRlA0VFBrZElQRXBRZDIrbXlYeDNXanJhY00wc3FsOXluaGxCZVE4PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJlMmEyOGE5MC0wMTYwLTQyMWEtODA0MC0zNmFkMzk3MWRlZjgiLCJjb2duaXRvOmdyb3VwcyI6WyJWaWFUb3BVcCIsIkJpbGxQYXltZW50IiwiQW1hem9uQ2FzaCIsIlZpYUNoZWNrIiwiQWRtaW4iLCJNb25leVRyYW5zZmVyIl0sImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTEuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0xXzZmaHFIcnN2TCIsInBob25lX251bWJlcl92ZXJpZmllZCI6ZmFsc2UsImNvZ25pdG86dXNlcm5hbWUiOiJBMjE2MTYxIiwiYXVkIjoiNzBwZWM1dWZzN3YxbDQ3aTE0dTF0bmE5ZTEiLCJldmVudF9pZCI6IjNhYjE1YzM3LWFjZWItNGJiZi05OTM2LTdkMWU3ZjFiMzdiZiIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNjYxMzU1MjA5LCJwaG9uZV9udW1iZXIiOiIrMTk0MTk2Mjg2ODIiLCJjdXN0b206SWRCcmFuY2giOiJBMjE2MTYiLCJleHAiOjE2NjEzODQwMDksImlhdCI6MTY2MTM1NTIwOX0.IQTMWD-MTm2D6McW-XpxHBgqQZ-kwOCnH1r2A-mQABZzYwmnzXDpENui256Jb-_tgipgb1Hzsby8dUDCvcAY0G8mvhKoy7OUOrFM8yx4eBBmzyh-V4DkNUtg7Nc1DHwhaIWlWeKNkxhlj5RMnfta5dR-T6hZDibPvzkuXYbheKTsv68gXAAN6HJEtNYjPHjHgIiBm4BEN8P7PDZLcEYsxIAUttaSNq6Dfu09EsyYUpaKUnPDFFJwC7zJ5UqmU4jpTFrR3TP63NQUnMCIj1wTaGz0tW5RKc95m_9CpkCTa-ewlfUAUMltZwWPywdJmC4LN5SIyEDLP72JPQSX8us7XA"

const setup = () => {
  return shallow(
    <MakerLookup
    ux={ux}
    bucket="viacheck.dev.viamericas.net"
    language=  "en"  
    clientUrl={clientUrl} 
    token={token}  
    onShowLoading={onHandler} 
    t={()=>{return "label"}} 
    />
  );
};

const setupCheckPreview = () => {
  return shallow(
    <CheckPreview
     check={
      [{
        amountDeposited:1200,
        deposited:3,
       

      },
      {
      
        countedReturned:1,
        amountReturned:300

      }
    ]}
      configFields={{
        pie: false,
        checkImage: true,
        payees: false,
        historical: {
          deposited: false,
          checkAverage: true,
          firstCheck: false,
          lastCheck: false,
          returned: true,
          averageReturned: false,
          lastReturned: false,
          percentageReturned: true,
          returnedReason: false
        }
      }}
     ux={ux}
    t={()=>{return "label"}} 
    />
  );
};

const setupImage = () => {
  return shallow(
    <Image
    checkImage = "test" ux ={ux}
    />
  );
};

describe('<Rist /> component', () => {
  test('Container did mount', () => {
    const wrapper = setup();
    const component = findByTestAttrib(wrapper, 'maker-lookup');
    expect(component.length).toBe(1);
  });

  test('Container checksAverage', () => {
    const wrapper = setupCheckPreview();
    const component = findByTestAttrib(wrapper, 'checksAverage');
    expect(component.length).toBe(1);
  });

  test('Render Preview CheckReturned', () => {
    const wrapper = setupCheckPreview();
    const component = findByTestAttrib(wrapper, 'checkReturned');
    expect(component.length).toBe(1);
  });

  test('Render Preview', () => {
    const wrapper = setupCheckPreview();
    const component = findByTestAttrib(wrapper, 'averageReturned');
    expect(component.length).toBe(1);
  });

  test('Render Image', () => {
    const wrapper = setupImage();
    const component = findByTestAttrib(wrapper, 'checkImage');
    expect(component.length).toBe(1);
  });  
});

 