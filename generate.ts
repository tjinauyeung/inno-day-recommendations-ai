import axios from "axios";

const sendRequest = () => {
    axios({
        method: "post",
        url: "https://recommendationengine.googleapis.com/v1beta1/projects/xsd-recommendation-ai/locations/global/catalogs/default_catalog/eventStores/default_event_store/userEvents:write?key=AIzaSyC6iyTSdcvcWAcnIoew44OI__gdWlwIJNs",
        data: {
            'eventType': 'detail-page-view',
            'userInfo': {
                'visitorId': '19',
                'userId': '12',
                'ipAddress': '0.0.0.0',
                'userAgent': 'Mozilla/5.0 (Windows NT 6.1)'
            },
            'eventDetail': {
                'recommendationToken': '12',
            },
            'productEventDetail': {
                'productDetails': [{
                    'id': '10',
                    'originalPrice': 140.00,
                    'displayPrice': 130.00,
                    'currencyCode':'USD'
                }]
            }
        }
    }).then((response) => {
        console.log(response.status);
        console.log(response.data);
    }, (e) => {
        console.log(e);
    });
}

for (let i = 0; i < 101; i++) {
    sendRequest()
}
