export function randomBounded(min: number, max: number) {
	const difference = max - min + 1;

	return min + Math.floor(difference * Math.random());
}

// Window fit sqaure
// export const smallerDimension = Math.min(window.innerWidth,window.innerHeight)

/**
	* The aspect ratio of the window.  window.innerWidth / window.innerHeight
	*/
export default function aspectRatio(): number { return window.innerWidth / window.innerHeight }

/**
	* The aspect ratio of the window.
	* @param callbackfn  A function that accepts up to three arguments. forEach calls the callbackfn function one time for each element in the array.
	* @param thisArg  An object to which the this keyword can refer in the callbackfn function. If thisArg is omitted, undefined is used as the this value.
	*/

export function rollover(value: number, limit: number) {
	let tempValue = value;
	while (tempValue < 0) {
		// console.log(`value was ${tempValue}`)
		tempValue += limit
		tempValue += 1;
		// console.log(`now it is ${tempValue}`)
	}
	while (tempValue > limit) {
		// console.log(`value was ${tempValue}`)
		tempValue -= limit
		tempValue -= 1
		// console.log(`now it is ${tempValue}`)
	}
	return (tempValue);
}