import React from 'react';
import MainT from './core/main';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const MakerLookup = props => {
  const {
    onShowLoading,
    axiosInstance,
    bucket,
    t2,   
    ux,
    language,
    clientUrl,
    viachecks,
    token
  } = props;

  const t = t2 || useTranslation('translation').t;

  return (
    <MainT
    onShowLoading={onShowLoading}
    axiosInstance={axiosInstance}
    bucket={bucket}
    ux={ux}
    t={t}
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
    containerSearch:'col-12 maker-lookup__text-right',
    noMargin:'maker-lookup__no-margin',
    search:'btn btn-primary',
    //label:"maker-lookup__label",
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
    invalidMessage:'maker-lookup__invalid-message',
    borderInvalid:'maker-lookup__border-invalid'
    
  }
};

export default MakerLookup;
