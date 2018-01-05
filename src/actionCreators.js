import * as R from "ramda";
import genUUID from "uuid/v4";

export const mergeActions = R.reduce(
	(acc, { meta, action, }) => ({
		meta,
		action: [...(acc.action || []), ...(action || []),],
	}),
	{},
);

export const setProp = ({ uuid, prop, value, }) => ({
	meta: {
		timestamp: new Date().getTime(),
		task: {
			uuid,
		},
		action: {
			uuid: genUUID(),
		},
	},
	action: [
		{
			op: "assocPath",
			args: [[uuid, prop,], value,],
		},
	],
});

export const unsetProp = ({ uuid, prop, }) => ({
	meta: {
		timestamp: new Date().getTime(),
		task: {
			uuid,
		},
		action: {
			uuid: genUUID(),
		},
	},
	action: [
		{
			op: "dissocPath",
			args: [[uuid, prop,],],
		},
	],
});

export const addTags = ({ uuid, tag, tags = [], }) => ({
	meta: {
		timestamp: new Date().getTime(),
		task: {
			uuid,
		},
		action: {
			uuid: genUUID(),
		},
	},
	action: [
		{
			op: "over",
			args: [
				{
					op: "lensPath",
					args: [[uuid, "tags",],],
				},
				{
					op: "pipe",
					args: [
						{
							op: "defaultTo",
							args: [[],],
						},
						{
							op: "union",
							args: [[...tags, tag,].filter(Boolean),],
						},
					],
				},
			],
		},
	],
});

export const removeTags = ({ uuid, tag, tags = [], }) => ({
	meta: {
		timestamp: new Date().getTime(),
		task: {
			uuid,
		},
		action: {
			uuid: genUUID(),
		},
	},
	action: [
		{
			op: "over",
			args: [
				{
					op: "lensPath",
					args: [[uuid, "tags",],],
				},
				{
					op: "pipe",
					args: [
						{
							op: "defaultTo",
							args: [[],],
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
		},
	],
});
