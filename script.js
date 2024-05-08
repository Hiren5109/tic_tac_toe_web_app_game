const boxes=document.querySelectorAll(".box");
const resetBtn=document.getElementById("reset-btn");
const msgContainer=document.querySelector(".msg-container");
const msg=document.getElementById("msg");
const playerTurn=document.getElementById("player-turn");
let turn0=true;
let count=0;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
];

const resetGame=()=>{
    turn0=true;
    count=0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) =>{
    box.addEventListener("click",()=>
    {
        if(turn0){
            turn0=false;
            box.innerHTML="O";
            box.classList.remove('X');
            box.classList.add('O');
            playerTurn.innerHTML='O Turn';
            playerTurn.classList.remove('X');
            playerTurn.classList.add('O');
        }
        else{
            turn0=true;
            box.innerHTML="X";
            box.classList.remove('O');
            box.classList.add('X');
            playerTurn.innerHTML='X Turn';
            playerTurn.classList.remove('O');
            playerTurn.classList.add('X');
        }
        box.disabled=true;
        count++;
        
        let isWinner=checkWinner();
        if(count === 9 && !isWinner){
            gameDraw();
        }
    });
});

const gameDraw=()=>{
    msg.innerText=`Game Was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const disableBoxes=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
    msgContainer.classList.remove("hide");
};

const enableBoxes=()=>{
    for(let box of boxes){
        box.innerHTML="";
        box.disabled=false;
    }
    msgContainer.classList.add("hide");
};

const showWinner=(winner)=>{
    msg.innerHTML=`Congratulations,Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner=()=>{
    for(let pattern of winPatterns){
        let post1val=boxes[pattern[0]].innerHTML;
        let post2val=boxes[pattern[1]].innerHTML;
        let post3val=boxes[pattern[2]].innerHTML;
    
        if(post1val != "" && post2val != "" && post3val != ""){
            if(post1val === post2val && post2val ===  post3val){
                showWinner(post1val);
                return true;
            }
        }
    }
};
resetBtn.addEventListener("click",()=>{
    count=0;
    enableBoxes();
    turn0=true;
    playerTurn.innerHTML="O Turn";
    playerTurn.classList.remove('O');
    playerTurn.classList.add('X');
    })