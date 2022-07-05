class BallTrigger
{
	#ball;

	constructor(ball)
	{
		this.#ball = ball;
	}

	checkTrigger(timeStamp)
	{
		if(this.#hasFallen())
		{
			this.#onBallFall(timeStamp);
		}
	}

	#hasFallen()
	{
		return this.#ball.getPosition().y > GAME_HEIGHT + GAME_BALL_RADIUS;
	}

	#onBallFall(timeStamp)
	{
		this.#ball.setInitialState(timeStamp);
		GameInstance.getGameManager().onBallFall();
	}
}