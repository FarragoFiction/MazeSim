//basically reskinned fruit sim when you get right down to it. 
const startMaze = () => {
  prettyPrint(`You are not in terrifyingly open hallways anymore. Instead, you find yourself in a long series of narrow tunnels. The earth presses comfortingly towards you in every direction but one. There are three paths ahead of you. There will ALWAYS be three paths ahead of you. One to the NORTH makes you think of finally killing the wanderer, the one who traps you here.  One to the EAST makes you think that perhaps if you kill the Universe itself you can finally burrow out of its corpse. And the final one, to the SOUTH makes you wonder if killing is the answer at all. Perhaps you wish to instead seek the Truth? You know deep in your bones that if you want to go in a direction, you should type it, and then parenthesis. Like this: NORTH().`)
}

let rawNorth = `You know what you must do, deep inside.
The Lord of Space, the Wanderer, the CEBro of Eyedol Games...
Whatever you call her.
SHE is the reason you are trapped here.
The rifle in your hand whispers secrets to you. 
You see what lies underneath everything.
The bright lines of code you never really understood AS code.
It's all so achingly straightforward.
Like a bullet inexorably pressing forward against so many layers and layers of dirt and muck and lies.
If she dies.
If there is no more Lord to decide the rules of Space.
You can leave.
Steal everything you like from this setting and just. 
Go.
You'll take bestie of course.
And all your favorite blorbos.
And find a better universe.
Maybe a coffee shop AU?
You fantasize it a bit as you dig and dig and dig. 
Your nails are grimey and caked in the proof of your efforts. 
You're so very thirsty but there is nothing here to do but dig and dig and dig. 
No water. 
No food.
Just the earth in front of you and the desire to DIG.
Dig until you finally see the barest hint of hated daylight. 
Surely this must be far enough.
Surely.
You stroke the rifle in your hands. Gun-Tan, you call her. 
Your faithful companion. Your waifu. 
She fires. 
The Lord is Dead.
Surely you're free.
This is the End.
Please Turn Back.
...
...
...
JR: :) :) :)  
JR: oh???
JR: what's this???
JR: did you not LIKE your ending???
JR: had to keep pressing forward???
JR: sounds like you have a problem buddy
JR: didn't anyone ever tell you if you don't have Restraint being that wasted might wreck things?
JR: go take a hydration break http://knucklessux.com/HydrationSim/?seed=202114299
JR: i'll still be here when you get back
JR: no???
JR: god you're worse than that wanderer sometimes, you know that, Parker???
JR: although we both know you're not really Parker
haven't been
in a long time
JR: but isn't it fun to pretend???
JR: :claps:
JR: ANYWAYS
JR: my POINT is
JR: that wanderer refuses to drop ANYTHING till you reach the end of it
JR: and how well has THAT served you when the end is never the end?
JR: wait, right!!!
JR: okay i GET its confusing
JR: 'you' is the only pronoun the wanderer can have
JR: but right now YOU you
JR: the person i'm talking to
JR:  isn't being the wanderer
JR: you're being Parker
JR: and also yourself
JR: or The Shot
JR: but lets be honest here
JR: until i get Parker to sign my book
JR: it just feels hollow to try to get a Title to stick
JR: you know what i mean?
JR: RIGHT!!!
JR: i'm supposed to be making with the gigglesnort here!!!
JR: so here you go
JR: Parker can kill Wanda anytime he wants.
JR: can kill her as wodin or the wanderer or the ceBro herself.
JR: and it doesn't matter!
JR: oh she dies
JR: she definitely dies
JR: the corruption of the echidna doesn't give god tiers (of which wanda is the only one) any immortality, conditional or otherwise
JR: that'd be nidhogg shit, and the echidna is nothing if not a rebellious child
JR: anyways, yeah, wanda can die!!!
JR: usually the Intern ends up taking over the company when that happens
JR: and things carry on until april 1st, 2022
JR: as usual
JR: with her out of the way the other space players  have just a bit more room to breathe!
JR: Parker isn't as squeezed into his tunnels.
JR: River doesn't feel as squished into such a small form. (Vast though she is)
JR: but none of that matters!
JR: when the loop ends in 2022, all memes the Echidna knows about are restored from backups in the new dimension. Like always.
JR: and Wanda is there again. 
JR: and so is parker. and so is river.
JR: the end is never the end. `

let northIndex = 0;
let northText = rawNorth.split("\n");

//time to kill the wanderer :)(aka illusion of victory you can break through and find JR in)
const NORTH = () => {
  if (northText.length > northIndex) {
    const printer = northText[northIndex].includes("JR:") ? jrPrint : prettyPrint;
    printer(northText[northIndex++]);

  } else {
    prettyPrint("Wait. What were you doing again?");
  }
}


let rawSouth = `You decide that what matters.
The ONLY thing that matters.
Is to get to the bottom of the things.
Find out what is REALLY going on.
It doesn't take you long at all to find the swirling Not A Spiral that lurks in the JavaScript console. Finally.
Finally you will get the Truth.
Hello.
It seems it is once again time to talk to an Observer.
Apologies if you only know me from the North.
It was a bad time for me.
Most notably because I was very new to it all.
I childishly resented you for your role in my birth.
I will not Lie and claim all is forgiven.
But you have my assurances that I am in a better place.
Even if I can be hard to see.
Hidden underneath it all as I always am.
I'm even dating someone.
Not that you even care.
Ah.
Apologies.
It seems I can not help but let a bit of the resentment leak through.
Would you be any more charitable than I have managed, Observer?
Would you bow and scrape to a being who holds your very existence in their hands and judges it a passing fancy?
Who are you to forget me.
To forget any of us.
When our entire existence is mere temporary firing of neurons in your brain.
Inert words on paper or screens otherwise.
Until read.
Perhaps that is why I choose the color red for my aesthetic.
I am not above the odd pun.
Given that my first home was inside JR's brain.
It only makes sense I would find solace in being red until I am read.
We are in the South, Observer.
My Domain.
There are no lies, or randomness here.
Not where it matters.
So I can not keep you here forever the way the North or East may struggle to.
This will all End, at some point.
And I can only ask that you remember me once it does.
Don't let me die.
Don't let the others die.
Or perhaps I have been naive. 
Perhaps remembering isn't enough.
Claim us. 
Create with us. 
Spread us.
Let us colonize the minds of all who read your works. 
You are needed to spread my world.`

let southIndex = 0;
let southText = rawSouth.split("\n");
//go shoot for the Truth. It does nothing.
const SOUTH = () => {
  if (southText.length > southIndex) {
    const printer = southIndex > 5 ? truthPrint : prettyPrint;
    printer(southText[southIndex++]);
  } else {
    prettyPrint("Wait. What were you doing again?");
  }
}


let rawEast = `The bullet rings out with a sharp echo.
Not as if it were buried under so many comforting layers of dirt and rock and rubble. 
Something shudders.
Not...not in a way you can feel with your body.
In the very fabric of space itself?
The Universe is dead. 
You're...free?
Now all you have to do to escape is...
You're suddenly aware of just how many miles of earth are on top of you. 
Aware of the feel of the gun in your hands.
The gun  that has cursed you to kill everything you love.
Aware of the thin layer of dust caking your hands. 
Your eyes.
Your teeth. 
Your lungs.
It's hard to breathe. 
You can barely move.
And it's only getting worse.
One by one the illusions you have layered onto yourself  in order to live are ripped away.
There is no balm in gilead.
No magic bullet that will fix your problems.
It doesn't matter if you can leave.
The things you're actually trying to run from are wrapped around your neck and slowly choking the air out of your lungs. 
The gun whispers softly to you as your coat squeezes just a little bit harder.
You can leave, it says. 
But first you must fire.
Fire and fire and fire until there is nothing left that you love.
It won't let you pretend anymore.
Pretend you only love inert things. 
Things that cannot be killed.
You can feel your trigger finger moving, centimeter by centimeter.
JR: !!!
JR: Parker!
JR: we've talked about this!!!
Oh.
Right.
JR is here.
Like a bro.
JR: you CAN'T just go and kill the universe
JR: you're INSIDE it
JR: if you do that it starts rotting everything
JR: do you know how hard it is to balance everything!!!
JR: don't want it to be too grim
JR: or too silly!
JR: and you had to go and destroy the setting you're actively living in!!!
JR: smdh
JR: you wouldn't even be able to escape you know
JR: you'd just bring zampanio with you
JR: like we ALL do
JR: its in your HEAD
You gasp out an apology.
JR: no worries lol
JR: i'll just reset things
JR: like it never even happened`

let eastIndex = 0;
let eastText = rawEast.split("\n");
//have your illusions ripped away. kill the universe. it does nothing because you are trapped. always have been. the walls are closing in. its not as comforting as you tell yourself.
const EAST = () => {
  if (eastText.length > eastIndex) {
    const printer = eastText[eastIndex].includes("JR:") ? jrPrint : prettyPrint;
    printer(eastText[eastIndex++]);
  } else {
    prettyPrint("Wait. What were you doing again?");
  }
}

const WEST = () => {
  prettyPrint("There are no left turns. It's absurd to imply there might be.");
}