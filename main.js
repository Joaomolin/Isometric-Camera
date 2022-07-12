import { Isometric } from "./isometric.js";
import { DebugOptions } from "./debugOptions.js";
import { Cartesian } from "./cartesian.js";
import { Pos } from "./position.js";
import { Map } from "./map.js";
class Tile {
  constructor(img, imgX, imgY, imgW, imgH) {
    var tile = this;

    tile.img = img;

    tile.imgX = imgX;
    tile.imgY = imgY;
    tile.imgW = imgW;
    tile.imgH = imgH;
  }
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var cartCanvas = document.getElementById("cartesian");
var cartCtx = cartCanvas.getContext("2d");
var runCanvas = true;
const halfScreen = new Pos(canvas.width / 2, canvas.height / 2);
//Debug info
let infoArr = ["Debug =D"];
let tileTypes = [];
//
var interval = null;
//Grid tiles
const selectedTile = new Pos();
var gridFirstTile = 0;
var gridLastTile = 21;
//Mouse
const mouse = new Pos(halfScreen.x, halfScreen.y);

// isometric:
const isometric = new Isometric(mouse);
function IsoToScreenX(localX, localY) {
  return isometric.IsoToScreenX(localX, localY);
}
function IsoToScreenY(localX, localY) {
  return isometric.IsoToScreenY(localX, localY);
}
function ScreenToIsoX(globalX, globalY) {
  return isometric.ScreenToIsoX(globalX, globalY);
}
function ScreenToIsoY(globalX, globalY) {
  return isometric.ScreenToIsoY(globalX, globalY);
}

const map = new Map(gridLastTile);
const debugGrid = new DebugOptions(ctx, isometric);
//Cart
const cartesian = new Cartesian(selectedTile, isometric, cartCtx, map);

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  onUpdate();
  // printMouseTile();
  updateCamera(canvas);
  updateInfo();
  printInfo();
  cartesian.printMap(selectedTile.x, selectedTile.y);
  if (runCanvas){
    requestAnimationFrame(update);
  }
}
canvas.onmousemove = function (e) {
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
};
function printMouseTile() {
  printTile(selectedTile.x, selectedTile.y);
}
function printTile(x, y) {
  const tileX = IsoToScreenX(x - 1, y);
  const tileY = IsoToScreenY(x, y);
  let tile = tileTypes[1];
  ctx.globalAlpha = 1;
  ctx.drawImage(
    tile.img,
    tile.imgX,
    tile.imgY,
    tile.imgW,
    tile.imgH,
    tileX,
    tileY,
    isometric.IsoW * 2,
    isometric.IsoH * 4
  );
  tile = tileTypes[0];
  ctx.drawImage(
    tile.img,
    tile.imgX,
    tile.imgY,
    tile.imgW,
    tile.imgH,
    tileX,
    tileY,
    isometric.IsoW * 2,
    isometric.IsoH * 4
  );
}
function initTiles() {
  tileTypes.length = 0;
  var sheet = new Image();
  sheet.src = "../assets/FlatTiles.png";
  tileTypes.push(new Tile(sheet, 0, 0, 64, 64));

  var sheet2 = new Image();
  sheet2.src = "../assets/FlatTilesBig.png";
  tileTypes.push(new Tile(sheet2, 0, 0, 64, 64));
}
initTiles();

function updateCamera(canvas) {
  return isometric.updateCamera(canvas);
}
canvas.addEventListener('mousemove', function (e) {
  if (!runCanvas){
    runCanvas = true;
    update()
  }
});

canvas.addEventListener('mouseleave', function (e) {
  runCanvas = false;
});
function onUpdate() {

  var rx = Math.max(gridFirstTile, Math.min(ScreenToIsoX(mouse.x, mouse.y), gridLastTile));
  var ry = Math.max(gridFirstTile, Math.min(ScreenToIsoY(mouse.x, mouse.y), gridLastTile));
  const floorX = Math.min(Math.floor(rx), gridLastTile - 1);
  const floorY = Math.min(Math.floor(ry), gridLastTile - 1);

  selectedTile.x = floorX;
  selectedTile.y = floorY;


  debugGrid.printDebugGrid(rx, ry, gridFirstTile, gridLastTile, floorX, floorY);
  //Selected tile
  debugGrid.strokeSelectedTile(floorX, floorY);
  

}

function updateInfo(){
  infoArr.length = 0;
  infoArr.push(`Mouse: ${mouse.getInString()}`);
  infoArr.push(`Inside grid: ${selectedTile.getInString()}`);
  infoArr.push(`Cam: ${isometric.camera.getInString()}`);
}

function printInfo() {
  ctx.font = "15px sans-serif";
  ctx.textAlign = "left";
  ctx.fillStyle = "white";
  ctx.globalAlpha = 0.8;
  ctx.strokeRect(0, 0, 170, infoArr.length * 21);
  ctx.fillRect(0, 0, 170, infoArr.length * 21);
  ctx.fillStyle = "black";
  ctx.globalAlpha = 1;
  for (var i = 0; i < infoArr.length; i++)
    ctx.fillText(infoArr[i], 10, 15 + i * 20);
}

update();