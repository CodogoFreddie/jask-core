import * as R from "ramda";

export default ({ uuids, ids, props, tags, description, }) => {
	const filterFunctions = [
		...(uuids || []).map(uuid => R.propEq("uuid", uuid)),

		...(ids || []).map(id => R.propEq("id", parseInt(id, 10))),

		(description || "").length &&
			R.pipe(R.propOr("", "description"), R.contains(description)),

		props.project &&
			R.pipe(R.propOr("", "project"), R.contains(props.project)),

		...(tags || []).map(tag =>
			R.pipe(R.prop("tags"), R.contains(tag.replace("+", ""))),
		),
	].filter(Boolean);

	if (filterFunctions.length) {
		return R.anyPass([...filterFunctions, R.F,]);
	} else {
		return R.anyPass([R.T,]);
	}
};
