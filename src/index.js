import { realiseActions, getState, } from "./chain";
import { setProp, addTags, removeTags, } from "./actionCreators";

const actions = [
	setProp({
		id: "id",
		prop: "description",
		value: "this is the description",
	}),
	addTags({
		id: "id",
		tag: "tag1",
	}),
	addTags({
		id: "id",
		tags: ["tag2", "tag3",],
	}),
	removeTags({
		id: "id",
		tags: ["tag3", "tag1", "tag4",],
	}),
];

realiseActions(actions);
console.log(getState());
