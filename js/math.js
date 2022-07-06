const clamp = (min, n, max) => Math.min(Math.max(n, min), max);

const nearestPointOnRectangleToTheCenterOfCircle = function(rectanglePosition, rectangleCollisionBox, circlePosition)
{
	const xn = Math.max(rectanglePosition.x, Math.min(circlePosition.x, rectangleCollisionBox.x));
	const yn = Math.max(rectanglePosition.y, Math.min(circlePosition.y, rectangleCollisionBox.y));

	return new Point(xn, yn);
}

const distanceBetweenPoints = function(pointA, pointB)
{
	const dx = pointB.x - pointA.x;
	const dy = pointB.y - pointA.y;

	return dx*dx + dy*dy;
};