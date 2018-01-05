import * as R from "ramda";

const map = R.addIndex(R.map);

let chain = [
	{
		state: {},
	},
];

const ramdafyAction = R.when(
	R.prop("op"),
	({ op, args, }) =>
		op === "__"
			? R.__
			: R[op](...(args || []).map(arg => ramdafyAction(arg))),
);

const reduce = (state = {}, { action, }) =>
	R.pipe(...action.map(ramdafyAction))(state);

export const insertAction = action => {
	//this is currently very ineffiecneit
	//this rebuilds the whole state history on each insertion
	//would be faster to only rebuild states that need to be
	//but this is really simple, readable, clean code, and I'm concerned about chainging
	//it while I'm spacey and depressed
	const insertIndex = R.findIndex(
		R.pipe(
			R.path(["action", "meta", "timestamp",]),
			R.lt(action.meta.timestamp),
		),
		chain,
	);

	chain = R.insert(
		insertIndex,
		{
			action,
		},
		chain,
	);

	chain = R.scan(
		({ state, }, { action, }) => {
			return {
				action,
				state: reduce(state, action),
			};
		},
		R.head(chain),
		R.tail(chain),
	);
};

export const realiseActions = actions => {
	//this is currently very ineffiecneit
	//actions are realised by inserting each action, which rebuilds the
	//state history on each insertion,
	//it would be much faster to sort the actions, then build the state in one
	//pass.
	//but for the moment, I'm going for consistency over speed...
	actions.forEach(insertAction);
};

export const getState = () =>
	R.pipe(
		R.last,
		R.propOr({}, "state"),
		R.toPairs,
		R.map(([uuid, rest,]) => ({
			uuid,
			...rest,
		})),
		R.sortBy(R.prop("uuid")),
		map((rest, id) => ({
			...rest,
			id,
		})),
	)(chain);
