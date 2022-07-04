class HUD
{
	#counters;

	constructor(context)
	{
		this.#init();
		this.#initCounters(context);
	}
	
	draw(ui)
	{
		this.#counters.forEach(e => e.draw(ui));
	}

	#init()
	{
		this.#counters = [];
	}

	#initCounters(context)
	{
		this.#counters.push(new ScoreCounter(context));
		this.#counters.push(new LivesCounter(context));
	}
}