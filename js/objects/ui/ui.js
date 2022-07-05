class UI
{
	#context;
	#texts;
	#hud;

	constructor(context)
	{
		this.#init(context);
		this.#initTexts(context);
	}
	
	draw()
	{
		this.#hud.draw(this);
		this.#texts.forEach(e => e.draw(this));
	}

	drawText(text, position, fillStyle, textAlign)
	{
		this.#context.fillStyle = fillStyle;
		this.#context.textAlign = textAlign;

		this.#context.fillText(text, position.x, position.y);
	}

	#init(context)
	{
		this.#context = context;
		this.#texts = [];
		this.#hud = new HUD(this.#context);
	}

	#initTexts(context)
	{
		this.#texts.push(new GameOverText());
		this.#texts.push(new YouWinText());
		this.#texts.push(new RefreshTipText(context));
	}
}