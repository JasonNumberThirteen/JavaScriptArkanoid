const GAME_WIDTH = 256;
const GAME_HEIGHT = 144;
const GAME_BG_FILL_STYLE = "#cccccc";

const GAME_PADDLE_WIDTH = 32;
const GAME_PADDLE_HEIGHT = 4;
const GAME_PADDLE_OFFSET_FROM_BOTTOM = 8;
const GAME_PADDLE_MOVEMENT_SPEED = 3;
const GAME_PADDLE_FILL_STYLE = "#222222";
const GAME_PADDLE_LIVES = 3;
const GAME_PADDLE_LEFT_MOVEMENT_A = 'a';
const GAME_PADDLE_LEFT_MOVEMENT_B = "ArrowLeft";
const GAME_PADDLE_RIGHT_MOVEMENT_A = 'd';
const GAME_PADDLE_RIGHT_MOVEMENT_B = "ArrowRight";

const GAME_BALL_RADIUS = 4;
const GAME_BALL_OFFSET_FROM_PADDLE = 16;
const GAME_BALL_INITIAL_MOVEMENT_DIRECTION_Y = -1;
const GAME_BALL_WAIT_TIME_IN_MS = 1000;
const GAME_BALL_MOVEMENT_SPEED = 1.5;
const GAME_BALL_MOVEMENT_SPEED_GROWTH_PER_PADDLE_DEFLECT = 0.1;
const GAME_BALL_FILL_STYLE = "#42f2f2";
const GAME_BALL_STROKE_FILL_STYLE = "#000";

const GAME_HUD_HEIGHT = 28;

const GAME_YOU_WIN_TEXT = "YOU WIN!!!";
const GAME_YOU_WIN_TEXT_FILL_STYLE = "#4a8";

const GAME_GAME_OVER_TEXT = "GAME OVER";
const GAME_GAME_OVER_FILL_STYLE = "#f00";

const GAME_REFRESH_KEY = 'r';
const GAME_REFRESH_TIP_TEXT = "Press 'R' to restart the game";
const GAME_REFRESH_TIP_FILL_STYLE = "#000";

const GAME_BRICK_WIDTH = 16;
const GAME_BRICK_HEIGHT = 4;
const GAME_BRICKS = [
	{fillStyle: "#f57542", health: 5, points: 250},
	{fillStyle: "#f5d142", health: 4, points: 150},
	{fillStyle: "#d4f542", health: 3, points: 75},
	{fillStyle: "#42f548", health: 2, points: 25},
	{fillStyle: "#46f", health: 1, points: 10}
];