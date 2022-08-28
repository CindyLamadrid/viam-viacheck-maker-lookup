import React from 'react';
import { useTranslation } from 'react-i18next';

function WrapperComponent({ children, nameLanguageJSON }) {
  const { t } = useTranslation(nameLanguageJSON);

  return React.cloneElement(children, { t });
}

export default WrapperComponent;
