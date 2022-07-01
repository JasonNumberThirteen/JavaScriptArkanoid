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
		return this.#board.getPaddle().getLives();
	}

	wonTheGame()
	{
		return this.#board.destroyedAllBricks();
	}

	lostTheGame()
	{
		return this.#board.getPaddle().lostAllLives();
	}
	
	onBallFall()
	{
		this.#board.getPaddle().loseLife();
	}
}