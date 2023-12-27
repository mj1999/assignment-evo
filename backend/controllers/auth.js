const admin = require("../model/user");
// basic authorisation with hardcoded values, for just a basic functionality handling
module.exports.authorise = function (req, res) {
  if (
    req.body.username == admin.username &&
    req.body.password == admin.password
  ) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
};
