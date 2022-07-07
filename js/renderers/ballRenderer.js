class BallRenderer
{
	#ball;

	constructor(ball)
	{
		this.#ball = ball;
	}
	
	draw(context)
	{
		if(GameInstance.isRunning())
		{
			this.#drawArc(context);
			this.#drawStroke(context);
		}
	}

	#drawArc(context)
	{
		context.fillStyle = GAME_BALL_FILL_STYLE;
		
		this.#createArc(context);
		context.fill();
	}

	#drawStroke(context)
	{
		context.strokeStyle = GAME_BALL_STROKE_STYLE;

		this.#createArc(context);
		context.stroke();
	}

	#createArc(context)
	{
		const position = this.#ball.getPosition();
		
		context.beginPath();
		context.arc(position.x, position.y, GAME_BALL_RADIUS, 0, Math.PI << 1);
		context.closePath();
	}
}