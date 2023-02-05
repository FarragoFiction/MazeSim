//you always either go right, or always go left
//can only be referred to in the second person
//star of both the gopher server and zampanio sim east (but not east east. that's peewee)
const DIRECTION_ENUM = {
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST",
  NORTH: "NORTH"
}
class Wanderer {

  src = "images/real_eye.png";
  //reference to jeffery's tapes
  transverses_mazes_clockwise = true; //if you go clockwise always go LEFT, not right
  maze_number = 0;//which maze are you currently in
  x = 3;
  y = 3;
  element;
  last_direction = DIRECTION_ENUM.SOUTH;

  constructor() {
    prettyPrint("You are in a maze.")
    this.element = document.createElement("img");
    this.element.src = this.src;
    this.element.className = "wanderer";
    this.spawnAtDoor();
  }

  spawnAtDoor = () => {
    prettyPrint("You must not have always been in this maze. There is a door behind you, after all.")
    prettyPrint("It does not open, no matter how hard you try. It seems as though the only way out is forward.")

    let door = document.querySelector(".door");
    //shitty parsing for location so you know where you are
    let tmp = door.classList.value;
    let coords = tmp.replaceAll(")", "").split("(")[1].split(",");
    this.x = parseInt(coords[0]);
    this.y = parseInt(coords[1]);
    door.append(this.element);
    prettyPrint("You decide to call the direction away from the door 'south'.")
    prettyPrint("Not for any reason in particular. It does help you feel less lost, though...")

    prettyPrint("You need all the help you can get.");
    prettyPrint("The carpet on the floor and the wallpaper bleed into each other in a sea of beige yellow.")

  }

  getSquareAt = (x, y) => {
    try {
      let maze = document.querySelector("#maze" + this.maze_number);
      console.log("JR NOE: maze was", maze, x, y)
      let row = maze.children[y];
      let square = row.children[x];
      return square;
    } catch (e) {
      prettyPrint("You are at an edge of the Maze.");
      return null;
    }
  }

  decideWhatDirectionToMove = () => {
    //relative to the wanderer. they are facing the direction they last moved in.
    let right;
    let forwards;
    let back;
    let left;
    console.log("JR NOTE: last direction was ", this.last_direction)

    //figure out what all the relative directions are
    if (this.last_direction == DIRECTION_ENUM.SOUTH) {
      right = this.getWestSquare();
      left = this.getEastSquare();
      forwards = this.getSouthSquare();
      back = this.getNorthSquare();
    } else if (this.last_direction == DIRECTION_ENUM.NORTH) {
      right = this.getEastSquare();
      left = this.getWestSquare();
      forwards = this.getNorthSquare();
      back = this.getSouthSquare();
    } else if (this.last_direction == DIRECTION_ENUM.EAST) {
      right = this.getSouthSquare();
      left = this.getNorthSquare();
      forwards = this.getEastSquare();
      back = this.getWestSquare();
    } else if (this.last_direction == DIRECTION_ENUM.WEST) {
      right = this.getNorthSquare();
      left = this.getSouthSquare();
      forwards = this.getWestSquare();
      back = this.getEastSquare();
    }
    //handle actually moving 

    //if we transverse mazes clockwise, always pick your left if possible. forwards if not, backwards if not, right as last resort;
    //if you don't transverse mazes clockwise, same thing, but swap left and right
    let left_ele = left.square;
    let right_ele = right.square;
    let forwards_ele = forwards.square;
    let back_ele = back.square;

    if (this.transverses_mazes_clockwise) {
      console.log("JR NOTE: you transverse mazes clockwise")
      if (left_ele && !left_ele.className.includes("wall")) {
        console.log("JR NOTE: going left")
        this.moveToSquare(left);
      } else if (forwards_ele && !forwards_ele.className.includes("wall")) {
        console.log("JR NOTE: going forards")
        this.moveToSquare(forwards);
      } else if (right_ele && !right_ele.className.includes("wall")) {
        console.log("JR NOTE: going right")
        this.moveToSquare(right);
      } else if (back_ele && !back_ele.className.includes("wall")) {
        console.log("JR NOTE: going back")
        this.moveToSquare(back);

      }
    } else {
      console.log("JR NOTE: you do NOT transverse mazes clockwise")

      if (right_ele && !right_ele.className.includes("wall")) {
        this.moveToSquare(left);
      } else if (forwards_ele && !forwards_ele.className.includes("wall")) {
        this.moveToSquare(forwards);
      } else if (left_ele && !left_ele.className.includes("wall")) {
        this.moveToSquare(right);
      } else if (back_ele && !back_ele.className.includes("wall")) {
        this.moveToSquare(back);
      }
    }
  }




  goNorth = () => {
    this.moveToSquare(this.getNorthSquare());
  }

  getNorthSquare = () => {
    let x = this.x;
    let y = this.y - 1;
    return { x, y, direction: DIRECTION_ENUM.NORTH, square: this.getSquareAt(x, y) };
  }

  goSouth = () => {
    this.moveToSquare(this.getSouthSquare());
  }

  getSouthSquare = () => {
    let x = this.x;
    let y = this.y + 1;
    return { x, y, direction: DIRECTION_ENUM.SOUTH, square: this.getSquareAt(x, y) };
  }

  //it feels so wrong to let you do this
  //i might just disable it if it turns out you can solve the maze without it
  //no then you'd get stuck in right hand dead ends. 
  //terrible. disgusting.
  //the things i do for art.

  goWest = () => {
    this.moveToSquare(this.getWestSquare());
  }

  getWestSquare = () => {
    let x = this.x - 1;
    let y = this.y;
    return { x, y, direction: DIRECTION_ENUM.WEST, square: this.getSquareAt(x, y) };
  }


  goEast = () => {
    this.moveToSquare(this.getEastSquare());
  }
  getEastSquare = () => {
    let x = this.x + 1;
    let y = this.y;
    return { x, y, direction: DIRECTION_ENUM.EAST, square: this.getSquareAt(x, y) };
  }

  //movement_object has direction and square and x and y
  moveToSquare = (movement_object) => {
    if(!movement_object.square){
      prettyPrint("You have nowhere to move...")
      return;
    }
    this.last_direction = movement_object.direction;
    movement_object.square.append(this.element);
    this.x = movement_object.x;
    this.y = movement_object.y;
    prettyPrint(`You move to ${this.x}, ${this.y} in maze ${this.maze_number}.`)
    prettyPrint(`You move ${this.last_direction}` + this.last_direction == DIRECTION_ENUM.WEST ? "This feels...wrong. Somehow." : "");
    let debug_ele = document.createElement("div");
    debug_ele.className = "debug";
    movement_object.square.append(debug_ele);
  }
}