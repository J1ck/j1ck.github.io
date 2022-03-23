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