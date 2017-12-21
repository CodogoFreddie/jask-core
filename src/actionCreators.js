import genUUID from "uuid/v4";

export const setProp = ({ id, prop, value, }) => ({
	meta: {
		timestamp: new Date().getTime(),
		uuid: genUUID(),
	},
	action: [
		{
			op: "assocPath",
			args: [[id, prop,], value,],
		},
	],
});

export const unsetProp = ({ id, prop, }) => ({
	meta: {
		timestamp: new Date().getTime(),
		uuid: genUUID(),
	},
	action: [
		{
			op: "dissocPath",
			args: [[id, prop,],],
		},
	],
});

export const addTags = ({ id, tag, tags = [], }) => ({
	meta: {
		timestamp: new Date().getTime(),
		uuid: genUUID(),
	},
	action: [
		{
			op: "over",
			args: [
				{
					op: "lensPath",
					args: [[id, "tags",],],
				},
				{
					op: "union",
					args: [[...tags, tag,].filter(Boolean),],
				},
			],
		},
	],
});

export const removeTags = ({ id, tag, tags = [], }) => ({
	meta: {
		timestamp: new Date().getTime(),
		uuid: genUUID(),
	},
	action: [
		{
			op: "over",
			args: [
				{
					op: "lensPath",
					args: [[id, "tags",],],
				},
				{
					op: "difference",
					args: [
						{
							op: "__",
						},
						[...tags, tag,].filter(Boolean),
					],
				},
			],
		},
	],
});
