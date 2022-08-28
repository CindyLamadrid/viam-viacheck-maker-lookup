import React, { Suspense, useState } from 'react';
import { Services } from '@viamericas/viam-utils';
import Image from './components/image';

import CheckPreview from './components/checkPreview';

const RiskScan = props => {
  const {onShowLoading, bucket, ux, t, language, axiosInstance, clientUrl, token } = props;

  const [account, setAccount] = useState();
  const [routing, setRouting] = useState();
  const [historyInformation, setHistoryInformation] = useState({});
  const [checkImage, setCheckImage] = useState({});
  const [alertInformation, setAlertInformation] = useState({
    show: true,
    message: ''
  });

  const onchangeAccount = e => {
    const { value } = e.target;
    setAccount(value);
  };

  const onchangeRouting = e => {
    const { value } = e.target;
    setRouting(value);
  };

  const getMessageCheckAlert = message => {
    return message.split('<span>').map(function setMessageGverify(item) {
      return (
        <span key={item}>
          {item.indexOf('<b>') !== -1 ? (
            <b>{item.replace('<b>', '').replace('</b>', '')}</b>
          ) : (
            item
          )}
        </span>
      );
    });
  };

  const getAlertInformation = type => {
    switch (type) {
      case 'DAY':
        setAlertInformation({
          show: true,
          message: getMessageCheckAlert(t('viacheckRisk.alertDay'))
        });
        break;
      case 'MONTH':
        setAlertInformation({
          show: true,
          message: getMessageCheckAlert(t('viacheckRisk.alertMonth'))
        });
        break;
      case 'CLOSED':
        setAlertInformation({
          show: true,
          message: getMessageCheckAlert(t('viacheckRisk.alertClosed'))
        });
        break;
      case 'ALTER':
        setAlertInformation({
          show: true,
          message: getMessageCheckAlert(t('viacheckRisk.alter'))
        });
        break;
      case 'NOIMAGE':
        setAlertInformation({
          show: true,
          message: getMessageCheckAlert(t('viacheckRisk.alertDay'))
        });
        break;
      default:
        setAlertInformation({ show: false, message: '' });
        break;
    }
  };

  const getCheckImage = async key => {
    try {
 
      const response = await Services.Rest.instance({
        url: `${clientUrl}/image/getbase64`,
        data: {
          front: '',
          back: '',
          key,
          bucket
        },
        token,
        method: 'POST',
        axiosInstance
      });

      if (response && response.data && response.data.front) {
        setCheckImage(response.data.front);
      }else
      {
        setCheckImage('');
      }
    } catch (e) {
      console.log('Error getting image getCheckImage', e);
    }

    return '';
  };

  const getCheckInformation = async () => {
    try {
      onShowLoading(true)
      const response = await Services.Rest.instance({
        url: `${clientUrl}/risk/get-information`,
        params: {
          account,
          routing
        },
        token,
        method: 'GET',
        axiosInstance
      });

      if (
        response &&
        response.data &&
        response.data.checkInformation &&
        response.data.checkInformation.length > 0
      ) {
        const checkInformation = [];
        if (response.data.checkInformation[0].length > 0)
          checkInformation.push(response.data.checkInformation[0][0]);
        if (
          response.data.checkInformation.length > 1 &&
          response.data.checkInformation[1].length > 0
        )
          checkInformation.push(response.data.checkInformation[1][0]);
        setHistoryInformation(checkInformation);
        getAlertInformation(response.data.checkInformation[0][0].alertType);
        return response.data;
      }
    } catch (e) {
      console.log('Error:', e);
    } finally {
      onShowLoading(false);
    }
    return [];
  };

  const onSearch = async () => {
    const response = await getCheckInformation();

    if (
      response &&
      response.checkInformation &&
      response.checkInformation.length > 0 &&
      response.checkInformation[0].length > 0 &&
      response.checkInformation[0][0].refImageKey
    )
    {  await getCheckImage(response.checkInformation[0][0].refImageKey)
    }else{
      setCheckImage('');
    }

  };

  const setNumericFormat = event => {
    const keycode = event.which;
    if (!(event.shiftKey === false && keycode >= 48 && keycode <= 57)) {
      event.preventDefault();
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div data-test="maker-lookup" className={ux.row}>
        <div className={ux.col6}>
          <label className={ux.label} htmlFor="account" aria-label="account">
            {t('maker.account')}
            <input
              id="account"
              type="text"
              data-testid="account"
              value={account}
              className={ux.input}
              onChange={e => onchangeAccount(e)}
              onKeyPress={(event) => setNumericFormat(event)}
            />
          </label>
        </div>
        <div className={ux.col6}>
          <label className={ux.label} htmlFor="account">
            {t('maker.routing')}
            <input
              id="routing"
              data-testid="routing"
              type="text"
              className={ux.input}
              value={routing}
              onChange={e => onchangeRouting(e)}
              onKeyPress={(event) => setNumericFormat(event)}
            />
          </label>
        </div>
      </div>
      <div className={ux.row}>
        <div className={ux.containerSearch}>
          <input
            type="button"
            id="search"
            data-testid="search"
            value={t('maker.search')}
            className={ux.search}
            onClick={() => onSearch()}
          />
        </div>
      </div>     
    
      <div>     
       
      
        {historyInformation && JSON.stringify(historyInformation) !== '{}' ? (
          <div  data-testid="preview" className={ux.containerResult}>
            {' '}
            <CheckPreview
              t={t}
              ux={ux}
              check={historyInformation}
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
            />
          </div>
        ) : (
          <div className={ux.containerImage}>
            <img
             data-testid="image"
              alt=""
              className={ux.imageExample}
              src={
                language === 'en'
                  ? 'assets/images/checkEn.png'
                  : 'assets/images/checkEs.png'
              }
            />
          </div>
        )}
      </div>
      {alertInformation && alertInformation.show ? (
        <div className={`${ux.textRed} ${ux.riskContainerAlert} `}>
          {alertInformation.message}
        </div>
      ) : (
        ''
      )}
      <br />
      {checkImage && JSON.stringify(checkImage) !== '{}' ? (
        <div className={ux.containerImage}>
          {' '}
          <Image checkImage={checkImage} ux={ux} />
        </div>
      ) : (
        ''
      )}
    </Suspense>
  );
};

export default RiskScan;
