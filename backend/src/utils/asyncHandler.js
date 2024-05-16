export const asyncHandler = callback => {
  return (req, res, errorCallBack) => {
    return Promise.resolve(callback(req, res, errorCallBack)).catch(errorCallBack);
  };
};
