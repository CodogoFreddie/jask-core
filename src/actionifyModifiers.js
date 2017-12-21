import R from "ramda";

import { setProp, addTags, removeTags, } from "./actionCreators";

export const actionifyModifiers = ({
	uuid,
	modifiers: { description, props, tags, },
}) => {
	const actions = [];

	if (description.length) {
		actions.push(
			setProp({
				uuid,
				prop: "description",
				value: description,
			}),
		);
	}

	if (R.keys(props).length) {
		R.toPairs(props).forEach(([prop, value,]) =>
			actions.push(
				setProp({
					uuid,
					prop,
					value,
				}),
			),
		);
	}

	if (tags.length) {
		const [tagsRemove, tagsAdd,] = R.partition(R.test(/^-/), tags);

		actions.push(
			removeTags({
				uuid,
				tags: tagsRemove.map(R.replace(/^-/, "")),
			}),
		);

		actions.push(
			addTags({
				uuid,
				tags: tagsAdd.map(R.replace(/^\+/, "")),
			}),
		);
	}

	return actions;
};
