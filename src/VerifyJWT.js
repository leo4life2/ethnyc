const jwt = require("jsonwebtoken");

const jwksClient = require("jwks-rsa");

const client = jwksClient({
  jwksUri: "https://developer.worldcoin.org/api/v1/jwks",
});

const url = new URL(window.location.href);
url.searchParams.get("verification_jwt");

const getKey = (header, callback) => {
  client.getSigningKey(header.kid, function (err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;

    callback(null, signingKey);
  });
};
const options = "hello";

jwt.verify(url, getKey, options, function (err, decoded) {
  if (decoded.verified) {
    // user is a unique human, do your action here
    // you can use decoded.nullifier_hash to get the anonymous ID for this user
  }
});
