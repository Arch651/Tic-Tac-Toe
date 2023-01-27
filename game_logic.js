//variables

var player = 1
var arr_move = [];
var player_1 = [];
var player_2 = []; 
var winner = false;
var num_plyr = 1;
var game_going = false;
var cmp_moves = []

//functions and methods

function set_player(){
    if (game_going == false){
        game_going = true;
        if(document.getElementById("num_player_1").checked){
            num_plyr = 1;
            set_moves();
        }
        else{
            num_plyr = 2;
        }
        activate_board();
        document.getElementById("play").innerHTML = "Replay";
    }
    else{
        window.location.reload();
    }    
}

function set_moves(){
    var temp = Array.from(document.getElementById("game_board").children)
    temp.forEach(element=> {
        if(element.tagName == "INPUT"){
            cmp_moves.push(element.id);
        }
        
    })
}

function activate_board(){
    var parent = document.getElementById("game_board");
    var child = Array.from(parent.children)
    child.forEach(element => {
        if(element.tagName == "INPUT"){
            b_id = element.id;
            document.getElementById(b_id).disabled = false;
        }
    }); 

}

function game_ttt(calling_element){
    var id = calling_element.id;
    if(num_plyr == 1){
        single_player(id);
    }
    else{
        multi_player(id);
    }
}

function single_player(id){

    if(document.getElementById(id).value==" "){
        document.getElementById(id).value= "X";
        // document.getElementById(id).style.backgroundColor = "green"
        arr_move.push(id);
        
        var ind = cmp_moves.indexOf(id);
        cmp_moves.splice(ind,1);

        player_1.push(id);
        player = 2;
        if(check_win(player_1)){
            winner = true;
            document.getElementById("result").innerHTML = "Player 1 wins";
            disable_elem();
        }
        computer_move();
        // document.getElementById("debug").innerHTML = arr_move ; 
    }

    if (arr_move.length >= 9 && winner == false){
        document.getElementById("result").innerHTML = "Its a draw!";
        disable_elem();
    }
    // document.getElementById("result").innerHTML = player_1
}

function computer_move(){
    // console.log(cmp_moves);
    if(arr_move.length< 9 ){
        var rand = Math.floor(Math.random()*cmp_moves.length);
        move_id = cmp_moves[rand];
        cmp_moves.splice(rand,1)
        document.getElementById(move_id).value= "O";
        // document.getElementById(id).style.backgroundColor = "red"
        player_2.push(move_id);
        arr_move.push(move_id);
        player = 1;
        if(check_win(player_2)){
            winner = true;
            document.getElementById("result").innerHTML = "Computer wins";
            disable_elem();
        }
    }
}

function multi_player(id){
    
    if (player == 1 && document.getElementById(id).value==" "){
        document.getElementById(id).value= "X";
        // document.getElementById(id).style.backgroundColor = "green"
        arr_move.push(id);
        player_1.push(id);
        player = 2;
        if(check_win(player_1)){
            winner = true;
            document.getElementById("result").innerHTML = "Player 1 wins";
            disable_elem();
        }
        
    }
    else if(player == 2 && document.getElementById(id).value==" ") {
        document.getElementById(id).value= "O";
        // document.getElementById(id).style.backgroundColor = "red"
        player_2.push(id);
        arr_move.push(id);
        player = 1;
        if(check_win(player_2)){
            winner = true;
            document.getElementById("result").innerHTML = "Player 2 wins";
            disable_elem();
        }
        
    }
    if ( arr_move.length == 9 && winner == false){
        document.getElementById("result").innerHTML = "Its a draw!";
        disable_elem();
    }
    // document.getElementById("result").innerHTML = player_1
}

function check_win(player_move){
    // document.getElementById("result").innerHTML = player_move;

    if (player_move.includes("top_left") && player_move.includes("top_center") && player_move.includes("top_right")){
        // document.getElementById("debug").innerHTML = 1;
        return true;
    }
    else if (player_move.includes("top_left") && player_move.includes("middle_left") && player_move.includes("bottom_left")){
        // document.getElementById("debug").innerHTML = 2;
        return true;
    }
    else if (player_move.includes("top_left") && player_move.includes("middle_center") && player_move.includes("bottom_right")){
        // document.getElementById("debug").innerHTML = 3;
        return true;
    }
    else if (player_move.includes("top_center") && player_move.includes("middle_center") && player_move.includes("bottom_center")){
        // document.getElementById("debug").innerHTML = 4;
        return true;
    }
    else if (player_move.includes("top_right") && player_move.includes("middle_right") && player_move.includes("bottom_right")){
        // document.getElementById("debug").innerHTML = 5;
        return true;
    }
    else if(player_move.includes("middle_left") && player_move.includes("middle_center") && player_move.includes("middle_right")){
        // document.getElementById("debug").innerHTML = 6;
        return true;
    }
    else if (player_move.includes("bottom_left") && player_move.includes("bottom_center") && player_move.includes("bottom_right")) {
        //document.getElementById("debug").innerHTML = 7;
        return true;
    }
    else if (player_move.includes("bottom_left") && player_move.includes("middle_center") && player_move.includes("top_right")){
        //document.getElementById("debug").innerHTML = 8;
        return true;
    }
    else{
        //document.getElementById("debug").innerHTML = 9;
        return false;
    }
} 

function disable_elem(){
    var parent = document.getElementById("game_board");
    var child = Array.from(parent.children)
    child.forEach(element => {
        if(element.tagName == "INPUT"){
            b_id = element.id;
            // document.getElementById(b_id).style.backgroundColor = "blue";
            document.getElementById(b_id).style.backgroundColor = "red";
            document.getElementById(b_id).style.borderColor = "black";
            document.getElementById(b_id).disabled = true;
        }
    }); 
}