import R from "ramda";

import createFilterFunction from "../createFilterFunction";

export { default as add, } from "./add";
export { default as modify, } from "./modify";
export { default as done, } from "./done";

export const noop = ({ filterPresent, filter, }) => ({
	opperationFilter: R.T,
	opperationActionCreator: () => [],
	returnFilter: filterPresent ? createFilterFunction(filter) : R.T,
});
