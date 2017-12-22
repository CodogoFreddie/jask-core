import R from "ramda";
import genUUID from "uuid/v4";

import { setProp, addTags, mergeActions, } from "../actionCreators";
import processProps from "../processProps";

export default ({ modifiers, }) => ({
	opperationFilter: R.T,
	returnFilter: R.T,
	opperationActionCreator: () => {
		const uuid = genUUID();
		const actions = [
			setProp({
				uuid,
				prop: "updated",
				value: new Date().getTime(),
			}),
			setProp({
				uuid,
				prop: "created",
				value: new Date().getTime(),
			}),
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
			addTags({
				uuid,
				tags: (modifiers.tags || []).map(R.replace(/^(\+|-)/, "")),
			}),
		];

		return [mergeActions(actions),];
	},
});
