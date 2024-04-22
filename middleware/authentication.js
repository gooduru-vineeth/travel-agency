const config = require("../config");

exports.checkAuthentication = (req, res, next) => {
  const appId = req.headers["appId"];
  const appSecret = req.headers["appSecret"];
  if (!appId || !appSecret) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  if (appId === config.auth.appId && appSecret === config.auth.appSecret) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
