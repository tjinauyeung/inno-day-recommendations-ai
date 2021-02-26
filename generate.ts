import axios from "axios";

const randomId = (max = 40) => String(Math.ceil(Math.random() * max));

const sendRequest = (idx: number) => {
  console.log("starting import");

  const visitorId = randomId();
  const userId = randomId();
  const productId = randomId();
  axios({
    method: "post",
    url:
      "https://recommendationengine.googleapis.com/v1beta1/projects/xsd-recommendation-ai/locations/global/catalogs/default_catalog/eventStores/default_event_store/userEvents:write?key=AIzaSyC6iyTSdcvcWAcnIoew44OI__gdWlwIJNs",
    data: {
      eventType: "detail-page-view",
      userInfo: {
        visitorId: visitorId,
        userId: userId,
        ipAddress: "0.0.0.0",
        userAgent: "Mozilla/5.0 (Windows NT 6.1)",
      },
      eventDetail: {
        recommendationToken: "12",
      },
      productEventDetail: {
        productDetails: [
          {
            id: productId,
          },
        ],
      },
      eventTime: "2021-01-26T11:11:40.143685881Z",
    },
  })
    .then(
      (response) => {
        console.log(`imported user event ${idx}`);
        console.log('status:', response.status);
        console.log(JSON.stringify(response.data, null, 2));
      },
      (e) => {
        console.log("importing failed. reason:");
        console.log(e);
      }
    )
    .finally(() => {
      console.log("import complete.");
    });
};

for (let i = 0; i < 5001; i++) {
  sendRequest(i);
}
