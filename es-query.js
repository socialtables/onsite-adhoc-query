"use strict";

module.exports = function (opts) {
	return {
		body: {
			size: 0,
			aggs: {
			by_property: {
				terms: {
					field: "propertyId",
					size: 100
				},
				aggs: {
					by_browsing_session:{
						filter: {
							bool: {
								should: [{term: {action: "clicked"}},{term: {action: "starred"}}]
							}
						},
						aggs: {data:{cardinality: {field: "sessionId"}}}
					},
					by_rfp_session: {
						filter: {
							bool: {
								must: [{term: {entity: "rfi"}},{term: {action: "submitted"}}]
							}	
						},
						aggs: {
							data: {cardinality: {field: "sessionId"}}}
					},
					by_rfp_browsing: {
						filter: {
							bool: {
								must: [{term: {entity: "rfi"}},{term: {action: "submitted"}}]
							}	
						},
						aggs: {data: {value_count: {field: "entity"}}}
					},
					by_bookable_room_clicked: {
						filter: {
							bool: {
								must: [{term: {entity: "bookable_room"}},{term:{"action": "clicked"}}]
							}
						},
						aggs:{
							data: {value_count: {field: "entity"}}
						}
					},
					by_bookable_room_starred: {
						filter: {
							bool: {
								must: [{term:{entity: "bookable_room"}},{term:{action: "starred"}}]
							}
						},
						aggs:{data: {value_count:{field: "entity"}}}
					},
					by_bookable_room_unstarred:{
						filter: {
							bool: {
								must: [{term:{entity: "bookable_room"}},{term:{action: "unstarred"}}]
							}
						},
						aggs:{data: {value_count:{field: "entity"}}}
					},
					by_floor_clicked:{
						filter: {
							bool: {
								must: [{term:{entity: "floor"}},{term:{action: "clicked"}}]
							}
						},
						aggs:{data: {value_count:{field: "entity"}}}
					},
					by_event_type:{
						filter: {
							bool: {
								must: [{term:{entity: "eventType"}}]
							}
						},
						aggs:{data: {value_count:{field: "entity"}}}},
					by_room_setup:{
						filter: {
							bool: {
								must: [{term:{entity: "roomSetup"}}]
							}
						},
						aggs:{data: {value_count:{field: "entity"}}}
					}
				}
			},
			search_total: {
				filter: {
					bool:{
						must:{term:{entity: "search"}}
					}
				},
				aggs: {data:{value_count:{field: "entity"}}}},
			property_count: {
				filter: {
					bool:{
						must:[{exists:{field: "propertyId"}}]
					}
				},
				aggs: {data:{cardinality:{field: "propertyId"}}}
			},
			rfp_total: {
				filter: {
					bool:{
						must:[{term:{entity: "rfi"}},{term: {action: "submitted"}}]
					}
				},
				aggs: {data:{value_count:{field: "entity"}}}},
			room_total:{
				filter: {
					bool: {
						must: [{term:{entity:"bookable_room"}}]
					}
				},
				aggs:{
					clicked:{
						filter:{
							bool:{
								must:[{term:{action:"clicked"}}
								]
							}
						},
						aggs: {data: {value_count:{field: "action"}}}},
					starred:{
						filter:{
							bool:{
								must:[{term:{action:"starred"}}]
							}
						},
						aggs: {data: {value_count:{field: "action"}							}						}
					}
				}
			}
		}
		}
	}
}
