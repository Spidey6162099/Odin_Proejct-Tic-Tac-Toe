function Player(name,symbol){
    return {name,symbol};
}


function gameboard(){
let max_size=9;
let count=0;
let isFull=function(){
    
    return this.count===9;
}

let finish=false;

let boxes=[ ["-","-","-"],
            ["-","-","-"],
            ["-","-","-"]];

let reset= function(){
                this.boxes= [ ["-","-","-"],
                ["-","-","-"],
                ["-","-","-"]];
                
                this.count=0;
                this.finish=false;
                const draw_boxes=document.querySelectorAll(".container>.box");
                draw_boxes.forEach((draw_box)=>{
                    draw_box.textContent="";
                })
                const title=document.querySelector(".header>.turn");
                title.textContent="Player1's turn"

                const result=document.querySelector(".footer>.result");
                result.textContent=""
                
            }
return {"boxes":boxes,isFull,max_size,count,reset};
}



function diagonal_check(symbol){
    const boxes=box_container.boxes;
    if(boxes[0][0]==symbol&&boxes[0][0]==boxes[1][1]&&boxes[1][1]==boxes[2][2]){
            
        return true;
            
    }

    else if(boxes[0][2]==symbol&&boxes[0][2]==boxes[1][1]&&boxes[1][1]==boxes[2][0]){
        return true;
    }
    return false;
}

function horizontal_check(symbol){
    const boxes=box_container.boxes;
    if(boxes[0][0]==symbol&&boxes[0][0]==boxes[0][1]&&boxes[0][1]==boxes[0][2]){
        return true;
            
    }
    else if(boxes[1][0]==symbol&&boxes[1][0]==boxes[1][1]&&boxes[1][1]==boxes[1][2]){
        return true;
    }
    else if(boxes[2][0]==symbol&&boxes[2][0]==boxes[2][1]&&boxes[2][1]==boxes[2][2]){
        return true;
    }
    return false;
}

function vertical_check(symbol){
    // console.log(boxes);
    const boxes=box_container.boxes;
    if(boxes[0][0]==symbol&&boxes[0][0]==boxes[1][0]&&boxes[1][0]==boxes[2][0]){
    
    return true;
            
    }
    else if(boxes[0][1]==symbol&&boxes[0][1]==boxes[1][1]&&boxes[1][1]==boxes[2][1]){
        return true;
    }
    else if(boxes[0][2]==symbol&&boxes[0][2]==boxes[1][2]&&boxes[1][2]==boxes[2][2]){
            return true;
    }
    return false;
}





function player_turn(player,i,j){
        // console.log(box);
        const box=box_container;
        // while(true){
        // let i=Number(prompt(`${player.name}enter the row`,"0"));
        // let j=Number(prompt(`${player.name}enter the column`,"0"));
 
        // if(box.boxes[i][j]=="-"){
        box.boxes[i][j]=player.symbol;
        box.count++;
        const output_box=document.querySelector('.box[data_i='+CSS.escape(i)+']'+'[data_j='+CSS.escape(j)+']');
        output_box.textContent=player.symbol;
    
        
        // else{
        //     console.log("filled,try again");
        // }
    
    }

function check(player){
    
    if(vertical_check(player.symbol)||diagonal_check(player.symbol)||horizontal_check(player.symbol)){
        return true;
    }
    return false;
}

// function stage_Set(){



    
//     // while(true){
//     //     // console.log(box_container["boxes"]);
//     // if(box_container.isFull()){
//     //     console.log("Tie");
//     //     break;
//     // }    
//     // player_turn(box_container,player1);
    

//     // if(box_container.isFull()){
//     //     console.log("Tie");
//     //     break;
//     // }
//     // player_turn(box_container,player2)

//     // if(box_container.isFull()){
//     //     console.log("Tie");
//     //     break;
//     // }  
//     // console.log(box_container.boxes)

//     // }

// }

function gameFlow(i,j){
    let player1=Player("Player1","X");
    let player2=Player("Player2","O");
    const result=document.querySelector(".footer>.result");
    const turn=document.querySelector(".header>.turn");
    if(box_container.count%2===0){
        turn.textContent=`${player2.name}'s turn`
        player_turn(player1,i,j);
        if(check(player1)){
            result.setAttribute("style","color:red")
            result.textContent=`${player1.name} wins`;
            box_container.finish=true;
        
        }

    }

    else{
        turn.textContent=`${player1.name}'s turn`
        player_turn(player2,i,j);
        if(check(player2)){
            result.setAttribute("style","color:red")
            result.textContent=`${player2.name} wins`;
        box_container.finish=true;
    }
    }

    if(box_container.isFull()){
        result.textContent=`TIE`;
        result.setAttribute("style","color:purple")
        box_container.finish=true;
    }

    if(box_container.finish===true){
        
        // box_container.reset();
        
        const click_boxes=document.querySelectorAll(".container>.box");
        click_boxes.forEach((click_box)=>{
        click_box.removeEventListener("click",get_cord);
        })
        // finish=false;
        
    }

}

 function get_cord(e){
    
    let i=e.target.getAttribute("data_i");
    let j=e.target.getAttribute("data_j");
    gameFlow(i,j);
}
function setBoard(){
    const click_boxes=document.querySelectorAll(".container>.box");
   
    click_boxes.forEach((single_box)=>{
        single_box.addEventListener("click",get_cord,{once:true})
    })
}

// stage_Set();
    let box_container=gameboard();   
    setBoard();

const reset_button=document.querySelector(".footer>button");
reset_button.addEventListener("click",(e)=>{
    box_container.reset();
    setBoard();
})    

