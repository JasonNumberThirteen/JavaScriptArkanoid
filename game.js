function initGame()
{
	const canvas = document.getElementById("gameWindow");
	const context = canvas.getContext("2d");

	context.fillStyle = "#cccccc";
	context.fillRect(0, 0, 256, 144);
}