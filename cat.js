/*

[rewrite_local]
^https?:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-response-body https://latenci9.github.io/cat.js
//^https?:\/\/api\.(revenuecat|rc-backup)\.com\/v1\/(subscribers\/[^\/]+$|receipts$) url script-request-header https://latenci9.github.io/cat.js

[MITM]
hostname = api.revenuecat.com, api.rc-backup.com

*/
const guding = {};
const guding6 = JSON.parse(typeof $response != "undefined" && $response.body || null);
if (typeof $response == "undefined") {
  delete $request.headers["x-revenuecat-etag"];
  delete $request.headers["X-RevenueCat-ETag"];
  guding.headers = $request.headers;
} else if (guding6 && guding6.subscriber) {
  guding6.subscriber.subscriptions = guding6.subscriber.subscriptions || {};
  guding6.subscriber.entitlements = guding6.subscriber.entitlements || {};
  var headers = {};
  for (var key in $request.headers) {
  const reg = /^[a-z]+$/;
  if (key === "User-Agent" && !reg.test(key)) {
    var lowerkey = key.toLowerCase();
    $request.headers[lowerkey] = $request.headers[key];
    delete $request.headers[key];
    }
  }

  const it = { name: 'premium', id: 'app.percento.premium.9.monthly'}

  const data = {
    "expires_date": "2027-02-25T23:13:09Z",
    "original_purchase_date": "2025-02-25T23:13:09Z",
    "purchase_date": "2025-02-25T23:13:09Z",
    "ownership_type": "PURCHASED",
    "store": "app_store"
  };
  
  const { name, id } = it
  
  guding6.subscriber.subscriptions = {};
  guding6.subscriber.subscriptions[id] = data;
  guding6.subscriber.entitlements[name] = JSON.parse(JSON.stringify(data));
  guding6.subscriber.entitlements[name].product_identifier = id;

  guding.body = JSON.stringify(guding6);
}
$done(guding);