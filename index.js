const fs = require("fs");
const request = require("request-promise");
const json2csv = require("json2csv");
const query = require("./es-query")().body;
const postSearchProcessing = require("./post-search-processing");

function createCsv() {
	request.get({
		uri: "http://search-metrics-ketczgq25o5avi6lulgspcflqu.us-east-1.es.amazonaws.com:80/metrics_production/onsite-realtime/_search?",
		body: JSON.stringify(query)
	})
	.then((data) => JSON.parse(data))
	.then((data) => postSearchProcessing(data))
	.then((data) => {
		/*write the data as csv to a file in exports*/
		return fs.writeFile("./exports/onsite-overall-metrics.csv",
			json2csv({data, fields: Object.keys(data)}),
			(err) => {
				if(err) {
				 console.error(err);
				} else {
				 console.log("saved csv in ./exports/onsite-overall-metrics.csv");
				}
			});
		}
	)
	.catch((e) => console.error(e));
}

createCsv();
