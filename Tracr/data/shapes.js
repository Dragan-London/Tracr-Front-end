export const shapes = [
	{
		id: 1,
		name: "triangle",
		path: [
			{ x: 0.5, y: 0.1 },
			{ x: 0.85, y: 0.8 },
			{ x: 0.15, y: 0.8 },
			{ x: 0.5, y: 0.1 },
		],
	},
	{
		id: 2,
		name: "cross",
		path: [
			{ x: 0.2, y: 0.2 },
			{ x: 0.8, y: 0.8 },
			{ x: 0.5, y: 0.5 },
			{ x: 0.8, y: 0.2 },
			{ x: 0.2, y: 0.8 },
		],
	},
	{
		id: 3,
		name: "zigzag",
		path: [
			{ x: 0.1, y: 0.3 },
			{ x: 0.25, y: 0.7 },
			{ x: 0.4, y: 0.3 },
			{ x: 0.55, y: 0.7 },
			{ x: 0.7, y: 0.3 },
			{ x: 0.85, y: 0.7 },
		],
	},
	{
		id: 4,
		name: "hexagon",
		path: [
			{ x: 0.2, y: 0.5 },
			{ x: 0.35, y: 0.3 },
			{ x: 0.65, y: 0.3 },
			{ x: 0.8, y: 0.5 },
			{ x: 0.65, y: 0.7 },
			{ x: 0.35, y: 0.7 },
			{ x: 0.2, y: 0.5 },
		],
	},
	{
		id: 5,
		name: "arrow",
		path: [
			{ x: 0.2, y: 0.5 },
			{ x: 0.6, y: 0.5 },
			{ x: 0.6, y: 0.3 },
			{ x: 0.9, y: 0.6 },
			{ x: 0.6, y: 0.9 },
			{ x: 0.6, y: 0.7 },
			{ x: 0.2, y: 0.7 },
			{ x: 0.2, y: 0.5 },
		],
	},
	{
		id: 6,
		name: "steps",
		path: [
			{ x: 0.2, y: 0.9 },
			{ x: 0.2, y: 0.8 },
			{ x: 0.3, y: 0.8 },
			{ x: 0.3, y: 0.7 },
			{ x: 0.4, y: 0.7 },
			{ x: 0.4, y: 0.6 },
			{ x: 0.5, y: 0.6 },
			{ x: 0.5, y: 0.5 },
			{ x: 0.6, y: 0.5 },
			{ x: 0.6, y: 0.4 },
			{ x: 0.7, y: 0.4 },
			{ x: 0.7, y: 0.3 },
			{ x: 0.8, y: 0.3 },
			{ x: 0.8, y: 0.2 },
			{ x: 0.9, y: 0.2 },
		],
	},
	{
		id: 7,
		name: "spiral",
		path: [
			{ x: 0.2, y: 0.8 },
			{ x: 0.2, y: 0.2 },
			{ x: 0.8, y: 0.2 },
			{ x: 0.8, y: 0.8 },
			{ x: 0.3, y: 0.8 },
			{ x: 0.3, y: 0.3 },
			{ x: 0.7, y: 0.3 },
			{ x: 0.7, y: 0.7 },
			{ x: 0.4, y: 0.7 },
			{ x: 0.4, y: 0.4 },
			{ x: 0.6, y: 0.4 },
		],
	},
	{
		id: 8,
		name: "star",
		path: [
			{ x: 0.5, y: 0.05 },
			{ x: 0.6, y: 0.35 },
			{ x: 0.95, y: 0.35 },
			{ x: 0.65, y: 0.55 },
			{ x: 0.75, y: 0.9 },
			{ x: 0.5, y: 0.7 },
			{ x: 0.25, y: 0.9 },
			{ x: 0.35, y: 0.55 },
			{ x: 0.05, y: 0.35 },
			{ x: 0.4, y: 0.35 },
			{ x: 0.5, y: 0.05 },
		],
	},
	{
		id: 9,
		name: "gem",
		path: [
			{ x: 0.15, y: 0.4 },
			{ x: 0.35, y: 0.25 },
			{ x: 0.65, y: 0.25 },
			{ x: 0.85, y: 0.4 },
			{ x: 0.5, y: 0.85 },
			{ x: 0.15, y: 0.4 },
		],
	},
	{
		id: 10,
		name: "heart",
		path: [
			{ x: 0.5, y: 0.88 }, // bottom tip

			{ x: 0.36, y: 0.78 },
			{ x: 0.24, y: 0.66 },
			{ x: 0.18, y: 0.54 },
			{ x: 0.18, y: 0.42 },
			{ x: 0.24, y: 0.32 },

			{ x: 0.34, y: 0.26 }, // left curve outer
			{ x: 0.42, y: 0.26 }, // left top inner

			{ x: 0.47, y: 0.3 },
			{ x: 0.5, y: 0.36 }, // center dip

			{ x: 0.53, y: 0.3 },
			{ x: 0.58, y: 0.26 }, // right top inner
			{ x: 0.66, y: 0.26 }, // right curve outer

			{ x: 0.76, y: 0.32 },
			{ x: 0.82, y: 0.42 },
			{ x: 0.82, y: 0.54 },
			{ x: 0.76, y: 0.66 },

			{ x: 0.64, y: 0.78 },
			{ x: 0.5, y: 0.88 }, // close
		],
	},
	{
		id: 11,
		name: "lightning",
		path: [
			{ x: 0.5, y: 0.1 },
			{ x: 0.3, y: 0.5 },
			{ x: 0.55, y: 0.5 },
			{ x: 0.35, y: 0.9 },
			{ x: 0.7, y: 0.4 },
			{ x: 0.45, y: 0.4 },
			{ x: 0.5, y: 0.1 },
		],
	},
	{
		id: 12,
		name: "butterfly",
		path: [
			// left loop
			{ x: 0.3, y: 0.5 },
			{ x: 0.25, y: 0.35 },
			{ x: 0.35, y: 0.25 },
			{ x: 0.45, y: 0.35 },

			// center cross
			{ x: 0.55, y: 0.5 },

			// right loop
			{ x: 0.65, y: 0.35 },
			{ x: 0.75, y: 0.25 },
			{ x: 0.85, y: 0.35 },
			{ x: 0.8, y: 0.5 },
			{ x: 0.85, y: 0.65 },
			{ x: 0.75, y: 0.75 },
			{ x: 0.65, y: 0.65 },

			// back through center
			{ x: 0.55, y: 0.5 },

			// finish left loop
			{ x: 0.45, y: 0.65 },
			{ x: 0.35, y: 0.75 },
			{ x: 0.25, y: 0.65 },
			{ x: 0.3, y: 0.5 },
		],
	},
	{
		id: 13,
		name: "bear",
		path: [
			{ x: 0.25, y: 0.4 }, // left cheek
			{ x: 0.2, y: 0.25 }, // left ear outer
			{ x: 0.3, y: 0.15 }, // left ear top
			{ x: 0.4, y: 0.25 }, // left ear inner

			{ x: 0.6, y: 0.25 }, // right ear inner
			{ x: 0.7, y: 0.15 }, // right ear top
			{ x: 0.8, y: 0.25 }, // right ear outer

			{ x: 0.75, y: 0.4 }, // right cheek
			{ x: 0.7, y: 0.65 }, // right jaw
			{ x: 0.55, y: 0.8 }, // chin
			{ x: 0.45, y: 0.8 }, // chin
			{ x: 0.3, y: 0.65 }, // left jaw

			{ x: 0.25, y: 0.4 }, // close
		],
	},
	{
		id: 14,
		name: "airplane",
		path: [
			{ x: 0.5, y: 0.05 }, // nose tip

			{ x: 0.56, y: 0.18 }, // upper right fuselage
			{ x: 0.58, y: 0.35 }, // wing root right
			{ x: 0.9, y: 0.55 },
			{ x: 0.9, y: 0.6 }, // right wing tip
			{ x: 0.58, y: 0.48 }, // trailing wing edge

			{ x: 0.55, y: 0.78 }, // lower right fuselage
			{ x: 0.65, y: 0.9 }, // right tail wing
			{ x: 0.5, y: 0.82 }, // tail center
			{ x: 0.35, y: 0.9 }, // left tail wing

			{ x: 0.45, y: 0.78 }, // lower left fuselage
			{ x: 0.42, y: 0.48 }, // trailing wing edge
			{ x: 0.1, y: 0.6 },
			{ x: 0.1, y: 0.55 }, // left wing tip
			{ x: 0.42, y: 0.35 }, // wing root left

			{ x: 0.44, y: 0.18 }, // upper left fuselage

			{ x: 0.5, y: 0.05 }, // close
		],
	},
	{
		id: 15,
		name: "house",
		path: [
			{ x: 0.2, y: 0.5 }, // left wall
			{ x: 0.4, y: 0.23 }, // roof peak

			// chimney
			{ x: 0.58, y: 0.23 },
			{ x: 0.58, y: 0.12 },
			{ x: 0.68, y: 0.12 },
			{ x: 0.68, y: 0.28 },

			// roof down
			{ x: 0.8, y: 0.5 }, // right roof edge

			{ x: 0.8, y: 0.8 }, // right wall
			{ x: 0.2, y: 0.8 }, // bottom
			{ x: 0.2, y: 0.5 }, // close
		],
	},
	{
		id: 16,
		name: "sailboat",
		path: [
			{ x: 0.15, y: 0.7 }, // hull left
			{ x: 0.85, y: 0.7 }, // hull right
			{ x: 0.7, y: 0.9 }, // hull bottom right
			{ x: 0.3, y: 0.9 }, // hull bottom left

			{ x: 0.15, y: 0.7 }, // close hull

			{ x: 0.5, y: 0.7 }, // mast bottom
			{ x: 0.5, y: 0.2 }, // mast top

			{ x: 0.8, y: 0.55 }, // sail outer
			{ x: 0.5, y: 0.55 },
			{ x: 0.5, y: 0.2 }, // sail tip
			{ x: 0.5, y: 0.7 }, // sail base

			{ x: 0.15, y: 0.7 }, // close
		],
	},
];
