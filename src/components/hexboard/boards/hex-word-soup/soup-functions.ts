import { hexProps } from "../../hexboard/hexDefinitions";

// Gameplay global variables
export const initPlayers = [
	{ "id": 0, "color": "purple", "score": 0, "history": [] },
	{ "id": 1, "color": "blue", "score": 0, "history": [] }
]
export const letterScores = {
	"A": 1, "B": 3, "C": 3, "D": 2, "E": 1, "F": 4, "G": 2, "H": 4, "I": 1, "J": 8, "K": 5, "L": 1, "M": 3, "N": 1, "O": 1, "P": 3, "QU": 10, "R": 1, "S": 1, "T": 1, "U": 1, "V": 4, "W": 4, "X": 8, "Y": 4, "Z": 10
}

// export function placeholderText() { return `It is ${players[currentPlayer].color}'s turn. Touch a letter to begin.` }

export const generateHexCoordinates = () => {
	const usefulClasses = "hex clickable";
	let idGen = 0;
	const hexRoster: hexProps[] = [];
	for (let q = -3; q <= 3; q++) {
		for (let r = -3; r <= 3; r++) {
			if (Math.abs(q + r) <= 3) {
				const uid = idGen++;
				const newHex: hexProps = {
					uid: uid, q: q, r: r, cssClasses: usefulClasses, hexText: "*",
					// Each hex needs a unique clickMessage
					clickMessage: `clicked ${uid}`,
					// fixme: Need to find a way to pass game-specific values and functions to the hexes
					// value: 2, 
					// clickFunction: (hexId: number) => { console.log('clicked', hexId) },
					// active: true
				};
				hexRoster.push(newHex);
			}
		}
	}
	return hexRoster;
}

export function shuffle(array: string[]): string[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array
}

// Stuff for checking the entered words in a dictionary
// const apiKey = "df21cec5-0310-49d9-be45-0e5d29bb553c"
// const apiName = "thesaurus"
// var url

// ---------------------------------------------
// <><> Handling events <><>
// ---------------------------------------------

// function appendToHistory(player, word) {
// 	// Add the word to the history
// 	players[player].history.push(word)
// 	// console.log(tempstring)
// 	var tempItem = document.createElement("li")
// 	tempItem.innerText = `${currentword}(${currentWordScore})`
// 	document.getElementById(`player${currentPlayer}history`).appendChild(tempItem)
// 	// Update the history display
// 	// drawHistory()
// }

// async function submitButtonClicked() {
// 	if (currentword.length > 0) {
// 		spoon.attr('stroke', 'cornflowerblue').attr('class', `black`)
// 		spoonBack.attr('fill', 'cornflowerblue').attr('class', `black`)
// 		await dictionaryCheck(currentword)
// 	}
// }

// async function dictionaryCheck(word) {
// 	url = `https://www.dictionaryapi.com/api/v3/references/${apiName}/json/${word}?key=${apiKey}`
// 	let myObject = await fetch(url);
// 	let myText = await myObject.json();
// 	if ((myText[0].meta != undefined)) {
// 		spoon.attr('stroke', `green`)
// 		console.log(`${word} is in the dictionary`)
// 		finishTurn()
// 	} else {
// 		spoon.attr('stroke', `red`)
// 		console.log(`${word} is not in the dictionary`)
// 		nope()
// 	}
// }

// Make the enter button hex
// export const submitHex: newHex = { q: 2, r: 2, hexText: "enter" }

// Make the clear button hex
// export const clearHex: newHex = { q: 4, r: -2, hexText: "clear" }