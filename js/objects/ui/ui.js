class UI
{
	#context;
	#texts;
	#counters;

	constructor(context)
	{
		this.#init(context);
		this.#initTexts(context);
		this.#initCounters(context);
	}
	
	draw()
	{
		this.#texts.forEach(e => e.draw(this));
		this.#counters.forEach(e => e.draw(this));
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
		this.#counters = [];
	}

	#initTexts()
	{
		this.#texts.push(new GameOverText());
		this.#texts.push(new YouWinText());
		this.#texts.push(new RefreshTipText(this.#context));
	}

	#initCounters()
	{
		this.#counters.push(new ScoreCounter(this.#context));
		this.#counters.push(new LivesCounter(this.#context));
	}
}