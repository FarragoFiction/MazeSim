//you always either go right, or always go left
//can only be referred to in the second person
//star of both the gopher server and zampanio sim east (but not east east. that's peewee)
const DIRECTION_ENUM = {
  SOUTH: "SOUTH",
  EAST: "EAST",
  WEST: "WEST",
  NORTH: "NORTH"
}

const TRAVERSE_ENUM = {
  CLOCKWISE: "CLOCKWISE",
  COUNTERCLOCKWISE: "COUNTERCLOCKWISE",
  NEITHER: "NEITHER",
}
class Wanderer {

  src = "images/real_eye.png";
  //reference to jeffery's tapes
  traverses_mazes = TRAVERSE_ENUM.CLOCKWISE; //if you go clockwise always go LEFT, not right
  maze_number = 0;//which maze are you currently in
  x = 3;
  y = 3;
  element;
  last_direction = DIRECTION_ENUM.SOUTH;
  wandering = true;
  sticker_set_found;//if theres something here, we have to process it.

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

  pause = () => {
    this.wandering = false;
  }

  resume = () => {
    this.wandering = true;
    this.wander();
  }

  wander = async () => {
    if (this.traverses_mazes === TRAVERSE_ENUM.COUNTERCLOCKWISE && this.element.src) {
      let parent = this.element.parent;
      this.element.remove();
      this.element = document.createElement("div");
      this.element.className = "river";
    }
    if (this.wandering) {
      this.decideWhatDirectionToMove();
      let time = 50;
      if (this.sticker_set_found) {
        time = 1000 * 10;
        this.sticker_set_found.parentElement.className = "";//you don't have a sticker anymore
        this.sticker_set_found.click();
        this.sticker_set_found.remove();
        this.sticker_set_found = null;
      }

      setTimeout(() => window.requestAnimationFrame(this.wander), time);
    }
  }

  //x is the same, but y is different.
  goToNextMaze = () => {
    this.maze_number++;
    let maze = document.querySelector("#maze" + this.maze_number);
    //render not the maze we're going into, but the one after that
    renderOneMaze(maze_index++);
    this.y = 0;
    this.moveToSquare({ x: this.x, y: this.y, direction: DIRECTION_ENUM.SOUTH, square: this.getSquareAt(this.x, this.y) });
  }

  getSquareAt = (x, y) => {
    try {
      let maze = document.querySelector("#maze" + this.maze_number);
      let row = maze.children[y];
      let square = row.children[x];
      return square;
    } catch (e) {
      prettyPrint("You are at an edge of the Maze.");
      return null;
    }
  }

  decideWhatDirectionToMove = () => {

    if (!this.getSouthSquare().square) {
      this.goToNextMaze();
      return;
    }

    //relative to the wanderer. they are facing the direction they last moved in.
    let right;
    let forwards;
    let back;
    let left;



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



    if (this.traverses_mazes === TRAVERSE_ENUM.CLOCKWISE) {
      if (left_ele && !left_ele.className.includes("wall")) {
        this.moveToSquare(left);
      } else if (forwards_ele && !forwards_ele.className.includes("wall")) {
        this.moveToSquare(forwards);
      } else if (right_ele && !right_ele.className.includes("wall")) {
        this.moveToSquare(right);
      } else if (back_ele && !back_ele.className.includes("wall")) {
        this.moveToSquare(back);
      }
    } else if(this.traverses_mazes === TRAVERSE_ENUM.COUNTERCLOCKWISE) {

      if (right_ele && !right_ele.className.includes("wall")) {
        this.moveToSquare(right);
      } else if (forwards_ele && !forwards_ele.className.includes("wall")) {
        this.moveToSquare(forwards);
      } else if (left_ele && !left_ele.className.includes("wall")) {
        this.moveToSquare(left);
      } else if (back_ele && !back_ele.className.includes("wall")) {
        this.moveToSquare(back);
      }
    }else{
      window.alert("BULLET TIME BB");
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
    if (!movement_object.square) {
      prettyPrint("You have nowhere to move...")
      return;
    }
    this.last_direction = movement_object.direction;
    movement_object.square.append(this.element);
    this.x = movement_object.x;
    this.y = movement_object.y;
    // prettyPrint(`You move to ${this.x}, ${this.y} in maze ${this.maze_number}.`)
    // prettyPrint(`You move ${this.last_direction}` + this.last_direction == DIRECTION_ENUM.WEST ? "This feels...wrong. Somehow." : "");
    if (this.traverses_mazes === TRAVERSE_ENUM.COUNTERCLOCKWISE) {
      let debug_ele = document.createElement("div");
      debug_ele.className = "debug";
      movement_object.square.append(debug_ele);
    }
    let rect = this.element.getClientRects()[0];
    //window.scrollTo(rect.x, rect.y);
    this.element.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
    if (movement_object.square.className.includes("sticker")) {
      this.sticker_set_found = movement_object.square.children[0];
    }
  }
}