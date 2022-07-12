import { Pos } from "./position.js";
import Config from "./isometricConfig.json" assert { type: "json" };

export class Isometric {
    constructor(mouse){
        this.camera = new Pos();
        this.mouse = mouse;
        this.IsoW = Config.cellWidth; // cell width
        this.IsoH = Config.cellHeight; // cell height
        this.IsoX = 400;
        this.IsoY = 200;
    }


    updateCamera(canvas){
        const step = 4;
        //Right
        if (this.mouse.x > canvas.width - (canvas.width / 8)){
            this.camera.x -= step;
        }
        //Left
        if (this.mouse.x < canvas.width / 8){
            this.camera.x += step;
        }
        //Up
        if (this.mouse.y < canvas.height / 4){
            this.camera.y += step;
        }
        //Down
        if (this.mouse.y > canvas.height - (canvas.height / 4)){
            this.camera.y -= step;
        }

        
    }

    IsoToScreenX(localX, localY) {
        return this.IsoX + (localX - localY) * this.IsoW + this.camera.x;
    }
    IsoToScreenY(localX, localY) {
        return this.IsoY + (localX + localY) * this.IsoH + this.camera.y;
    }
    ScreenToIsoX(globalX, globalY) {
        let res = ((globalX - this.IsoX) / this.IsoW + (globalY - this.IsoY) / this.IsoH) / 2;
        res += (-this.camera.x / (this.IsoW * 2))
        res += (-this.camera.y / (this.IsoH * 2))
        return res;
    }
    ScreenToIsoY(globalX, globalY) {
        let res = ((globalY - this.IsoY) / this.IsoH - (globalX - this.IsoX) / this.IsoW) / 2;
        res += (this.camera.x / (this.IsoW * 2))
        res += (-this.camera.y / (this.IsoH * 2))
        return res;
    }
}