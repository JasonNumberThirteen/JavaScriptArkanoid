class BrickFactory
{
	bricksTable()
	{
		const bricks = [];
		
		for (let y = 0; y <= GAME_BRICKS.length - 1; ++y)
		{
			for (let x = 1; x <= GAME_BRICKS_IN_ROW; ++x)
			{
				bricks.push(this.#brickInstance(x, y));
			}
		}

		return bricks;
	}

	#brickInstance(column, row)
	{
		return new Brick(this.#brickPosition(column, row), GAME_BRICKS[row]);
	}

	#brickPosition(column, row)
	{
		const basePosition = new Point(GAME_BRICK_WIDTH + GAME_BRICK_GAP_X, GAME_BRICK_HEIGHT + GAME_BRICK_GAP_Y);
		const offset = new Point(15*GAME_WINDOW_SCALE, GAME_HUD_HEIGHT + GAME_BRICK_GAP_Y);
		
		return new Point(basePosition.x*column - offset.x, basePosition.y*row + offset.y);
	}
}