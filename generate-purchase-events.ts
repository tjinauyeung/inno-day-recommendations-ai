import axios from "axios";
import { ProductDetail } from "./src/types";

const randomId = (max = 40) => String(Math.ceil(Math.random() * max));
const randomQuantity = (max = 5) => Math.ceil(Math.random() * max);
const randomDay = (max = 30) =>
  Math.ceil(Math.random() * max).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
const randomMonth = (max = 12) =>
  Math.ceil(Math.random() * max).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
  });
const randomRevenue = (max = 100) => Math.ceil(Math.random() * max);

const getProductDetails = () => {
  let productDetails: ProductDetail[];
  productDetails = [];
  for (let i = 0; i < Math.ceil(Math.random() * 5); i++) {
    const pid = randomId();
    productDetails.push({
      id: pid,
      quantity: randomQuantity(),
    });
  }

  return productDetails;
};

const sendRequest = (idx: number) => {
  console.log("starting import");

  const visitorId = randomId();
  const userId = randomId();

  axios({
    method: "post",
    url:
      "https://recommendationengine.googleapis.com/v1beta1/projects/xsd-recommendation-ai/locations/global/catalogs/default_catalog/eventStores/default_event_store/userEvents:write?key=AIzaSyC6iyTSdcvcWAcnIoew44OI__gdWlwIJNs",
    data: {
      eventType: "purchase-complete",
      userInfo: {
        visitorId,
        userId,
      },
      productEventDetail: {
        productDetails: getProductDetails(),
        purchaseTransaction: {
          revenue: randomRevenue(),
          currencyCode: "EUR",
        },
      },
      eventTime: `2020-${randomMonth()}-${randomDay()}T11:11:40.143685881Z`,
    },
  })
    .then(
      (response) => {
        console.log(`imported user event ${idx}`);
        console.log("status:", response.status);
        console.log(JSON.stringify(response.data, null, 2));
      },
      (e) => {
        console.log("importing failed. reason:");
        console.log(e.message);
      }
    )
    .finally(() => {
      console.log("import complete.");
    });
};
for (let i = 0; i < 5001; i++) {
  sendRequest(i);
}
