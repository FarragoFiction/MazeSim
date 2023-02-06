
let parent;
let wanderer;
let maze_index = 0;
  window.onload = ()=>{
     parent = document.querySelector("#maze_container");
    renderOneMaze(maze_index++);
    renderOneMaze(maze_index++);
    wanderer = new Wanderer();
    let button = document.querySelector("#play-button");
    button.onclick = togglePlayPause;

    let select = document.querySelector("#traversal-mode");
    select.onchange = (e)=>{
      if(select.value.includes("Counter")){
        wanderer.traverses_mazes_clockwise = false;
        //removed because your job here isn't to PLAY this game. you have one choice. you're not supposed to go back and forth to direct the Wanderer.
        select.remove();
        let response = document.querySelector("#response");
        response.innerText = "Your answer deviates. But is noted.";
      }

    }
    wanderer.wander();
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



