class BallTrigger
{
	#ball;

	constructor(ball)
	{
		this.#ball = ball;
	}

	onBallFall(timeStamp)
	{
		this.#ball.setInitialState(timeStamp);
		GameInstance.getGameManager().onBallFall();
	}
}