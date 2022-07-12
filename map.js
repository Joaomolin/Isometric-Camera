export class Map {
    constructor(gridLastTile){
        this.floor = [];
        this.objects = [];

        this.createMap(gridLastTile);
    }


    createMap(gridLastTile){
        for (let y = 0; y < gridLastTile; y++){
            let arr = [];
            for (let x = 0; x < gridLastTile; x++){
                arr.push(0);
            }
            this.floor.push(arr);
        }
    }
}