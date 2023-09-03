let e = document.getElementById("caret_untype_type");
let len = e.innerText.length;
let tex = e.innerText;
let t = 0;
let caretT = 0;

const sleep = ms => new Promise(r => setTimeout(r, ms));

let elements = document.body.getElementsByClassName("pbText");
for(let i = 0; i < elements.length; i++){
    let v = elements[i];
    let l = v.innerHTML;

    let inside = false;

    async function enter(v, l){
        inside = true;
        v.innerHTML = "";
        for(let x = 0; x <= l.length; x++){
            if(!inside) return;
            v.innerHTML = l.slice(0, x) + "|";
            await sleep(50);
        }
    }
    async function leave(v, l){
        inside = false;
        for(let x = v.innerHTML.length; x >= 0; x--){
            if(inside) return;
            v.innerHTML = l.slice(0, x) + "|";
            await sleep(10);
        }
    }

    v.parentElement.addEventListener("mouseenter", () => { enter(v, l) });
    v.parentElement.addEventListener("mouseleave", () => { leave(v, l) });
}

const descriptions = [
    "This was done with pure Javascript using only math. The cursor is time independant from the rest of the text, but is still in the same update function. This effect was achieved with Javascript's string manipulation and a sine wave.",
    "Basic Discord server managing bot that I made for my school. It handles private rooms, announcements and student verification. Made with Discord.js.",
    "Made inside Roblox. Uses multi-threading (which really doesnt increase performance lmao) but lets just say it does. Shading is calculated using the dot product of the surface normal to the sun direction and the Shadows are calculated using a second raycast from the hit point to the sun position",
    "Uses a 1-joint Inverse Kinematics solver made by some guy on the devforum (IK is calculated with cosine law). the play can walk in any direction and the legs will move semi-realisically.",
    "Made inside Roblox. Followed a raytracing tutorial in C++ (called: Ray Tracing in One Weekend) and converted some of the code into LUAU. Very fun, would definitely like to continue with some other algorithms from that tutorial.",
    "Procedurally generated fire using GLSL inside the THREE.JS library. This was actually all done on a roadtrip! Its basically just masking a couple noise textures and moving them to create a fire effect.",
    "METABALLS!!!!! They're smooth and squishy and I love them",
    "Basic noise texture generator that I never finished.",
    "The planet mesh is an Icosahedron and each vertex's height is calculated using a noise texture. The texture colour and pattern are based on the vertex's height."
]
const links = [
    "https://github.com/",
    "https://discord.com/users/952784855832350721",
    "https://www.roblox.com/games/9176887147/Real-Time-Raytracing",
    "https://www.roblox.com/games/9176897430/R6-Foot-Planting",
    "https://www.roblox.com/games/9176905323/Raytraced-Rendering",
    "",
    "",
    "",
    ""
]

let boxes = document.body.getElementsByClassName("project_box");
for(let i = 0; i < boxes.length; i++){
    let v = boxes[i];

    v.addEventListener("click", () => {
        for(let x of boxes){
            if(x != v){
                x.style = "display: none";
            }
        }

        let description = document.createElement("div");
        document.getElementById("content").appendChild(description);
        description.className = "project_box";
        description.style = "max-width: 100%; width: 60vw; justify-content: center; font-size: max(2.5vh, 1vw)";
        description.textContent = descriptions[i];

        let exit = document.createElement("a");
        document.body.appendChild(exit);
        exit.className = "exitButton";
        exit.textContent = "X";

        let link;
        if(links[i] != ""){
            link = document.createElement("a");
            document.getElementById("content").appendChild(link);
            link.className = "project_box";
            link.style = "justify-content: center; min-height: 0; height: fit-content; padding: 10px;";
            link.target = "_blank";
            link.href = links[i];
            link.textContent = "project link here";
        }

        exit.addEventListener("click", () => {
            for(let x of boxes){
                if(x != v){
                    x.style = "display: unset";
                }
            }

            description.remove();
            if(link) link.remove();
            exit.remove();
        });
    });
}

function update(){
    let sin = (Math.sin(t) + 1) * 0.5;
    let current = Math.round(sin * len);
    e.innerText = tex.slice(0, current);

    if(current == 0 || current == len){
        if(Math.sin(caretT) > 0){
            e.innerText += "|";
        }
        e.innerText += "\n";
        t += 0.005;
    }else{
        e.innerText += "|";
        t += 0.025;
    }
    
    caretT += 0.05;

    requestAnimationFrame(update);
}

update();