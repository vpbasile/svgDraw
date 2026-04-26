export default function makeSnowFlake(length: number, depth: number, isRoot: boolean) {
    // TODO - this should use findPerpendicularBisector
    
    // When we reach the end of the recursion, return a character
    if (depth === 0) return isRoot ? '*' : ' ';
    // Otherwise, return the current character and make the next level
    const nextIsRoot = false;
    return makeSnowFlake((length / 3), (depth - 1), nextIsRoot)
}