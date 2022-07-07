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
		const sizeWithGap = new Point(GAME_BRICK_WIDTH + GAME_BRICK_GAP_X, GAME_BRICK_HEIGHT + GAME_BRICK_GAP_Y);
		const halfOfBricksInRow = GAME_BRICKS_IN_ROW*0.5;
		const widthWithGap = GAME_WIDTH + GAME_BRICK_GAP_X;
		const centerX = widthWithGap >> 1;
		const columnOffset = column - halfOfBricksInRow;
		const offsetX = sizeWithGap.x*columnOffset;
		const x = centerX - offsetX;
		const y = sizeWithGap.y*row + GAME_HUD_HEIGHT + GAME_BRICK_GAP_Y;
		
		return new Point(x, y);
	}
}