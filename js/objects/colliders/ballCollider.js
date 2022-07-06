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

	#isCollidingWith(object)
	{
		return this.#rectangularObjectIsCollidingWithBall(object);
	}

	#rectangularObjectIsCollidingWithBall(object)
	{
		const objectPosition = object.getPosition();
		const ballPosition = this.#ball.getPosition();
		const objectCollisionBox = object.collisionBox();
		const xn = Math.max(objectPosition.x, Math.min(ballPosition.x, objectCollisionBox.x));
		const yn = Math.max(objectPosition.y, Math.min(ballPosition.y, objectCollisionBox.y));
		
		return distanceBetweenPoints(ballPosition, new Point(xn, yn)) <= GAME_BALL_RADIUS*GAME_BALL_RADIUS;
	}

	#isTouchingTopEdge()
	{
		return this.#ball.getPosition().y < GAME_BALL_RADIUS + GAME_HUD_HEIGHT;
	}

	#isTouchingLeftEdge()
	{
		return this.#ball.getPosition().x < GAME_BALL_RADIUS;
	}

	#isTouchingRightEdge()
	{
		return this.#ball.getPosition().x > GAME_WIDTH - GAME_BALL_RADIUS;
	}

	#onTopEdgeTouch()
	{
		this.#ball.deflectInYAxis();
	}

	#onLeftEdgeTouch()
	{
		this.#ball.deflectInXAxis();
	}

	#onRightEdgeTouch()
	{
		this.#ball.deflectInXAxis();
	}
}