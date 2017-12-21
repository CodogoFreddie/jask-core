import { realiseActions, getState, } from "./chain";
import { setProp, addTags, removeTags, } from "./actionCreators";
import { parseArgsList, } from "./parseArgsList";
import { actionifyModifiers, } from "./actionifyModifiers";
import { parseDate, parseDuration, } from "./dateParsing";

const { modifiers, } = parseArgsList([
	"+filterTag",
	"1",
	"f9708196-b3e9-4e1b-bec3-9abb7c9fde48",
	"modify",
	"this",
	"is",
	"the",
	"description",
	"+addTag",
	"-removeTag",
	"due:2w",
	"recur:1w",
	"foo:bar",
]);

const uuid = "f9708196-b3e9-4e1b-bec3-9abb7c9fde48";
const actions = actionifyModifiers({
	uuid,
	modifiers,
});

realiseActions(actions);

console.log(actions, modifiers, getState());
console.log(parseDate("2w"));
console.log(parseDate("friday"));
console.log(parseDate("01-02"));
console.log(parseDate("01-02-2017"));
console.log(parseDate("2017-01-02"));
console.log(parseDate("22:00"));
