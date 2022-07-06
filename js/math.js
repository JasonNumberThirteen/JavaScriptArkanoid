const clamp = (min, n, max) => Math.min(Math.max(n, min), max);

const distanceBetweenPoints = function(pointA, pointB)
{
	const dx = pointB.x - pointA.x;
	const dy = pointB.y - pointA.y;

	return dx*dx + dy*dy;
};