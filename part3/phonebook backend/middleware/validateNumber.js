const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^(0\d{1,2}-\d{7,8})$/;
  return phoneRegex.test(phoneNumber);
};

module.exports = (req, res, next) => {
  const { number } = req.body;
  if (!validatePhoneNumber(number)) {
    return res.status(400).json({ error: 'wrong format number.' });
  }
  next(); 
};
