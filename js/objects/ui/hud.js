class HUD
{
	draw(ui, context)
	{
		this.#drawScore(ui, context);
		this.#drawLives(ui, context);
	}

	#drawScore(ui, context)
	{
		const text = {value: GAME_SCORE_TEXT, position: this.#scoreTextPosition()};
		const counter = {value: GameInstance.getGameManager().getScore(), position: this.#scoreCounterPosition(context)};
		
		this.#drawTextWithCounter(ui, context, text, counter, "left");
	}

	#drawLives(ui, context)
	{
		const text = {value: GAME_LIVES_TEXT, position: this.#livesTextPosition()};
		const counter = {value: GameInstance.getGameManager().getPaddleHealth(), position: this.#livesCounterPosition(context)};
		
		this.#drawTextWithCounter(ui, context, text, counter, "right");
	}

	#drawTextWithCounter(ui, context, text, counter, align)
	{
		ui.drawText(context, text.value, text.position, GAME_HUD_TEXTS_FILL_STYLE, align);
		ui.drawText(context, counter.value, counter.position, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#scoreCounterPosition(context)
	{
		const textPosition = this.#scoreTextPosition();
		const counterOffsetYFromText = this.#counterOffsetYFromText(context, GAME_SCORE_TEXT);
		
		return new Point(textPosition.x + this.#scoreSlicedTextWidth(), textPosition.y + counterOffsetYFromText);
	}

	#livesCounterPosition(context)
	{
		const textPosition = this.#livesTextPosition();
		const counterOffsetYFromText = this.#counterOffsetYFromText(context, GAME_LIVES_TEXT);
		
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

	#counterOffsetYFromText(context, text)
	{
		return context.measureText(text).actualBoundingBoxAscent + GAME_WINDOW_SCALE;
	}

	#scoreSlicedTextWidth(context)
	{
		return context.measureText(this.#scoreSlicedText()).width;
	}

	#livesSlicedTextWidth(context)
	{
		return context.measureText(this.#livesSlicedText()).width;
	}

	#scoreSlicedText()
	{
		return GAME_SCORE_TEXT.slice(0, GAME_HUD_COUNTERS_OFFSET_IN_LETTERS);
	}

	#livesSlicedText()
	{
		return GAME_LIVES_TEXT.slice(GAME_LIVES_TEXT.length - GAME_HUD_COUNTERS_OFFSET_IN_LETTERS - 1, GAME_LIVES_TEXT.length - 1);
	}
}