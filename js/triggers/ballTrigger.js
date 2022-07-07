class BallTrigger
{
	#ball;

	constructor(ball)
	{
		this.#ball = ball;
	}

	checkTrigger()
	{
		if(this.#hasFallen())
		{
			this.#onBallFall();
		}
	}

	#hasFallen()
	{
		return this.#ball.getPosition().y > GAME_HEIGHT + GAME_BALL_RADIUS;
	}

	#onBallFall()
	{
		this.#ball.setInitialState();
		GameInstance.getGameManager().onBallFall();
	}
}