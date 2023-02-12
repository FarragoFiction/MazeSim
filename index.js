
let parent;
let wanderer;
let maze_index = 0;
let seeded_random;
let story_container;
window.onload = () => {

  initThemes();
  seeded_random = new SeededRandom(13);
  parent = document.querySelector("#maze_container");
  story_container = document.querySelector("#story_container");
  if (checkForRiver()) {
    return;
  }
  renderOneMaze(maze_index++);
  renderOneMaze(maze_index++);
  wanderer = new Wanderer();
  let button = document.querySelector("#play-button");
  button.onclick = togglePlayPause;

  let select = document.querySelector("#traversal-mode");
  select.onchange = (e) => {
    wanderer.traverses_mazes = select.value;
    //removed because your job here isn't to PLAY this game. you have one choice. you're not supposed to go back and forth to direct the Wanderer.
    select.remove();
    let response = document.querySelector("#response");

    if (select.value === TRAVERSE_ENUM.CLOCKWISE) {
      response.innerText = "Not all who wander are lost. To be lost you have to care what you're going. The Wanderer only cares that there is more to see. You have long since forgotten what it is you were looking for. This is always who you were. Nothing has changed, yet a process has occured. ";
    } else if (select.value === TRAVERSE_ENUM.COUNTERCLOCKWISE) {
      let parent = wanderer.element.parent;
      wanderer.element.remove();
      wanderer.element = document.createElement("div");
      wanderer.element.className = "river";
      response.innerText = "River is new and old and big and small. The slime of her body is confined to such a small space, just a handful of years, barely anything in the face of all of time and space. It chafes her, to be so restricted. She is doing her best. It's hard to care when everything is so big and small and nothing at all...";
    } else {
      response.innerText = "What are you doing here, Thief?";
      wanderer.element.src = "images/bullet.png";
    }


  }
  wanderer.wander();
}

const checkForRiver = () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let debug = urlParams.get('debug_rivers_vastness');
  if (debug) {
    for (let h of rivers_collection) {
      let ele = renderOneRiverCollection(h);
      parent.append(ele);//normally they'd get a popup class but this is so we can see all of rivers vast bulk at once
    }
  }

  return debug;
}

//something else will pop this up.
const renderOneRiverCollection = ({ title, url, desc, end }) => {
  if (end) {
    let ele = document.createElement("div")
    ele.className = "rivers-collection";
    ele.innerHTML = "theres so much in my head but i can't make it fit on paper, can't make my thoughts flow freely, sluggish like slime like muck like the drip of so much time that goes nowhere, stuck in a space much too small for it, i need to go back to leehunter, need to get more music so i can think right again"
    return ele;
  }
  let ele = document.createElement("div")
  ele.className = "rivers-collection";

  let imgEle = createElementWithClassAndParent("img", ele, "river-img");
  imgEle.src = "RiversCollection/" + url;

  let titleEle = createElementWithClassAndParent("div", ele, "river-title");
  titleEle.innerHTML = title ? title : url;
  let descEle = createElementWithClassAndParent("p", ele, "river-desc");
  descEle.innerHTML = desc ? desc : "pending...";
  return ele;
}



const writeOnScreen = (text) => {
  console.log("JR NOTE: write on screen")

  if (wanderer.traverses_mazes === TRAVERSE_ENUM.CLOCKWISE) {
    let ele = createElementWithClassAndParent("div", story_container, "story");
    ele.innerHTML = text;
    story_container.scrollBy({ top: 1000 });
  } else if (wanderer.traverses_mazes === TRAVERSE_ENUM.COUNTERCLOCKWISE) {
    console.log("JR NOTE: its river")

    let popup = document.querySelector("#popup-container");
    let ele = renderOneRiverCollection(rivers_collection.length > 0 ? rivers_collection.pop() : { end: true }); //exactly one at a time, in a set order.
    console.log("JR NOTE: got ele")

    popup.innerHTML = "";//clear out past
    popup.append(ele);
    popup.style.display = "block";
    wanderer.pause();
    const handlePostPopupClick = (e) => {
      if(e){
        console.log("JR NOTE: don't transfer the click down")
        e.stopPropagation() //if popup is open stop paying attention to things like button clicks
      }
      console.log("JR NOTE: we handled a click. ")
      ele.remove();
      popup.style.display = "none";
      wanderer.resume();
      window.removeEventListener("click", handlePostPopupClick);
      let button = createElementWithClassAndParent("button", story_container, "story-button");
      button.innerHTML = `River's Collection ${rivers_collection.length}`;
      story_container.scrollBy({ top: 1000 });


      button.onclick = () => {//sure why not fracted nested popup click events
        wanderer.pause();
        popup.innerHTML = "";
        popup.append(ele);
        popup.style.display = "block";
        const fractalNestedInnerPopupClcick = ()=>{
          wanderer.resume();
          ele.remove();
          window.removeEventListener("click", fractalNestedInnerPopupClcick);
          popup.style.display = "none";
        }

        setTimeout(() => {
          //if we go right away we'll handle THIS click which would be bad
          window.addEventListener('click', fractalNestedInnerPopupClcick);
        }, 100);
      }



    }
    setTimeout(() => {
      //if we go right away we'll handle THIS click which would be bad
      window.addEventListener('click', handlePostPopupClick);
    }, 100);

    setTimeout(() => {
      //in addition to click, clear yourself out after ten seconds so it still works in zero player mode
      if(popup.style.display === "block"){
        handlePostPopupClick();
      }
    }, 1000*10);




  } else {
    window.alert("THIEF. STOP THAT.")
  }
}

const syncButtonToWanderer = ()=>{
  const button = document.querySelector("#play-button")
  if(wanderer.wandering){
    button.innerText = "Pause";
  }else{
    button.innerText = "Play";
  }
}

const togglePlayPause = (e) => {
  let button = e.target;
  console.log(button);
  if (wanderer.wandering) {
    wanderer.pause();
  } else {
    wanderer.resume();
  }
  syncButtonToWanderer();
}

const renderOneMaze = (first = false) => {
  const ele = createElementWithClassAndParent("div", parent, "jr-maze")
  let Maze = new MazeBuilder(30, 20, first);
  Maze.display(ele);
}



