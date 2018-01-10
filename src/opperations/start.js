import * as R from "ramda";

import { setProp, } from "../actionCreators";
import createFilterFunction from "../createFilterFunction";

export default ({ filter, }) => ({
	opperationFilter: createFilterFunction(filter),
	returnFilter: R.T,
	opperationActionCreator: R.map(({ uuid, }) =>
		setProp({
			uuid,
			prop: "start",
			value: new Date().getTime(),
		}),
	),
});
