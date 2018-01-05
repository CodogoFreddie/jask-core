import * as R from "ramda";

import { setProp, addTags, mergeActions, } from "../actionCreators";
import processProps from "../processProps";
import createFilterFunction from "../createFilterFunction";

export default ({ filter, modifiers, }) => ({
	opperationFilter: createFilterFunction(filter),
	returnFilter: createFilterFunction(filter),
	opperationActionCreator: R.map(({ uuid, }) =>
		R.pipe(R.filter(Boolean), mergeActions)([
			setProp({
				uuid,
				prop: "updated",
				value: new Date().getTime(),
			}),

			modifiers.description &&
				setProp({
					uuid,
					prop: "description",
					value: modifiers.description,
				}),

			...(R.toPairs(processProps(modifiers.props)) || []).map(
				([prop, value,]) =>
					setProp({
						uuid,
						prop,
						value,
					}),
			),

			modifiers.tags.length &&
				addTags({
					uuid,
					tags: (modifiers.tags || []).map(R.replace(/^(\+|-)/, "")),
				}),
		]),
	),
});
