const findByTestAttrib = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

export default findByTestAttrib;
