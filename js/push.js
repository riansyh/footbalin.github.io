var webPush = require("web-push");

const vapidKeys = {
  publicKey:
    "BI8u4TKourVxqZwWOcxQX3aMN26qMoW0cNMmN_k9MdrwjShPMEcULK8cir0mnb4nJ0_g5P6pooQlSpB61utUmJo",
  privateKey: "0AlYVuSFseHkKtjlp1eRR1509zKT-xouL5KziNHJsDU",
};

webPush.setVapidDetails(
  "mailto:example@yourdomain.org",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

var pushSubscription = {
  endpoint:
    "https://fcm.googleapis.com/fcm/send/erTd1WFYR0k:APA91bH8hiYm4SKJHfNYFWD8cPDnC9lpLCYAN1MKK-9kMP2CuSf4v3016-KxQvwlrngMzFIzbqi_im63fDNyeAKIrimvXEJsg7twthLpDgd4ZpLYUA4HYa0mCkp96Tw2miIQGQLamgXy",
  keys: {
    p256dh:
      "BKQgGgiMM2cxHbjG1TjTsdnez6uEX0LY4LwsRqNWBmgNWNA2vBju438P9ZGgzqVuGKlLwlmnPd+l3SwHJwT6KK8=",
    auth: "mJTtQt0CMYAN08CEE2AF0w==",
  },
};
var payload = "Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!";

var options = {
  gcmAPIKey: "127837596225",
  TTL: 60,
};
webPush.sendNotification(pushSubscription, payload, options);
