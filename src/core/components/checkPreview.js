import React from 'react';
import { Format } from '@viamericas/viam-utils';

const checkPreview = ({ check, configFields, t, ux }) => {

  return (
    <>
     <hr  />    <div className={`${ux.row} ${ux.subcontainerResult}`}>

      {/* <div className={isReturnedReason() ? ux.col4 : ux.col6}> */}
      <div className={ ux.col4 }>
        {/* {configFields.historical.deposited ? (
          <>
            <div className={ux.label}>{t('viacheckRisk.checksDeposited')}</div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 0 && check[0].deposited
                ? check[0].deposited
                : 0}
            </div>
          </>
        ) : (
          ''
        )} */}
        {configFields.historical.checkAverage ? (
          <>
            <div data-test="checksAverage" className={ux.label}>{t('viacheckRisk.checksAverage')}</div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check &&
              check.length > 0 &&
              check[0].amountDeposited &&
              check[0].deposited &&
              check[0].deposited !== 0
                ? `$${Format.Num.toAmount(
                    check[0].amountDeposited / check[0].deposited,
                    2
                  )}`
                : '$0.00'}{' '}
            </div>
          </>
        ) : (
          ''
        )}
        {/* {configFields.historical.firstCheck ? (
          <>
            <div className={ux.label}>{t('viacheckRisk.firstCheck')}</div>
            <div
              className={`${ux.inputReadOnly} ${ux.textLeft} ${
                !check || !check.length || !check[0].firstCheck
                  ? ux.paddingTop25
                  : ''
              }`}
            >
              {check && check.length > 0 && check[0].firstCheck
                ? check[0].firstCheck
                : ''}
            </div>
          </>
        ) : (
          ''
        )} */}
        {/* {configFields.historical.lastCheck ? (
          <>
            <div className={ux.label}>{t('viacheckRisk.lastCheck')}</div>
            <div
              className={`${ux.inputReadOnly} ${ux.textLeft} ${
                !check || !check.length || !check[0].lastCheck
                  ? ux.paddingTop25
                  : ''
              }`}
            >
              {check && check.length > 0 && check[0].lastCheck
                ? check[0].lastCheck
                : ''}
            </div>
          </>
        ) : (
          ''
        )} */}
      </div>
      {/* <div className={isReturnedReason() ? ux.col4 : ux.col6}> */}
      <div data-test="checkReturned" className={ ux.col4}>
        {configFields.historical.returned ? (
          <>
            <div className={`${ux.label} ${ux.textOrangeColor}`}>
              {t('viacheckRisk.checkReturned')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 1 && check[1].countedReturned
                ? check[1].countedReturned
                : 0}
            </div>
          </>
        ) : (
          ''
        )}
       

        {/* {check &&
        check.length > 1 &&
        check[1].lastReturned &&
        configFields.historical.lastReturned ? (
          <div className={`${ux.label} ${ux.textOrangeColor}`}>
            {t('viacheckRisk.lastReturned')}
          </div>
        ) : (
          ''
        )}
        {check &&
        check.length > 1 &&
        check[1].lastReturned &&
        configFields.historical.lastReturned ? (
          <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
            {check[1].lastReturned}
          </div>
        ) : (
          ''
        )} */}
        {/* {configFields.historical.percentageReturned ? (
          <>
            <div className={`${ux.label} ${ux.textOrangeColor}`}>
              {t('viacheckRisk.percentageReturned')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 1 && check[1].percentageReturned
                ? `${Format.Num.toAmount(check[1].percentageReturned, 2)}%`
                : '0.00%'}
            </div>
          </>
        ) : (
          ''
        )} */}
      </div>
      <div data-test="averageReturned" className={ux.col4}>
     
          <>
            <div className={`${ux.label} ${ux.textOrangeColor}`}>
              {t('viacheckRisk.averageReturned')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check &&
              check.length > 1 &&
              check[1].amountReturned &&
              check[1].countedReturned &&
              check[1].countedReturned !== 0
                ? `$${Format.Num.toAmount(
                    check[1].amountReturned / check[1].countedReturned,
                    2
                  )}`
                : '$0.00'}
            </div>
          </>
        
      </div>
      {/* {isReturnedReason() ? (
        <div className={ux.col4}>
          {' '}
          <div className={`${ux.label} ${ux.textOrangeColor}`}>
            {' '}
            {t('viacheckRisk.lastReturnedReason')}{' '}
          </div>
          <div className={`${ux.inputReadOnly} ${ux.textLeft} ${ux.textRed}`}>
            {check && check.length > 1 && check[1].detailReason ? (
              <b>{check[1].detailReason}</b>
            ) : (
              ''
            )}{' '}
          </div>
        </div>
      ) : (
        ''
      )} */}
    
    </div>
    </>
  );
};

export default checkPreview;
