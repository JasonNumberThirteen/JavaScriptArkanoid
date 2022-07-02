class HUD
{
	#game;
	#ui;

	constructor(game, ui)
	{
		this.#game = game;
		this.#ui = ui;
	}
	
	draw()
	{
		this.#drawScoreCounter();
		this.#drawLivesCounter();
	}

	#drawScoreCounter()
	{
		const textPosition = new Point(GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const counterPosition = new Point(textPosition.x + GAME_HUD_COUNTERS_OFFSET, textPosition.y + GAME_HUD_COUNTERS_OFFSET);
		const align = "left";
		
		this.#ui.drawText(GAME_SCORE_TEXT, textPosition, GAME_HUD_TEXTS_FILL_STYLE, align);
		this.#ui.drawText(this.#game.getGameManager().getScore(), counterPosition, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}

	#drawLivesCounter()
	{
		const textPosition = new Point(GAME_WIDTH - GAME_HUD_TEXTS_OFFSET_X, GAME_HUD_TEXTS_Y);
		const counterPosition = new Point(textPosition.x - GAME_HUD_COUNTERS_OFFSET, textPosition.y + GAME_HUD_COUNTERS_OFFSET);
		const align = "right";
		
		this.#ui.drawText(GAME_LIVES_TEXT, textPosition, GAME_HUD_TEXTS_FILL_STYLE, align);
		this.#ui.drawText(this.#game.getGameManager().getPaddleLives(), counterPosition, GAME_HUD_COUNTERS_FILL_STYLE, align);
	}
}