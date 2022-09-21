import React from 'react';
import MainT from './core/main';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const MakerLookup = props => {
  const {
    onShowRiskAnalysis,
    onShowLoading,
    axiosInstance,
    bucket,
    t2,   
    ux,
    language,
    clientUrl,
    viachecks,
    icons,
    token
  } = props;

  const t = t2 || useTranslation('translation').t;

  return (
    <MainT
    onShowRiskAnalysis={onShowRiskAnalysis}
    onShowLoading={onShowLoading}
    axiosInstance={axiosInstance}
    bucket={bucket}
    ux={ux}
    t={t}
    icons={icons}
    language={language}
    clientUrl={clientUrl}
    token={token}
    viachecks={viachecks}
    />
  );
};

MakerLookup.propTypes = {
  token: PropTypes.string.isRequired,
  axiosInstance: PropTypes.func,
  t2: PropTypes.func,
  
};

MakerLookup.defaultProps = {
  ux: {
    row: 'row maker-lookup__no-margin',
    containerResult:'maker-lookup__container-result',
    col4: 'col-4 maker-lookup__no-margin',  
    col6:'col-6',
    col2: 'col-2 maker-lookup__no-margin',
    containerSearch:'col-12 maker-lookup__text-right',
    noMargin:'maker-lookup__no-margin',
    search:'btn btn-primary',
    //label:"maker-lookup__label",
    label: 'maker-lookup__text-blue  maker-lookup__label',
    inputReadOnly: 'maker-lookup__input-read-only',
    textLeft: 'maker-lookup__text-left',
    paddingTop25: 'maker-lookup__padding-top-25',
    textOrangeColor: 'maker-lookup__text-orange',
    textRed: 'maker-lookup__text-red ',
    alert:'maker-lookup__alert',
    input: 'maker-lookup__input',
    image:'maker-lookup__image',
    imageExample:'maker-lookup__image-example',
    containerImage:'maker-lookup__no-margin maker-lookup__container-image',
    subcontainerResult:'maker-lookup__sub-container-result',
    invalidMessage:'maker-lookup__invalid-message',
    borderInvalid:'maker-lookup__border-invalid',  
    headerResult:'maker-lookup__header-result',  
    empty:'maker-lookup__empty' ,
    width40: 'maker-lookup__width-40', 
    textHelpCheck: 'maker-lookup__text-helpCheckSize',
    iconQuestionMark: 'maker-lookup__question-mark',
    requirementContainer: 'maker-lookup__requirement-container',
    checkIcon: 'fas fa-check maker-lookup__check-icon',
    mgTop5: 'maker-lookup__mg-top-5',
    checkFields: 'maker-lookup__check-fields',
  }
};

export default MakerLookup;
