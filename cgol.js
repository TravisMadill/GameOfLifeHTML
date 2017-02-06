
var pixels = [];
var fieldWidth = 300;
var fieldHeight = 250;
var pixelSize = 3;
var curFrame;

var pixelField = {
	canvas : document.createElement("canvas"),
	frameCounter : document.createElement("p"),
	start : function(){
		this.canvas.width = fieldWidth*pixelSize;
		this.canvas.height = fieldHeight*pixelSize;
		this.context = this.canvas.getContext("2d");
		document.body.insertBefore(this.frameCounter, document.body.childNodes[0]);
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.interval = setInterval(updatePopulation, 20);
	},
	clear : function(){
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}

function initGrid() {
	curFrame = 0;

	pixels = new Array(fieldWidth);
	for(var i = 0; i < fieldWidth; i++){
		pixels[i] = new Array(fieldHeight)
		for(var j = 0; j < fieldHeight; j++){
			if(Math.random() > 0.95)
				pixels[i][j] = 1;
			else pixels[i][j] = 0;
		}
	}

	//10 row line
	// pixels[101][101] = 1;
	// pixels[102][101] = 1;
	// pixels[103][101] = 1;
	// pixels[104][101] = 1;
	// pixels[105][101] = 1;
	// pixels[106][101] = 1;
	// pixels[107][101] = 1;
	// pixels[108][101] = 1;
	// pixels[109][101] = 1;
	// pixels[110][101] = 1;
	pixelField.start();
}

function getNeighbours(x, y){
	var totalLiveNeighbours = 0;
	for(var i = Math.max(0, x-1); i <= Math.min(x+1, fieldWidth - 1); i++){
		for(var j = Math.max(0, y-1); j <= Math.min(y+1, fieldHeight - 1); j++){
			if(x != i || y != j){
				if(pixels[i][j] == 1){
					totalLiveNeighbours++;
				}
			}
		}
	}
	// if(x == 100 && y == 101)
	// 	console.log("Neighbours: " + totalLiveNeighbours);
	return totalLiveNeighbours;
}

function updatePopulation(){
	pixelField.clear();
	ctx = pixelField.context;
	var newPixels = JSON.parse(JSON.stringify(pixels));
	for(var x = 0; x < fieldWidth; x++){
		for(var y = 0; y < fieldHeight; y++){
			if(pixels[x][y] == 1){
				ctx.fillStyle = "red";
				ctx.fillRect(x*pixelSize, y*pixelSize, pixelSize, pixelSize);
			}

			var living = getNeighbours(x, y);
			if(living == 0 || living == 1){
				if(pixels[x][y] == 1)
					newPixels[x][y] = 0;
			} else if(living == 2 || living == 3){
				if(pixels[x][y] == 0 && living == 3)
					newPixels[x][y] = 1;
				else newPixels[x][y] = pixels[x][y];
			} else if(living <= 4){
				if(pixels[x][y] == 1)
					newPixels[x][y] = 0;
			}
		}
	}

	pixels = JSON.parse(JSON.stringify(newPixels));
	pixelField.frameCounter.innerHTML = "Frame " + curFrame;
	curFrame++;
}