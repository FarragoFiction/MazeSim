//you always either go right, or always go left
//can only be referred to in the second person
//star of both the gopher server and zampanio sim east (but not east east. that's peewee)
class Wanderer {
  
  src = "images/real_eye.png";
  //reference to jeffery's tapes
  transverses_mazes_clockwise = true;
  maze_number = 0;//which maze are you currently in
  x = 3; 
  y = 3;
  element;

  constructor() {
    prettyPrint("You are in a maze.")
    this.element = document.createElement("img");
    this.element.src = this.src;
    this.element.className = "wanderer";
    this.spawnAtDoor();
  }

  spawnAtDoor = ()=>{
    prettyPrint("You must not have always been in this maze. There is a door behind you, after all.")
    prettyPrint("It does not open, no matter how hard you try. It seems as though the only way out is forward.")

    let door = document.querySelector(".door");
    //shitty parsing for location so you know where you are
    let tmp = door.classList.value;
    let coords = tmp.replaceAll(")","").split("(")[1].split(",");
    this.x = parseInt(coords[0]);
    this.y = parseInt(coords[1]);
    door.append(this.element);
    prettyPrint("You decide to call the direction away from the door 'south'.")
    prettyPrint("Not for any reason in particular. It does help you feel less lost, though...")

    prettyPrint("You need all the help you can get.");
    prettyPrint("The carpet on the floor and the wallpaper bleed into each other in a sea of beige yellow.")

  }

  goNorth = ()=>{
    this.attachToDomElementWithCoordinates(this.x, this.y-1)
  }

  goSouth = ()=>{
    this.attachToDomElementWithCoordinates(this.x, this.y+1)

  }

  //it feels so wrong to let you do this
  //i might just disable it if it turns out you can solve the maze without it
  //no then you'd get stuck in right hand dead ends. 
  //terrible. disgusting.
  //the things i do for art.
  goWest = ()=>{
    this. attachToDomElementWithCoordinates(this.x+1, this.y)
    prettyPrint("This feels...wrong. Somehow.");

  }


  goEast = ()=>{
    this.attachToDomElementWithCoordinates(this.x+1, this.y)
  }

  attachToDomElementWithCoordinates =(x,y)=>{
      let maze = document.querySelector("#maze"+this.maze_number);
      console.log("JR NOE: maze was",maze,x,y)
      let row = maze.children[y];
      let square = row.children[x];
      square.append(this.element);
      this.x = x;
      this.y = y;
      prettyPrint(`You move to ${this.x}, ${this.y} in maze ${this.maze_number}.`)
      console.log("JR NOTE: ",square.children)

  }
}