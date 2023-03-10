/****************************************************************************
  FileName      [ Cell.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates a single cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React from "react";
import "./css/Cell.css";

// Nothing to do with this file.
// The input 'detail' of Cell is one single cell which have properties of x, y, value, flagged and revealed.
export default function Cell({
	rowIdx,
	colIdx,
	detail,
	gameStart,
	myTurn,
	updateFlag,
	revealCell,
}) {
	const cellStyle = {
		background:
			detail.value !== -3 && detail.value !== -2 // revealed
				? detail.value === -1 // bomb
					? "#880000"
					: mineCheckPattern(detail.x, detail.y)
				: checkPattern(detail.x, detail.y), // unrevealed
		color: numColorCode(detail.value),
		border:
			detail.value !== -3 && detail.value !== -2
				? "2px inset darkgrey"
				: "2px outset white",
	};
	const ID = rowIdx.toString() + "-" + colIdx.toString();

	return (
		<div
			onContextMenu={(e) => {
				updateFlag(e, myTurn, detail.x, detail.y);
			}}
			onClick={() => {
				revealCell(gameStart, myTurn, detail.x, detail.y);
			}}
			style={cellStyle}
			className="cell"
			id={ID}
		>
			{detail.value === -2 // flag
				? "🚩"
				: detail.value === -1 // bomb
				? "💣"
				: detail.value > 0
				? detail.value
				: ""}
		</div>
	);
}

const mineCheckPattern = (x, y) => {
	if (x % 2 === 0 && y % 2 === 0) return "#c0c0c0";
	else if (x % 2 === 0 && y % 2 !== 0) return "#bbbbbb";
	else if (x % 2 !== 0 && y % 2 === 0) return "#bbbbbb";
	else return "#c0c0c0";
};

const checkPattern = (x, y) => {
	if (x % 2 === 0 && y % 2 === 0) return "#dddddd";
	else if (x % 2 === 0 && y % 2 !== 0) return "#d0d0d0";
	else if (x % 2 !== 0 && y % 2 === 0) return "#d0d0d0";
	else return "#dddddd";
};

const numColorCode = (num) => {
	if (num === 1) return "#0307de";
	else if (num === 2) return "#15760f";
	else if (num === 3) return "#dc1410";
	else if (num === 4) return "#02087e";
	else if (num === 5) return "#630501";
	else if (num === 6) return "#ec596c";
	else if (num === 7) return "#edf451";
	else if (num === 8) return "#56dddc";
};
