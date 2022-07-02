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

	getPaddleLives()
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

	#destroyedAllBricks()
	{
		return this.#board.getBricks().length === 0;
	}
}