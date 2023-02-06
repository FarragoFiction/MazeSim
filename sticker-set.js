class StickerSet {
  icon;
  theme;
  text;
  element;
  writeOnScreen;

  constructor(icon,theme,text,writeOnScreen){
    this.icon = icon;
    this.theme = theme;
    this.text = text;
    this.element = document.createElement("div");
    this.element.className=this.theme.key;
    //can i do this? its weird how much of the data is in the dom.
    this.element.onclick = ()=>{
      (writeOnScreen(this.text));
    }
    this.element.innerText = this.icon;

  }

  attachToElement = (ele)=>{
    ele.append(this.element);
  }
}


//im lazy, things are just referring to this outta their files
const spawnStickersInMaze = (maze_element)=>{
  let stickers = maze_element.querySelectorAll(".sticker");
  for(let sticker of stickers){
    const obj = randomStickerSet(seeded_random,writeOnScreen);
    obj.attachToElement(sticker);
  }
}

const randomStickerSet = (rand,writeOnScreen)=>{
  let text = "placeholder";
  const chosenThemeKey = rand.pickFrom(keys);
  console.log("JR NOTE: ",{chosenThemeKey})
  const chosenTheme = all_themes[chosenThemeKey];
  console.log("JR NOTE: ",{chosenTheme})

  let icon = chosenTheme.pickPossibilityFor(ICON, rand);
  return new StickerSet(icon,chosenTheme,text,  writeOnScreen);

}