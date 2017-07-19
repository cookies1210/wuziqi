

var board = [];
var wins = [];
var myWin = [];
var computerWin = [];
var over = false;
var count = 0;
for(var i = 0;i<15;i++){
    board[i] = [];
    for(var j = 0;j<15;j++){
        board[i][j] = 0;
    }
}

    var chess = document.getElementById("chess");
    var context = chess.getContext("2d");

    context.strokeStyle = "#bfbfbf";

    var me = true;

    /*画棋盘*/
    var drawBoard = function(){
        for(var i=0;i<15;i++){
            context.moveTo(15,15+30*i);
            context.lineTo(435,15+30*i);
            context.stroke();
            context.moveTo(15+30*i,15);
            context.lineTo(15+30*i,435);
            context.stroke();
        }
    }
    drawBoard();
    /*����*/
    var drawChess = function(i,j,me){

       context.beginPath();
        context.arc(15+30*i,15+30*j,13,0,2*Math.PI);
        context.closePath();
        var gradient = context.createRadialGradient(15+30*i+2,15+30*j-2,10,15+30*i+2,15+30*j-2,0);
        if(me){
            gradient.addColorStop(0,"#0a0a0a");
            gradient.addColorStop(1,"#636766");
        }else {
            gradient.addColorStop(0, "#d1d1d1");
            gradient.addColorStop(1, "#f9f9f9");
        }
        context.fillStyle = gradient;
        context.fill();
        }




   chess.onclick = function(e){
       if(over){
           return;
       }
       var x = e.offsetX;
       var y = e.offsetY;
       var i = Math.floor(x/30);
       var j = Math.floor(y/30);
       if(board[i][j] == 0){
           drawChess(i,j,me);
           board[i][j] = 1;
           for(var k = 0;k<count;k++){
               if(wins[i][j][k]){
                   myWin[k]++;
                   computerWin[k] = 6;
                   if(myWin[k]==5){
                       window.alert("you win!");
                       over = true;
                   }
               }
           }
           if(!over){
               computerAi();
               me = !me;
           }
       }

   }
var computerAi = function(){
/*    var myScore = [];
    var computerScore = [];
    var max = 0;
    var v,u;
    for(var i = 0;i<15;i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j = 0;j<15;j++){
        if(board[i][j]==0){
            for(var k = 0;k<count;k++){
                if(mywin[k] ==1){
                    myScore[i][j] = 200;
                }else if(mywin[k]==2){
                    myScore[i][j] =400;
                }else if(mywin[k]==3){
                    myScore[i][j]=1000;
                }else if(mywin[k]==4){
                    myScore[i][j] =4000;
                }
                if(computerwin[k] ==1){
                    computerScore[i][j] = 210;
                }else if(computerwin[k]==2){
                    computerScore[i][j] =440;
                }else if(computerwin[k]==3){
                    computerScore[i][j]=1200;
                }else if(computerwin[k]==4){
                    computerScore[i][j] =5000;
                }
            }
            if(myScore[i][j]>max){
                max = myScore;
                u = i;
                v = j;
            }else if(myScore[i][j] ==max){
                if(computerScore[i][j]>computerScore[u][v]){
                    u = i;
                    v = j;
                }
            }

            if(computerScore[i][j]>max){
                max = computerScore;
                u = i;
                v = j;
            }else if(computerScore[i][j] ==max){
                if(myScore[i][j]>myScore[u][v]){
                    u = i;
                    v = j;
                }
                }
            }
        }
    }
    drawChess(u,v,false);
    board[u][v] = 2;
    for(var k = 0;k<count;k++){
        if(wins[u][v][k]){
            computerwin[k]++;
            mywin[k] = 6;
            if(computerwin[k]==5){
                window.alert("conmputer win!");
                over = true;
                console.log(max);
                console.log(u);
                console.log(v);
            }
        }
    }
    if(!over){
        me = !me;
    }
}*/
    var myScore = [];
    var computerScore = [];
    var max = 0; //最高分数
    var u = 0,v = 0; //最高分数的坐标

    //初始化数组 myScore computerScore
    for(var i=0;i<15;i++){
        myScore[i] = [];
        computerScore[i] = [];
        for(var j=0;j<15;j++){
            myScore[i][j] = 0;
            computerScore[i][j] = 0;
        }
    }

    for(var i=0;i<15;i++){
        for(var j=0;j<15;j++){
            if(board[i][j] == 0){
                for(var k=0;k<count;k++){
                    if(wins[i][j][k]){
                        if(myWin[k] == 1){
                            myScore[i][j] += 200;
                        }else if(myWin[k] == 2){
                            myScore[i][j] += 4000;
                        }else if(myWin[k] == 3){
                            myScore[i][j] += 60000;
                        }else if(myWin[k] == 4){
                            myScore[i][j] += 800000;
                        }else if(myWin[k] == 5){
                            myScore[i][j] += 1000000;
                        }
                        if(computerWin[k] == 1){
                            computerScore[i][j] += 220;
                        }else if(computerWin[k] == 2){
                            computerScore[i][j] += 4200;
                        }else if(computerWin[k] == 3){
                            computerScore[i][j] += 62000;
                        }else if(computerWin[k] == 4){
                            computerScore[i][j] += 820000;
                        }else if(computerWin[k] == 5){
                            computerScore[i][j] += 1020000;
                        }
                    }
                }
                if(myScore[i][j] > max){
                    max = myScore[i][j];
                    u = i;
                    v = j;
                }else if(myScore[i][j] == max){
                    if(computerScore[i][j] > computerScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
                if(computerScore[i][j] > max){
                    max = computerScore[i][j];
                    u = i;
                    v = j;
                }else if(computerScore[i][j] == max){
                    if(myScore[i][j] > myScore[u][v]){
                        u = i;
                        v = j;
                    }
                }
            }
        }
    }

    drawChess(u,v,false);
    board[u][v] =5;
    for(var k=0;k<count;k++){
        if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
        }
        if(computerWin[k]==5){
            alert("计算机赢了！");
        }
        if(computerWin[k]==5){
            over = true;
        }
    }

    if(!over){
        me = !me;
    }
}

    /*Ӯ������*/
    for(var i = 0;i<15;i++){
        wins[i] = [];
        for(var j = 0;j<15;j++){
            wins[i][j] = [];
        }
    }


    /*����*/
    for(var i = 0;i<15;i++ ){
        for(var j = 0;j<11;j++){
            for(var k = 0;k<5;k++){
                wins[i][j+k][count] = true;

            }
            count++;
        }
    }

    /*����*/
    for(var i = 0;i<11;i++){
        for(var j = 0;j<15;j++){
            for(var k = 0;k<5;k++){
                wins[i+k][j][count] = true;

            }
            count++;
        }
    }
    /*б��*/
    for(var i = 0;i<11;i++){
        for(var j = 0;j<11;j++){
            for(var k = 0;k<5;k++){
                wins[i+k][j+k][count] = true;

            }
            count++;
        }
    }
    /*��б��*/
    for(var i = 0;i<11;i++){
        for(var j = 14;j>3;j--){
            for(var k =0;k<5;k++){
                wins[i+k][j-k][count] =true;

            }
            count++;
        }
    }

    for(var i = 0;i<count;i++){
        myWin[i] = 0;
        computerWin[i] = 0;
    }



