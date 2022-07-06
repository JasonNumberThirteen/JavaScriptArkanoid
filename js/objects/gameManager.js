class GameManager
{
	#board;
	#score;
	
	constructor(board)
	{
		this.#board = board;
		this.#score = new Counter(0);
	}

	addScore(points)
	{
		this.#score.increaseBy(points);
	}

	getScore()
	{
		return this.#score.getValue();
	}

	getPaddleHealth()
	{
		return this.#board.getPaddle().getHealth();
	}

	wonTheGame()
	{
		return this.#destroyedAllBricks();
	}

	lostTheGame()
	{
		return !this.#board.getPaddle().isAlive();
	}
	
	onBallFall()
	{
		this.#board.getPaddle().takeDamage();
	}

	onBrickDestroy(brick)
	{
		this.addScore(brick.getPoints());
		this.#board.filterAliveBricks();
	}

	#destroyedAllBricks()
	{
		return this.#board.getBricks().length === 0;
	}
}