export class Cartesian{
    constructor(selectedTile, isometric, cartCtx, map){
        this.ctx = cartCtx;
        this.selectedTile = selectedTile;
        this.isometric = isometric;
        this.map = map;
        this.tileSize = 79;
    }

    printMap(a, b){
		this.ctx.strokeStyle = '#888';
        this.ctx.clearRect(0, 0, 1000, 1000);
        this.ctx.lineWidth = 3;
        for (let y = 0; y < 5; y++){
            for (let x = 0; x < 5; x++){
                const xCoord = a + (x - 2);
                const yCoord = b + (y - 2);
                // console.log(this.map.floor[0].length)
                if (xCoord >= 0 && yCoord >= 0 && xCoord < this.map.floor[y].length && yCoord < this.map.floor.length){
                    this.ctx.strokeRect(x * this.tileSize + 2, y * this.tileSize + 3, this.tileSize, this.tileSize);
                    this.ctx.fillText(`${xCoord}, ${yCoord}`,10 + (x * this.tileSize),this.tileSize + (y * this.tileSize), this.tileSize, this.tileSize);    
                }
            }
        }

		this.ctx.strokeStyle = 'black';
        this.ctx.strokeRect(2 * this.tileSize + 2, 2 * this.tileSize + 3, this.tileSize, this.tileSize);
    }


}