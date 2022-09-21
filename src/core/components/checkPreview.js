import React from 'react';
import { Format } from '@viamericas/viam-utils';

const checkPreview = ({ check, t, ux }) => {
  return (
    <>
      <hr />{' '}
      <div className={`${ux.row} ${ux.subcontainerResult} ${ux.headerResult}`}>
        <div className={ux.col4}>
          <>
            <div data-test="checksAverage" className={ux.label}>
              {t('viacheckRisk.checksDeposited')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 0 && check[0].deposited
                ? check[0].deposited
                : 0}{' '}
            </div>
          </>
        </div>

        <div data-test="averageCheck" className={ux.col4}>
          <>
            <div className={ux.label}>{t('viacheckRisk.checksAverage')}</div>
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
                : '$0.00'}
            </div>
          </>
        </div>
        <div data-test="firstCheck" className={ux.col4}>
          <>
            <div className={ux.label}>{t('viacheckRisk.firstCheck')}</div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 0 && check[0].firstCheck
                ? check[0].firstCheck
                : <div className={ux.empty}/>}
            </div>
          </>
        </div>

    
      </div>
      <div className={`${ux.row} ${ux.subcontainerResult} `}>
      
      <div data-test="checkReturned" className={ux.col2}>
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
        </div>
        <div data-test="averageReturned" className={ux.col2}>
          <>
            <div className={`${ux.label} ${ux.textOrangeColor}`}>
              {t('viacheckRisk.percentageReturned')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 1 && check[1].percentageReturned
                ? `${Format.Num.toAmount(check[1].percentageReturned, 0)}%`
                : '0%'}
            </div>
          </>
        </div>

        <div data-test="lastReturnedReason" className={ux.col4}>
          <>
            <div className={`${ux.label} ${ux.textOrangeColor}`}>
              {t('viacheckRisk.lastReturnedReason')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft} ${ux.textRed}`}>
            {check && check.length > 1 && check[1].detailReason ? (
             check[1].detailReason
            ) : (
              <div className={ux.empty}/>
            )}
            </div>
          </>
        </div>
        <div data-test="lastReturned" className={ux.col4}>
          <>
            <div className={`${ux.label} ${ux.textOrangeColor}`}>
              {t('viacheckRisk.lastReturned')}
            </div>
            <div className={`${ux.inputReadOnly} ${ux.textLeft}`}>
              {check && check.length > 1 && check[1].lastReturned ? (
               
                  check[1].lastReturned
              
              ) : (
                <div className={ux.empty}/>
              )}
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default checkPreview;
