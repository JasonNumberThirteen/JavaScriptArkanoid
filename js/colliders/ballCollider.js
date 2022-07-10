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
		if(rectangleIsInCircle(object.getPosition(), object.getCollisionBox(), this.#ball.getPosition(), GAME_BALL_RADIUS))
		{
			event();
		}
	}

	hasHitARectangularObjectFromHorizontalSide(object)
	{
		const ballPosition = this.#ball.getPosition();
		const objectPosition = object.getPosition();
		const objectCollisionBox = object.getCollisionBox();
		
		return ballPosition.x < objectPosition.x || ballPosition.x > objectCollisionBox.x && (ballPosition.y > objectPosition.y && ballPosition.y < objectCollisionBox.y);
	}

	hasHitARectangularObjectFromVerticalSide(object)
	{
		const ballPosition = this.#ball.getPosition();
		const objectPosition = object.getPosition();
		const objectCollisionBox = object.getCollisionBox();
		
		return ballPosition.y > objectPosition.y || ballPosition.y < objectCollisionBox.y && (ballPosition.x > objectPosition.x && ballPosition.x < objectCollisionBox.x);
	}

	#isTouchingTopEdge()
	{
		return this.#ball.getPosition().y < GAME_BALL_TOP_EDGE_Y;
	}

	#isTouchingLeftEdge()
	{
		return this.#ball.getPosition().x < GAME_BALL_LEFT_EDGE_X;
	}

	#isTouchingRightEdge()
	{
		return this.#ball.getPosition().x > GAME_BALL_RIGHT_EDGE_X;
	}

	#onTopEdgeTouch()
	{
		this.#ball.inverseDirectionY();
		this.#ball.update();
	}

	#onLeftEdgeTouch()
	{
		this.#onHorizontalEdgeTouch();
	}

	#onRightEdgeTouch()
	{
		this.#onHorizontalEdgeTouch();
	}

	#onHorizontalEdgeTouch()
	{
		this.#ball.inverseDirectionX();
		this.#ball.update();
	}
}