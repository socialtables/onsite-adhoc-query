"use strict";
const {reduce} = require("lodash");

module.exports = function(data) {
	return reduce(data.aggregations.by_property.buckets, (acc, val, idx, collection) => {
		/*accumulate the average metrics*/
		if (val) {
			acc.average_browsing_session += val.by_browsing_session.data.value;
			acc.average_bookable_room_starred += val.by_bookable_room_starred.data.value;
			acc.average_bookable_room_clicked += val.by_bookable_room_clicked.data.value;
			acc.average_bookable_room_unstarred += val.by_bookable_room_unstarred.data.value;
			acc.average_rfp_session += val.by_rfp_session.data.value;
			acc.average_rfp_browsing += val.by_rfp_browsing.data.value;
			acc.average_floor_clicked += val.by_floor_clicked.data.value;
			acc.average_room_setup += val.by_room_setup.data.value;
			acc.average_event_type += val.by_event_type.data.value;
		}
		/*after accumulating the terms find the averages*/
		if (collection.length - 1 === idx) {
			acc.average_browsing_session /= collection.length;
			acc.average_bookable_room_starred /= collection.length;
			acc.average_bookable_room_clicked /= collection.length;
			acc.average_bookable_room_unstarred /= collection.length;
			acc.average_rfp_session /= collection.length;
			acc.average_rfp_browsing /= collection.length;
			acc.average_floor_clicked /= collection.length;
			acc.average_room_setup /= collection.length;
			acc.average_event_type /= collection.length;
		}
		return acc;
	}, {
			/*init the accumulator obj, only the averages will change*/
			total_search: data.aggregations.search_total.data.value,
			total_room_clicked: data.aggregations.room_total.clicked.data.value,
			total_room_starred: data.aggregations.room_total.starred.data.value,
			total_rfp: data.aggregations.rfp_total.data.value,
			property_count: data.aggregations.property_count.data.value,
			average_browsing_session: 0,
			average_bookable_room_clicked: 0,
			average_bookable_room_starred: 0,
			average_bookable_room_unstarred: 0,
			average_rfp_session: 0,
			average_rfp_browsing: 0,
			average_floor_clicked: 0,
			average_room_setup:	0,
			average_event_type: 0
		});
	}
