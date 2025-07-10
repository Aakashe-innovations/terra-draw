import { Position } from "geojson";

export function validLatitude(lat: number) {
	return lat >= -90 && lat <= 90;
}

export function validLongitude(lng: number) {
	return lng >= -180 && lng <= 180;
}

export function coordinatePrecisionIsValid(
	coordinate: Position,
	coordinatePrecision: number,
) {
	return (
		getDecimalPlaces(coordinate[0]) <= coordinatePrecision &&
		getDecimalPlaces(coordinate[1]) <= coordinatePrecision
	);
}

export function coordinateIsValid(coordinate: unknown[]) {
	return (
		    (coordinate.length === 2 || coordinate.length === 3) &&
    // Check if first two elements are numbers and not Infinity
    typeof coordinate[0] === "number" &&
    typeof coordinate[1] === "number" &&
    coordinate[0] !== Infinity &&
    coordinate[1] !== Infinity &&
    // If altitude exists (3rd element), check if it's a number and not Infinity
    (coordinate.length === 3 ? (
      typeof coordinate[2] === "number" &&
      coordinate[2] !== Infinity
    ) : true) &&
    // Validate longitude and latitude ranges
    validLongitude(coordinate[0]) &&
    validLatitude(coordinate[1])

	);
}

export function getDecimalPlaces(value: number): number {
	let current = 1;
	let precision = 0;
	while (Math.round(value * current) / current !== value) {
		current *= 10;
		precision++;
	}

	return precision;
}
