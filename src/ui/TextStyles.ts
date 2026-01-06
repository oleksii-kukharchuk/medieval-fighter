import * as PIXI from "pixi.js";

export const DefaultTextStyle = new PIXI.TextStyle({
  fontFamily: "MedievalSharp",
  fill: 0xffffff,
  fontSize: 30,
});

export const TitleTextStyle = DefaultTextStyle.clone();
TitleTextStyle.fontSize = 48;
TitleTextStyle.fill = 0xefbf04;
