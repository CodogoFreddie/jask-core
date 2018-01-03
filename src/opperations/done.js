import R from "ramda";
import genUUID from "uuid/v4";

import { setProp, mergeActions, addTags, } from "../actionCreators";
import { parseDuration, } from "../dateParsing";
import createFilterFunction from "../createFilterFunction";

export default ({ filter, }) => ({
	opperationFilter: createFilterFunction(filter),
	returnFilter: R.T,
	opperationActionCreator: R.pipe(
		R.map(({ uuid, recur, id, tags, due, ...props }) => [
			setProp({
				uuid,
				prop: "done",
				value: new Date().getTime(),
			}),
			recur &&
				mergeActions(
					(() => {
						const uuid = genUUID();

						return [
							setProp({
								uuid,
								prop: "created",
								value: new Date().getTime(),
							}),
							setProp({
								uuid,
								prop: "updated",
								value: new Date().getTime(),
							}),
							setProp({
								uuid,
								prop: "recur",
								value: recur,
							}),
							addTags({
								uuid,
								tags,
							}),
							...(R.toPairs(props) || []).map(([prop, value,]) =>
								setProp({
									uuid,
									prop,
									value,
								}),
							),
							setProp({
								uuid,
								prop: "due",
								value: parseDuration(recur)(
									new Date(due),
								).getTime(),
							}),
						];
					})(),
				),
		]),

		R.flatten,

		R.filter(Boolean),
	),
});
