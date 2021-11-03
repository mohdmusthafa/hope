const jsonwebtoken = require("jsonwebtoken");
var jwkToPem = require("jwk-to-pem");
const { promisify } = require("util");
const jwk = require("../config/jwks.json");

const cognitoIssuer =
  "https://cognito-idp.ap-south-1.amazonaws.com/ap-south-1_7klGtD061";

const getPublicKeys = async () => {
  const keys = jwk.keys.reduce((agg, current) => {
    const pem = jwkToPem(current);
    agg[current.kid] = { instance: current, pem };
    return agg;
  }, {});

  return keys;
};

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken));

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];
  const tokenSections = (token || "").split(".");
  if (tokenSections.length < 2) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const headerJSON = Buffer.from(tokenSections[0], "base64").toString("utf-8");
  const header = JSON.parse(headerJSON);
  const keys = await getPublicKeys();
  const key = keys[header.kid];

  if (key === undefined) {
    return res.status(401).json({ message: "claim made for unknown kid" });
  }

  try {
    claim = await verifyPromised(token, key.pem);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
  const currentSeconds = Math.floor(new Date().valueOf() / 1000);

  if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
    return res.status(401).json({ message: "Token expired" });
  }

  if (claim.iss !== cognitoIssuer) {
    return res.status(401).json({ message: "Claim issuer is invalid" });
  }

  if (claim.token_use === "id" && claim["custom:role"] === "admin") {
    req.admin = claim["custom:role"];
    (req.username = claim["cognito:username"])
    next();
    return;
  }

  if (claim.token_use !== "access") {
    return res.status(401).json({ message: "Claim use is not access" });
  }

  req.username = claim.username;
  next();
};
