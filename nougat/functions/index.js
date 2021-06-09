const functions = require("firebase-functions");
const admin = require("firebase-admin");
const { v4: uuidv4 } = require("uuid");
const crypto = require("crypto-js");
const axios = require("axios");
const cors = require("cors")({ origin: true });

require("dotenv").config();
admin.initializeApp();

function getConfigs(data) {
  const key = process.env.REACT_APP_LINE_SECRET_KEY;
  const nonce = uuidv4();
  const channelId = process.env.REACT_APP_LINE_CHANNEL_ID;
  const encrypt = crypto.HmacSHA256(
    key + "/v3/payments/request" + JSON.stringify(data) + nonce,
    key
  );
  const hmacBase64 = crypto.enc.Base64.stringify(encrypt);
  return {
    headers: {
      "Content-Type": "application/json",
      "X-LINE-ChannelId": channelId,
      "X-LINE-Authorization-Nonce": nonce,
      "X-LINE-Authorization": hmacBase64,
    },
  };
}

exports.addMessage = functions
  .region("asia-east2")
  .https.onRequest(async (req, res) => {
    cors(req, res, () => {
      axios
        .post(
          "https://sandbox-api-pay.line.me/v3/payments/request",
          req.body,
          getConfigs(req.body)
        )
        .then((response) => {
          res.json({ ...response.data });
        });
    });
  });
