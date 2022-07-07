class GameOverText extends UIText
{
	constructor()
	{
		super(GAME_GAME_OVER_TEXT, GAME_GAME_OVER_FILL_STYLE, "center");
		this.setPosition(this.#textPosition());
	}

	isVisible()
	{
		return GameInstance.getGameManager().lostTheGame();
	}

	#textPosition()
	{
		return new Point(GAME_WIDTH >> 1, (GAME_HEIGHT + GAME_HUD_HEIGHT) >> 1);
	}
}