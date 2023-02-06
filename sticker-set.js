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

const getRestaurantName = (rand, theme_keys, weird) => {

  const quick = (key, cap) => {
    return pickARandomThemeFromListAndGrabKey(rand, theme_keys, key, cap)
  };

  const firstName = ()=>rand.pickFrom(first_names);
  const lastName = ()=>rand.pickFrom(last_names);
  const goodwordsraw = `Happy
  Joy
  Blushing
  Party
  Fiesta
  Central
  Cozy
  Comfort
  Joyful
  Good
  Great
  Awesome
  Ultimate`;
  const goodwords = goodwordsraw.split("\n")

  const possibilities = [
    `${rand.pickFrom(['Mr','Miss','Mrs',"Mx","Master","Mistress","Lord","Lady"])}  ${quick(OBJECT, true)}`,
    `${rand.pickFrom(['Mr','Miss','Mrs',"Mx","Master","Mistress"])} ${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    ` ${quick(OBJECT, true)} ${rand.pickFrom(["Master","Mistress","Lord","Lady"])}`,

    `${quick(ADJ, true)} ${quick(OBJECT, true)}`,
    `${quick(ADJ, true)} ${quick(OBJECT, true)}`,

    `${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `${quick( PERSON, true)}'s ${quick(OBJECT, true)}`,
    `${quick( PERSON, true)}'s ${quick(OBJECT, true)}s`,
    `${quick( PERSON, true)}'s ${quick(OBJECT, true)}s`,

    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,
    `${quick( PERSON, true)}'s ${quick(LOCATION, true)}`,

    `${quick( ADJ, true)} ${quick(LOCATION, true)}`,
    `The ${quick( ADJ, true)} ${quick(LOCATION, true)}`,
    `The ${quick(COMPLIMENT, true)} ${quick(OBJECT, true)}`,
    `The ${rand.pickFrom(goodwords)} ${quick(OBJECT, true)}`,

    `${quick(ADJ, true)} ${quick( OBJECT, true)} ${quick(LOCATION, true)}`,
    `${quick(COMPLIMENT, true)} ${quick(OBJECT, true)} ${quick(LOCATION, true)}`,
    `${firstName()}'s ${quick( OBJECT, true)} ${quick(LOCATION, true)}`,
    `${firstName()}'s ${quick( OBJECT, true)}`,
    `${lastName()}'s ${quick( OBJECT, true)} ${quick(LOCATION, true)}`,
    `${lastName()}'s ${quick( OBJECT, true)}`,
    `${lastName()}'s`,

    `${lastName()}'s ${quick(COMPLIMENT, true)} ${quick( OBJECT, true)}`,
    `${firstName()}'s ${quick(COMPLIMENT, true)} ${quick( OBJECT, true)}`,
    `${lastName()}'s ${quick(ADJ, true)} ${quick( OBJECT, true)}`,
    `${firstName()}'s ${quick(ADJ, true)} ${quick( OBJECT, true)}`,

    `${quick(OBJECT, true)} ${quick(LOCATION, true)}`
  ];

  if (weird) {
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)}`,)
    possibilities.push(`${pickARandomThemeFromListAndGrabKey(rand, theme_keys, INSULT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, OBJECT, true)} ${pickARandomThemeFromListAndGrabKey(rand, theme_keys, LOCATION, true)}`,)
  }
  return rand.pickFrom(possibilities);
}

const randomStickerSet = (rand,writeOnScreen)=>{
  const chosenThemeKey = rand.pickFrom(keys);
  let food = food_keys.indexOf(chosenThemeKey) !== -1;
  const chosenTheme = all_themes[chosenThemeKey];

  let icon = chosenTheme.pickPossibilityFor(ICON, rand);
  let text = `<hr>
  
  <p>You got a ${icon} sticker set!</p>
  <p>It comes with a little text blurb. You take a little bit of time to look it over.</p>
 `;

  let templates  = [`It shows a room. ${(sentenceCase(chosenTheme.pickPossibilityFor(LOC_DESC, rand)))}.`,`It shows a monster. ${chosenTheme.pickPossibilityFor(MONSTER_DESC, rand)}`];


  if(food){
    let restaurantname = getRestaurantName(rand, [chosenThemeKey]);
    templates = [`It shows a take out bag from ${restaurantname}. Why don't you <a target="blank" href = "http://eyedolgames.com/Zampanini/?name=${encodeURIComponent(restaurantname)}&themes=${chosenThemeKey}&feeUnder=${getRandomNumberBetween(3,33)}">order</a> something yourself?`]
  }

  text += rand.pickFrom(templates);

  return new StickerSet(icon,chosenTheme,text,  writeOnScreen);

}