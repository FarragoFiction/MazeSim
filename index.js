
let parent;
let wanderer;
let maze_index = 0;
let seeded_random;
let story_container; 
  window.onload = ()=>{
    initThemes();
    seeded_random = new SeededRandom(13);
     parent = document.querySelector("#maze_container");
     story_container = document.querySelector("#story_container");

    renderOneMaze(maze_index++);
    renderOneMaze(maze_index++);
    wanderer = new Wanderer();
    let button = document.querySelector("#play-button");
    button.onclick = togglePlayPause;

    let select = document.querySelector("#traversal-mode");
    select.onchange = (e)=>{
        wanderer.traverses_mazes = select.value;
        //removed because your job here isn't to PLAY this game. you have one choice. you're not supposed to go back and forth to direct the Wanderer.
        select.remove();
        let response = document.querySelector("#response");

        if(select.value=== TRAVERSE_ENUM.CLOCKWISE){
          response.innerText = "Not all who wander are lost. To be lost you have to care what you're going. The Wanderer only cares that there is more to see. You have long since forgotten what it is you were looking for. ";
        }else if(select.value=== TRAVERSE_ENUM.COUNTERCLOCKWISE){
            let parent = wanderer.element.parent;
            wanderer.element.remove();
            wanderer.element = document.createElement("div");
            wanderer.element.className = "river";
          response.innerText = "River is new and old and big and small. The slime of her body is confined to such a small space, just a handful of years, barely anything in the face of all of time and space. It chafes her, to be so restricted. She is doing her best. It's hard to care when everything is so big and small and nothing at all...";
        }else{
          response.innerText = "What are you doing here, Thief?";
          wanderer.element.src="images/bullet.png";
        }


    }
    wanderer.wander();
  }

  const writeOnScreen = (text)=>{
    let ele = createElementWithClassAndParent("div",story_container, "story");
    ele.innerHTML = text;
    story_container.scrollBy({top: 1000});
  }

  const togglePlayPause = (e)=>{
    let button =e.target;
    console.log(button);
    if(button.innerText === "Pause"){
      button.innerText = "Play";
      wanderer.pause();
    }else{
      button.innerText = "Pause";
      wanderer.resume();
    }
  }

  const renderOneMaze = (first=false)=>{
    const ele = createElementWithClassAndParent("div",parent,"jr-maze")
    let Maze = new MazeBuilder(30, 20,first);
    Maze.display(ele);
  }



