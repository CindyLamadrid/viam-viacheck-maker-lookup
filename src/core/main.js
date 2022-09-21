/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Suspense,  useState } from 'react';
import { Services ,Validation} from '@viamericas/viam-utils';
import PopPup from '@viamericas/viam-alert-messages';
import ReactTooltip from 'react-tooltip';
import Image from './components/image';



import CheckPreview from './components/checkPreview';
import useEventListener from './utils/useEventListener';

const RiskScan = props => {
  const {onShowRiskAnalysis,onShowLoading, bucket, ux, t, language,icons,axiosInstance, clientUrl,viachecks, token } = props;

  const [account, setAccount] = useState('');
  const [routing, setRouting] = useState('');
  const [historyInformation, setHistoryInformation] = useState({});
  const [checkImage, setCheckImage] = useState({});
  const [popPup, setPopPup] = useState({});

  const [alertInformation, setAlertInformation] = useState({
    show: true,
    message: ''
  });
const [isValidRouting,setValidRouting]=useState(false);

  const onchangeAccount = e => {
    const { value } = e.target;
    setAccount(value);
  };

  const onchangeRouting = e => {
    const { value } = e.target;
    setRouting(value);
    setValidRouting( Validation.Routing.isValid(
      value,
      viachecks.enableRouteValidation
    ));
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
    onShowRiskAnalysis();

  };

  const setNumericFormat = event => {
    const keycode = event.which;
    if (!(event.shiftKey === false && keycode >= 48 && keycode <= 57)) {
      event.preventDefault();
    }
  };

  
const getMessageBodyRequirements = () => {
  return (
    <div
      data-test="check-body-requirements"
      className={`${ux.textLeft} ${ux.requirementContainer}`}
    >
      <div>
        {t('viacheckRisk.importantGuide')
          .split('<span>')
          .map(function setMessageGverify(item) {
            return (
              <span key={item}>
                {item.indexOf('<b>') !== -1 ? (
                  <b>{item.replace('<b>', '').replace('</b>', '')}</b>
                ) : (
                  item
                )}
              </span>
            );
          })}
      </div>

      {t('viacheckRisk.stepsGuide')
        .split('<div>')
        .map(function setMessage(item) {
          return (
            <div key={item}>
              <i className={ux.checkIcon} />
              {item}
            </div>
          );
        })}

      <div className={`${ux.textOrangeColor} ${ux.mgTop5}`}>
        {t('viacheckRisk.notesLabel')}
      </div>
      <div>{t('viacheckRisk.notes')}</div>
      <div>{t('viacheckRisk.instructionVerify')}</div>
      <div>
        <img className={ux.checkFields} alt="" src="./assets/checkFields.png" />
      </div>
      <div>
        <b>{t('viacheckRisk.help')}</b>
      </div>
    </div>
  );
};

const onClosePopPup = () => {
  setPopPup({
    show: false
  });
};

  const onHandlerRequirements = () => {
    setPopPup({
      id: 'requirements-guide',
      body: getMessageBodyRequirements(ux, t),
      firstLabel: '',
      secondLabel: '',
      type: '',
      header: '',
      firsClassName: '',
      secondClassName: '',
      title: t('viacheckRisk.requirementGuide'),
      width: 'risk__modal-width',
      maxHeight: ux.popPupRequirement,
      show: true
    });
  };



  const onKeyMakerLookup=(event)=>{  
    if (event.key === 'Enter') {
      if(account!=="" && isValidRouting && routing!=="" && account.length>3 && account.length<18) 
      {
        onSearch();
      }
      if (event.target.type === 'text') {
        event.target.blur();
      }
    }
     
  }
  useEventListener('keydown', onKeyMakerLookup);
  return (
    <Suspense fallback={<div>Loading...</div>}>
       {popPup && popPup.show ? (
        <div className="risk-modal risk-modal-confirm-information">
          {' '}
          <PopPup
            title={popPup.title}
            body={popPup.body}
            firstLabel={popPup.firstLabel}
            secondLabel={popPup.secondLabel}
            header={popPup.header}
            onCloseAlert={onClosePopPup}
            onFirstButton={onClosePopPup}
            onSecondButton={onClosePopPup}
            firsClassName={popPup.firsClassName}
            secondClassName={popPup.secondClassName}
            width={popPup.width}
            maxHeight={popPup.maxHeight}
            thirdLabel={popPup.thirdLabel}
            thirdClassName={popPup.thirdClassName}
          />
        </div>
      ) : null}
      <div onKeyUp={(event)=>onKeyMakerLookup(event)}>     
      <div data-test="maker-lookup" className={ux.row}>
        <div className={ux.col6}>
          <label className={ux.label} htmlFor="account" aria-label="account">
            {t('maker.account')}
            <input
              id="account"
              type="text"
              data-testid="account"  
              autoComplete="off"
              maxLength="17"
              size="17"
              value={account}
              className={`${ux.input} ${ account.length>0 && account.length<4 ? ux.borderInvalid:''}`}
              onChange={e => onchangeAccount(e)}
              onKeyPress={(event) => setNumericFormat(event)}
              placeholder = {t('maker.accountLength')}
            />
          </label>
          <div className={ux.invalidMessage}>
            {account.length>0 && account.length < 4 
            ? t("checkProcessing.invalidAccount"):''}
          </div>
        </div>
        <div className={ux.col6}>
          <label className={ux.label} htmlFor="account">
            {t('maker.routing')}
            <input
              id="routing"
              maxLength="9"
              size="13"
              data-testid="routing"
              autoComplete="off"
              type="text"
              className={`${ux.input} ${ !isValidRouting &&routing ? ux.borderInvalid:''}`}
              value={routing}
              onChange={e => onchangeRouting(e)}
              onKeyPress={(event) => setNumericFormat(event)}
              placeholder = {t('maker.routingLength')}
            />
          </label>
          <div className={ux.invalidMessage}>
            { !isValidRouting && routing
            ? t("checkProcessing.invalidRouting"):''}
          </div>
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
            disabled={!account || !isValidRouting || !routing || account.length<4}
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
        <div className={`${ux.textRed} ${ux.alert} ${ux.riskContainerAlert} `}>
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
          <button
                      type="button"
                      className={ux.iconQuestionMark}
                      data-tip={t('viacheckRisk.helpCheck')}
                      onClick={() => onHandlerRequirements()}
                    >
                      <ReactTooltip className={ux.textHelpCheck} />
                      <img
                        data-tip={t('viacheckRisk.helpCheck')}
                        className={` ${ux.width40}`}
                        alt=""
                        src={icons.lighthelp}
                      />
                    </button>
        </div>
       
      ) : (
        ''
      )}
         </div>
    </Suspense>
  );
};

export default RiskScan;
