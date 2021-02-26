import axios from "axios";

const randomId = (max = 40) => String(Math.ceil(Math.random() * max));

const key = "AIzaSyC6iyTSdcvcWAcnIoew44OI__gdWlwIJNs";
const url = `https://recommendationengine.googleapis.com/v1beta1/projects/xsd-recommendation-ai/locations/global/catalogs/default_catalog/eventStores/default_event_store/userEvents:write?key=${key}`;

const sendRequest = (idx: number) => {
  const visitorId = randomId();
  const userId = randomId();
  const productId = randomId();

  const data = {
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
    eventTime: "2021-01-27T11:11:40.143685881Z",
  };

  axios({
    method: "post",
    url,
    data,
  })
    .then(
      (response) => {
        console.log(`imported user event ${idx}`);
        console.log("status:", response.status);
        console.log(JSON.stringify(response.data, null, 2));
      },
      (e) => {
        console.log("importing failed with data:", data);
        console.log(e);
      }
    )
    .finally(() => {
      console.log("import complete.");
    });
};

console.log("starting import script");

for (let i = 0; i < 5001; i++) {
  sendRequest(i);
}
