import React from 'react';
import { Format } from '@viamericas/viam-utils';

const checkPreview = ({ check, configFields, t, ux }) => {

  return (
    <>
      <hr />    <div className={`${ux.row} ${ux.subcontainerResult}`}>


        <div className={ux.col4}>

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

        </div>

        <div data-test="checkReturned" className={ux.col4}>
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

      </div>
    </>
  );
};

export default checkPreview;
