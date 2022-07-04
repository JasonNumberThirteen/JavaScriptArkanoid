class HUD
{
	#ui;
	#context;

	constructor(ui, context)
	{
		this.#ui = ui;
		this.#context = context;
	}
	
	draw()
	{
		this.#drawScore();
		this.#drawLives();
	}

	#drawScore()
	{
		const text = {value: GAME_SCORE_TEXT, position: this.#scoreTextPosition()};
		const counter = {value: GameInstance.getGameManager().getScore(), position: this.#scoreCounterPosition()};
		
		this.#drawTextWithCounter(text, counter, "left");
	}

	#drawLives()
	{
		const text = {value: GAME_LIVES_TEXT, position: this.#livesTextPosition()};
		const counter = {value: GameInstance.getGameManager().getPaddleHealth(), position: this.#livesCounterPosition()};
		
		this.#drawTextWithCounter(text, counter, "right");
	}

	#drawTextWithCounter(text, counter, align)
	{
		this.#ui.drawText(text.value, text.position, GAME_HUD_TEXTS_FILL_STYLE, align);
		this.#ui.drawText(counter.value, counter.position, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#scoreCounterPosition()
	{
		const textPosition = this.#scoreTextPosition();
		const counterOffsetYFromText = this.#counterOffsetYFromText(GAME_SCORE_TEXT);
		
		return new Point(textPosition.x + this.#scoreSlicedTextWidth(), textPosition.y + counterOffsetYFromText);
	}

	#livesCounterPosition()
	{
		const textPosition = this.#livesTextPosition();
		const counterOffsetYFromText = this.#counterOffsetYFromText(GAME_LIVES_TEXT);
		
		return new Point(textPosition.x - this.#livesSlicedTextWidth(), textPosition.y + counterOffsetYFromText);
	}

	#scoreTextPosition()
	{
		return new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
	}

	#livesTextPosition()
	{
		return new Point(GAME_WIDTH - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
	}

	#counterOffsetYFromText(text)
	{
		return this.#context.measureText(text).actualBoundingBoxAscent + GAME_WINDOW_SCALE;
	}

	#scoreSlicedTextWidth()
	{
		return this.#context.measureText(this.#scoreSlicedText()).width;
	}

	#livesSlicedTextWidth()
	{
		return this.#context.measureText(this.#livesSlicedText()).width;
	}

	#scoreSlicedText()
	{
		return GAME_SCORE_TEXT.slice(0, GAME_HUD_COUNTERS_OFFSET_IN_LETTERS);
	}

	#livesSlicedText()
	{
		const textLength = GAME_LIVES_TEXT.length;
		
		return GAME_LIVES_TEXT.slice(textLength - GAME_HUD_COUNTERS_OFFSET_IN_LETTERS - 1, textLength - 1);
	}
}