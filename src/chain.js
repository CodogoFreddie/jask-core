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
	actions.forEach(({ meta, action, }) => {
		const oldState = R.pathOr({}, [0, "state",], chain);
		const actionFunction = R.pipe(...action.map(ramdafyAction));
		const state = actionFunction(oldState);

		chain = [{ action: { meta, action, }, state, }, ...chain,];
	});
};

export const getState = () => R.pipe(R.head, R.propOr({}, "state"))(chain);
