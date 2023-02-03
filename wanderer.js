//you always either go right, or always go left
//can only be referred to in the second person
//star of both the gopher server and zampanio sim east (but not east east. that's peewee)
class Wanderer {
  
  src = "images/real_eye.png";
  //reference to jeffery's tapes
  transverses_mazes_clockwise = true;
  maze_id = 0;//which maze are you currently in
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
    door.append(this.element);
    prettyPrint("You decide to call the direction away from the door 'south'.")
    prettyPrint("Not for any reason in particular. It does help you feel less lost, though...")

    prettyPrint("You need all the help you can get.");
    prettyPrint("The carpet on the floor and the wallpaper bleed into each other in a sea of beige yellow.")

  }

  attachToDomElementWithCoordinates =(maze_id, x,y)=>{

  }
}