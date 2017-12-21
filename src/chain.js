import * as R from "ramda";

let chain = [];

const ramdafyAction = R.when(
	R.prop("op"),
	({ op, args, }) =>
		op === "__"
			? R.__
			: R[op](...(args || []).map(arg => ramdafyAction(arg))),
);

export const realiseActions = actions => {
	actions.forEach(({ action, }) => {
		const oldState = R.pathOr({}, [0, "state",], chain);
		const actionFunction = R.pipe(...action.map(ramdafyAction));
		const state = actionFunction(oldState);

		chain = [{ action, state, }, ...chain,];
	});
};

export const getState = () => R.head(chain).state;
