import * as R from "ramda";

import createFilterFunction from "../createFilterFunction";

export { default as add, } from "./add";
export { default as modify, } from "./modify";
export { default as done, } from "./done";
export { default as start, } from "./start";
export { default as stop, } from "./stop";

export const noop = ({ filterPresent, filter, }) => ({
	opperationFilter: R.T,
	opperationActionCreator: () => [],
	returnFilter: filterPresent ? createFilterFunction(filter) : R.T,
});
