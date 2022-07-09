const clamp = (min, n, max) => Math.min(Math.max(n, min), max);
const randomSign = () => Math.random() > 0.5 ? -1 : 1;
const magnitude = (vector) => Math.sqrt(vector.x*vector.x + vector.y*vector.y);
const normalisedVector = function(vector)
{
	const m = magnitude(vector);

	if(m > Number.EPSILON)
	{
		return new Point(vector.x / m, vector.y / m);
	}
	else
	{
		return new Point(0, 0);
	}
};

const nearestPointOnRectangleToTheCenterOfCircle = function(rectanglePosition, rectangleCollisionBox, circlePosition)
{
	const xn = Math.max(rectanglePosition.x, Math.min(circlePosition.x, rectangleCollisionBox.x));
	const yn = Math.max(rectanglePosition.y, Math.min(circlePosition.y, rectangleCollisionBox.y));

	return new Point(xn, yn);
};

const squaredDistanceBetweenPoints = function(pointA, pointB)
{
	const dx = pointB.x - pointA.x;
	const dy = pointB.y - pointA.y;

	return dx*dx + dy*dy;
};