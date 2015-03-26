var sceneManager;

function main()
{
	//change version number if you suspect a problem with caching
	console.log("sprint 4");
	sceneManager = new SceneManager();

	sceneManager.loadScene("menu","titleScreen");
	//game= new Game();

	//game.initCanvas();
	
	//ctx the drawing context, which lets you draw onto the canvas
	//Most people call it ctx for short	
	ctx.clearRect(0,0,canvas.width, canvas.height);

	//game.initWorld();		
		
	//start game loop
	sceneManager.gameLoop();
			
}

/*States
menu
gameplay
//Scenes
titleScreen
levelSelect
*/