import R from "ramda";
import genUUID from "uuid/v4";

import { parseArgsList, } from "./parseArgsList";
import { setProp, addTags, mergeActions, } from "./actionCreators";
import createFilterFunction from "./createFilterFunction";

const add = ({ modifiers, }) => {
	const uuid = genUUID();

	const actions = [
		setProp({
			uuid,
			prop: "created",
			value: new Date().getTime(),
		}),
		...(R.toPairs(modifiers.props) || []).map(([prop, value,]) =>
			setProp({
				uuid,
				prop,
				value,
			}),
		),
		addTags({
			uuid,
			tags: (modifiers.tags || []).map(R.replace(/^(\+|-)/, "")),
		}),
	];

	return {
		generatedAction: mergeActions(actions),
	};
};

// make any mutations that this should lead to,
// return the actions to be store, and a filter function that
// can be used to view the store.
export const runArgCommand = args => {
	let generatedAction = null;
	let filterFunction = R.T;

	const { keyword, filter, filterPresent, modifiers, } = parseArgsList(args);

	if (keyword === "add") {
		generatedAction = add({ modifiers, }).generatedAction;
	}

	if (!keyword && filterPresent) {
		filterFunction = createFilterFunction(filter);
	}

	return {
		filterFunction,
		generatedAction,
	};
};
