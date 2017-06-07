var computer;
var you;
var usersTurn = 1;
var marked = [0,0,0,0,0,0,0,0,0];
$( document ).ready(function() {
    $('.game').hide();
    $(".btn-primary").click(function(){
        var symbol = $(this).html();
        if(symbol == 'X'){
            computer = 'O';
            you = 'X';
        } else {
            computer = 'X';
            you = 'O';
        }
        $('.selection').fadeOut("slow");
        $('.game').fadeIn("slow");
        
        startGame(0);
    });
});
function startGame(gameTime) {
    $('.game .btn').attr("disabled","true");
    
    setTimeout(function(){ 
        $('.game .btn').html('_');
        marked = [0,0,0,0,0,0,0,0,0];
        checkTurn();
        $('.game .btn').removeAttr('disabled');

    }, gameTime);
}

$('.game .btn').click(function(){
    if(usersTurn === 1 ) {
        usersTurn = 0;
        $(this).html(you);
        markClickedId( $(this).attr('id') );
        $(this).attr("disabled","true");
        checkTurn();
    }
});

function checkTurn() {
    
    if(whoWon() ){
        $('#message').html(whoWon() + " Won!");
        startGame(3000);  
    } else if(marked.indexOf(0) === -1) {
        $('#message').html('Draw Match');
        startGame(3000);  
    } else if(usersTurn === 1) {
        $('#message').html('Your Turn');
    } else {
        $('#message').html('Computer\'s Turn');
        computersTurn();
    }
}

function computersTurn() {
    setTimeout(function(){ 
        var id = getComputerNextChoice();
        $('#'+id).html(computer);
        markClickedId( id );
        $('#'+id).attr("disabled",'true');
        usersTurn = 1;
        $('.game .btn').removeClass("text-muted");
        checkTurn();
  }, 1000);
}



function whoWon() {
    //8 possible winning ways
    //If 1,2,3 are marked by same symbol
    if(checkMarkedAndIds(0,1,2, 'r1c1','r1c2','r1c3')){
     return checkMarkedAndIds(0,1,2, 'r1c1','r1c2','r1c3');   
    } else if(checkMarkedAndIds(3,4,5, 'r2c1','r2c2','r2c3')){
     return checkMarkedAndIds(3,4,5, 'r2c1','r2c2','r2c3');   
    } else if(checkMarkedAndIds(6,7,8, 'r3c1','r3c2','r3c3')){
     return checkMarkedAndIds(6,7,8, 'r3c1','r3c2','r3c3'); 
    } else if(checkMarkedAndIds(0,3,6, 'r1c1','r2c1','r3c1')){
     return checkMarkedAndIds(0,3,6, 'r1c1','r2c1','r3c1');   
    } else if(checkMarkedAndIds(1,4,7, 'r1c2','r2c2','r3c2')){
     return checkMarkedAndIds(1,4,7, 'r1c2','r2c2','r3c2');   
    } else if(checkMarkedAndIds(2,5,8, 'r1c3','r2c3','r3c3')){
     return checkMarkedAndIds(2,5,8, 'r1c3','r2c3','r3c3'); 
    } else if(checkMarkedAndIds(0,4,8, 'r1c1','r2c2','r3c3')){
     return checkMarkedAndIds(0,4,8, 'r1c1','r2c2','r3c3'); 
    } else if(checkMarkedAndIds(2,4,6, 'r1c3','r2c2','r3c1')){
     return checkMarkedAndIds(2,4,6, 'r1c3','r2c2','r3c1'); 
    }
    return 0;
}

function checkMarkedAndIds(p1,p2,p3, id1,id2,id3) {
    if(marked[p1] ===1 && marked[p2] === 1 && marked[p3] === 1){
        return compareThreeIds(id1, id2,id3);
    }
    return 0;
}

function compareThreeIds( id1, id2, id3) {
    if(getHtmlByid(id1) === getHtmlByid(id2) &&  getHtmlByid(id2) === getHtmlByid(id3) ){
            if(getHtmlByid(id1) === computer){
                return "Computer";
            } else if(getHtmlByid(id1) === you){
                return "You";
            } else 
                return 0;
        }
}
           
function getHtmlByid(id) {
  return $('#'+id).html();
}

function getComputerNextChoice() {
    var rand = 0;
    var id;

    do{
        rand = getRandomInt(1,10);
    }while(marked[rand-1]===1);
    
    switch(rand){
            case 1:
                id = 'r1c1';
                break;
            case 2:
                id = 'r1c2';
                break;
            case 3:
                id = 'r1c3';
                break;
            case 4:
                id = 'r2c1';
                break;
            case 5:
                id = 'r2c2';
                break;
            case 6:
                id = 'r2c3';
                break;
            case 7:
                id = 'r3c1';
                break;
            case 8:
                id = 'r3c2';
                break;
            case 9:
                id = 'r3c3';
                break;
        }
    return id;
}

function markClickedId(id) {
    switch (id) {
        case 'r1c1':
            marked[0] = 1;
            break;
        case 'r1c2':
            marked[1] = 1;
            break;
        case 'r1c3':
            marked[2] = 1;
            break;
        case 'r2c1':
            marked[3] = 1;
            break;
        case 'r2c2':
            marked[4] = 1;
            break;
        case 'r2c3':
            marked[5] = 1;
            break;
        case 'r3c1':
            marked[6] = 1;
            break;
        case 'r3c2':
            marked[7] = 1;
            break;
        case 'r3c3':
            marked[8] = 1;
            break;
    }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}