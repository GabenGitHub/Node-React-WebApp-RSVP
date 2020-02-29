exports.checkPlusOne = (requestObject) => {
    if (requestObject.participate === 'no' || requestObject.plusOne === false) {
        requestObject.plusOne = false;
        requestObject.plusOneName = '';
    }
    return requestObject;
};