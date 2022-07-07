class YouWinText extends UIText
{
	constructor()
	{
		super(GAME_YOU_WIN_TEXT, GAME_YOU_WIN_TEXT_FILL_STYLE, "center");
		this.setPosition(this.#textPosition());
	}

	isVisible()
	{
		return GameInstance.getGameManager().wonTheGame();
	}

	#textPosition()
	{
		return new Point(GAME_WIDTH >> 1, (GAME_HEIGHT + GAME_HUD_HEIGHT) >> 1);
	}
}