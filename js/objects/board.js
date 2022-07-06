class Board
{
	#paddle;
	#ball;
	#bricks;

	constructor()
	{
		this.#init();
		this.#createBricks();
	}

	update()
	{
		this.#paddle.update();
		this.#ball.update();
		this.#checkCollisions();
	}

	getPaddle()
	{
		return this.#paddle;
	}

	getBall()
	{
		return this.#ball;
	}

	getBricks()
	{
		return this.#bricks;
	}

	filterAliveBricks()
	{
		this.#bricks = this.#bricks.filter(e => e.isAlive());
	}

	#init()
	{
		this.#paddle = new Paddle();
		this.#ball = new Ball();
	}

	#createBricks()
	{
		const brickFactory = new BrickFactory();

		this.#bricks = brickFactory.bricksTable();
	}

	#checkCollisions()
	{
		this.#ball.checkCollisionWith(this.#paddle, this.#paddle.onBallHit.bind(this.#paddle, this.#ball));
		this.#bricks.forEach(e => this.#ball.checkCollisionWith(e, e.onBallHit.bind(e, this.#ball)));
	}
}