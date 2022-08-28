import React from 'react';


const image = ({  checkImage, ux }) => {
  return (
    <>
      <img
        data-test="checkImage"
        alt=""
        src={`data:image/png;base64,${
          checkImage
        }`}
        className={ux.image}
      />
    </>
  );
};
export default image;
    