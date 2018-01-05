import * as R from "ramda";
import getTime from "date-fns/fp/getTime";

import { parseDate, } from "./dateParsing";
import { getState, } from "./chain";

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

const dateStringToTimestamp = R.pipe(parseDate, getTime);

export default R.evolve({
	due: dateStringToTimestamp,
	wait: dateStringToTimestamp,
	priority: R.pipe(R.nth(0), R.toUpper),
	depends: R.cond([
		[R.test(uuidRegex), R.identity,],

		[
			x => parseInt(x, 10),
			x => R.path([parseInt(x, 10), "uuid",], getState()),
		],

		[R.T, R.always(undefined),],
	]),
});
