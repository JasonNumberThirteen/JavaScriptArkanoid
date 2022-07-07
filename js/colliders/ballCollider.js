class BallCollider
{
	#ball;

	constructor(ball)
	{
		this.#ball = ball;
	}

	checkCollision()
	{
		if(this.#isTouchingTopEdge())
		{
			this.#onTopEdgeTouch();
		}
		else if(this.#isTouchingLeftEdge())
		{
			this.#onLeftEdgeTouch();
		}
		else if(this.#isTouchingRightEdge())
		{
			this.#onRightEdgeTouch();
		}
	}

	checkCollisionWith(object, event)
	{
		if(this.#isCollidingWith(object))
		{
			event();
		}
	}

	hasHitARectangularObjectFromHorizontalSide(object)
	{
		const ballPosition = this.#ball.getPosition();
		const objectPosition = object.getPosition();
		const objectCollisionBox = object.collisionBox();
		
		return ballPosition.x < objectPosition.x || ballPosition.x > objectCollisionBox.x && (ballPosition.y > objectPosition.y && ballPosition.y < objectCollisionBox.y);
	}

	hasHitARectangularObjectFromVerticalSide(object)
	{
		const ballPosition = this.#ball.getPosition();
		const objectPosition = object.getPosition();
		const objectCollisionBox = object.collisionBox();
		
		return ballPosition.y > objectPosition.y || ballPosition.y < objectCollisionBox.y && (ballPosition.x > objectPosition.x && ballPosition.x < objectCollisionBox.x);
	}

	#isCollidingWith(object)
	{
		return this.#rectangularObjectIsCollidingWithBall(object);
	}

	#rectangularObjectIsCollidingWithBall(object)
	{
		const ballPosition = this.#ball.getPosition();
		const nearestPointOnObjectToTheCenterOfTheBall = nearestPointOnRectangleToTheCenterOfCircle(object.getPosition(), object.collisionBox(), ballPosition);
		
		return distanceBetweenPoints(ballPosition, nearestPointOnObjectToTheCenterOfTheBall) <= GAME_BALL_RADIUS*GAME_BALL_RADIUS;
	}

	#isTouchingTopEdge()
	{
		return this.#ball.getPosition().y < this.#topEdgeY();
	}

	#isTouchingLeftEdge()
	{
		return this.#ball.getPosition().x < this.#leftEdgeX();
	}

	#isTouchingRightEdge()
	{
		return this.#ball.getPosition().x > this.#rightEdgeX();
	}

	#onTopEdgeTouch()
	{
		this.#ball.deflectInYAxis();

		this.#ball.getPosition().y = this.#topEdgeY();
	}

	#onLeftEdgeTouch()
	{
		this.#onHorizontalEdgeTouch(this.#leftEdgeX());
	}

	#onRightEdgeTouch()
	{
		this.#onHorizontalEdgeTouch(this.#rightEdgeX());
	}

	#onHorizontalEdgeTouch(edgePosition)
	{
		this.#ball.deflectInXAxis();

		this.#ball.getPosition().x = edgePosition;
	}

	#topEdgeY()
	{
		return GAME_BALL_RADIUS + GAME_HUD_HEIGHT;
	}

	#leftEdgeX()
	{
		return GAME_BALL_RADIUS;
	}

	#rightEdgeX()
	{
		return GAME_WIDTH - GAME_BALL_RADIUS;
	}
}