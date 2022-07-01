class GameManager
{
	#board;
	#score = 0;
	
	constructor(board)
	{
		this.#board = board;
	}

	addScore(points)
	{
		this.#score += points;
	}

	getScore()
	{
		return this.#score;
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