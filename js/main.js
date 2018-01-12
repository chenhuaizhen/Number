var board = new Array();
var num = new Array();
var i_num = new Array();
var step = new Array();
var flagStep = new Array();
var ismoblie = false;
var isStart = false;
var tid;
var isgameovered = false;

var tipNum = 0;
var startx = 0;
var starty = 0;
var endx = 0;
var endy = 0;

$(document).ready(function(){
	prepareForMobile();
	newgame();
});

function prepareForMobile(){

	if(documentWidth>500){
		gridContainerWidth = 500;
		cellSpace = 20;
		cellSideLength = 100;
	}
	else{
	$('.headercontain').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('width',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('height',gridContainerWidth-2*cellSpace);
	$('#grid-container').css('padding',cellSpace);
	$('#grid-container').css('border-radius',0.02*gridContainerWidth);

	$('.grid-cell').css('width',cellSideLength);
	$('.grid-cell').css('height',cellSideLength);
	$('.grid-cell').css('border-radius',0.06*cellSideLength);

	ismoblie = true;
	}
	$('#puzzle').css('font-size',0.4*cellSideLength);
	$('#puzzle').css('line-height',0.4*cellSideLength+'px');
}

function newgame(){
	isStart = false;
	init();
	intialNum();
	tipNum = 0;
	$('#tipbuttom').css('background-color','#8f7a66');
	var tipStep = theMinStep();
	$('#beststep').text(tipStep.length-18);
	alert("本游戏玩法：只要把乱序的1-15数字重左到右，从上到下恢复成正序的1-15即可"+
	"\n"+
	"本游戏提供有时间计算和最短路程，欢迎各位挑战"+
	"\n"+
	"游戏中提供了一次3步走提示，请妥善使用");
}

function setTime(){
	if(isgameover()||!isStart){
		clearInterval(tid);
		return;
	}
	var s = $("#stime").text();
	var ms = $("#mstime").text();
	ms++;
	if(ms>=10)
	{
		ms=0;
		s++;
	}
	$("#stime").text(s);
	$("#mstime").text(ms);
}

function intialNum(){
	for(var i = 0; i < 15 ; i++){
		i_num[i] = i+1;
	}
	for(var j = 0; j <100 ;){
		var t = parseInt(Math.floor(Math.random()*16));
		if(t>14)
			continue;
		else{
			if(t+3>14)
				swap(t,t-3);
			else
				swap(t,t+3);
			j++;
		}
	}
	var flag = false;
	for(var ii = 0;ii<4;ii++){
		for(var jj = 0;jj<4 ; jj++){
			if(ii==3&&jj==3){
				$('#grid-cell-'+ii+'-'+jj+' p').text(0);
				break;
			}
			for(a=0;a<4;a++){
				for(b=0;b<4;b++){
					if (a*4+b+1==i_num[4*ii+jj]) {
						flag = true;
						break;
					}
				}
				if(flag){
					break;
				}
			}
			flag = false;
			$("#grid-container").append('<div class="number-cell" id="number-cell-'+a+"-"+b+'"'+"></div>");
			var theNumberCell = $('#number-cell-'+a+'-'+b);
			a = 0;
			b = 0;
			var tempnumber = i_num[4*ii+jj];
			$('#grid-cell-'+ii+'-'+jj+' p').text(tempnumber);
			theNumberCell.css('width',cellSideLength);
			theNumberCell.css('height',cellSideLength);
			theNumberCell.css('top',getPosTop(ii,jj));
			theNumberCell.css('left',getPosLeft(ii,jj));
			theNumberCell.css('background-color',getNumberBackGroundColor(tempnumber));
			theNumberCell.css('border-radius',0.06*cellSideLength);
			theNumberCell.text(tempnumber);
			num[ii][jj] = tempnumber;
		}
	}
	num[3][3]=0;
	if(ismoblie){
		$('.number-cell').css('line-height',cellSideLength+'px');
		$('.number-cell').css('font-size',0.6*cellSideLength+'px');
	}
}

function swap(i,j){
	var temp = i_num[i];
	i_num[i] = i_num[j];
	i_num[j] = temp;
}

function init(){
	for(var i=0;i<4;i++){
		board[i]=new Array();
		num[i]=new Array();
		for(var j=0;j<4;j++){
			var gridCell = $('#grid-cell-'+i+'-'+j);
			gridCell.css('top',getPosTop(i,j));
			gridCell.css('left',getPosLeft(i,j));
			board[i][j] = 1;
		}
	}
	board[3][3] = 0;
	isStart=false;
	$("#stime").text(0);
	$("#mstime").text(0);
}

$(document).keydown(
	function(event){
	if(!isStart)
	{
		isStart = true;
		tid = setInterval(setTime,100);
	}
	switch(event.keyCode)
	{
		case 37://left
			event.preventDefault();
			if(moveLeft()){
				//setTimeout("isgameover()",500);
			}
			break;
		case 38://up
			event.preventDefault();
			if(moveUp()){
				//setTimeout("isgameover()",500);
			}
			break;
		case 39://right
			event.preventDefault();
			if(moveRight()){
				//setTimeout("isgameover()",500);
			}
			break;
		case 40://down
			event.preventDefault();
			if(moveDown()){
				//setTimeout("isgameover()",500);
			}
			break;
		default:
			break;
	}		
});

document.addEventListener('touchstart',function(event){
	if(!isStart)
	{		
		isStart = true;
		tid = setInterval(setTime,100);
	}
	startx = event.touches[0].pageX;
	starty = event.touches[0].pageY;
});

document.addEventListener('touchmove',function(event){
	event.preventDefault();
});

document.addEventListener('touchend',function(event){
	endx = event.changedTouches[0].pageX;
	endy = event.changedTouches[0].pageY;

	var deltax = endx - startx;
	var deltay = endy - starty;

	if(Math.abs(deltax) < 0.03*documentWidth && Math.abs(deltay) < 0.03*documentWidth)
		return;

	if(Math.abs(deltax) >= Math.abs(deltay)){
		if(deltax > 0)
		{
			if(moveRight()){
				//setTimeout("isgameover()",500);
			}
		}
		else{
			if(moveLeft()){
				//setTimeout("isgameover()",500);
			}
		}
	}
	else{
		if(deltay > 0){
			if(moveDown()){
				//setTimeout("isgameover()",500);
			}
		}
		else{
			if(moveUp()){
				//setTimeout("isgameover()",500);
			}
		}
	}
});

function isgameover(){
	if(board[3][3]!=0){
		return false;
	}
	else{
		for(var i=0;i<4;i++){
			for(var j=0;j<4;j++){
				if(i==3&&j==3)
				{
					isgameovered = true;
					gameover();
					return true;
				}
				if(num[i][j]!=4*i+j+1){
					return false;
				}
			}
		}
	}
}

function gameover(){
	alert("congratulation");
}

function moveLeft(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				continue;
			}
			else{
				if(j==3){
					return false;
				}
				else{
					showmove(i,j+1,i,j);
					board[i][j]=1;
					board[i][j+1]=0;
					num[i][j] = num[i][j+1];
					num[i][j+1] = 0;
					$('#grid-cell-'+i+'-'+j+' p').text(num[i][j]);
					$('#grid-cell-'+i+'-'+(j+1)+' p').text(0);
					return true;
				}
			}
		}
	}							
}

function moveUp(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				continue;
			}
			else{
				if(i==3){
					return false;
				}
				else{
					showmove(i+1,j,i,j);
					board[i][j]=1;
					board[i+1][j]=0;
					num[i][j] = num[i+1][j];
					num[i+1][j] = 0;
					$('#grid-cell-'+i+'-'+j+' p').text(num[i][j]);
					$('#grid-cell-'+(i+1)+'-'+j+' p').text(0);
					return true;
				}
			}
		}
	}							
}

function moveRight(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				continue;
			}
			else{
				if(j==0){
					return false;
				}
				else{
					showmove(i,j-1,i,j);
					board[i][j]=1;
					board[i][j-1]=0;
					num[i][j] = num[i][j-1];
					num[i][j-1] = 0;
					$('#grid-cell-'+i+'-'+j+' p').text(num[i][j]);
					$('#grid-cell-'+i+'-'+(j-1)+' p').text(0);
					return true;
				}
			}
		}
	}							
}

function moveDown(){
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(board[i][j]!=0){
				continue;
			}
			else{
				if(i==0){
					return false;
				}
				else{
					showmove(i-1,j,i,j);
					board[i][j]=1;
					board[i-1][j]=0;
					num[i][j] = num[i-1][j];
					num[i-1][j] = 0;
					$('#grid-cell-'+i+'-'+j+' p').text(num[i][j]);
					$('#grid-cell-'+(i-1)+'-'+j+' p').text(0);
					return true;
				}
			}
		}
	}							
}

function columnStep(i){
	if(i<=4)
		return 1;
	if(i<=8)
		return 2;
	if(i<=12)
		return 3;
	return 4;
}

function distanceStep(num,i){
	if(num==i)
		return 0;
	if(num>i)
	{
		var j = columnStep(num)-columnStep(i);
		var k = i+j*4;
		return Math.abs(k-num)+j;
	}
	if(num<i)
	{
		var j = columnStep(i)-columnStep(num);
		var k = i-j*4;
		return Math.abs(k-num)+j;
	}
}

function differNum(num,i,j){
	return distanceStep(num,i+1)-distanceStep(num,j+1);
} 

function canmoveupStep(numStep){
	var tempStep = numStep[16];
	if(tempStep-4>=0&&numStep[17]!=3)
	{
		var temp = numStep[tempStep];
		numStep[tempStep] = numStep[tempStep-4];
		numStep[tempStep-4] = temp;
		numStep[16] = tempStep-4;
		numStep[17] = 1;
		if(isinFlag(numStep)){
			return false;
		}
		numStep[18]+=differNum(numStep[tempStep],tempStep,tempStep-4);
		if(numStep[18]>3)
			return false;
		return true;
	}
	else
		return false;
}

function canmoverightStep(numStep){
	var tempStep = numStep[16];
	if((tempStep+1)%4!=0&&numStep[17]!=4)
	{
		var temp = numStep[tempStep];
		numStep[tempStep] = numStep[tempStep+1];
		numStep[tempStep+1] = temp;
		numStep[16] = tempStep+1;
		numStep[17] = 2;
		if(isinFlag(numStep)){
			return false;
		}
		numStep[18]+=differNum(numStep[tempStep],tempStep,tempStep+1);
		if(numStep[18]>3)
			return false;
		return true;
	}
	else
		return false;
}

function canmovedownStep(numStep){
	var tempStep = numStep[16];
	if(tempStep+4<=15&&numStep[17]!=1)
	{
		var temp = numStep[tempStep];
		numStep[tempStep] = numStep[tempStep+4];
		numStep[tempStep+4] = temp;
		numStep[16] = tempStep+4;
		numStep[17] = 3;
		if(isinFlag(numStep)){
			return false;
		}
		numStep[18]+=differNum(numStep[tempStep],tempStep,tempStep+4);
		if(numStep[18]>3)
			return false;
		return true;
	}
	else
		return false;
}

function canmoveleftStep(numStep){
	var tempStep = numStep[16];
	if(tempStep%4!=0&&numStep[17]!=2)
	{
		var temp = numStep[tempStep];
		numStep[tempStep] = numStep[tempStep-1];
		numStep[tempStep-1] = temp;
		numStep[16] = tempStep-1;
		numStep[17] = 4;
		if(isinFlag(numStep)){
			return false;
		}
		numStep[18]+=differNum(numStep[tempStep],tempStep,tempStep-1);
		if(numStep[18]>3)
			return false;
		return true;
	}
	else
		return false;
}

function istheendStep(numStep){
	for(var i=0;i<15;i++){
		if(numStep[i]!=i+1)
			return false;
	}
	return true;
}

function insertStep(numStep){
	var temp = numStep.slice(0);
	if(canmoveupStep(temp)){
		var obj = new Array();
		obj  = temp.slice(0);
		obj.push(1);
		step.push(obj);
		flagStep.push(obj);
		if(obj[16]==15){
			if(istheendStep(obj))
			{
				return true;
			}	
		}
	}
	temp = numStep.slice(0);
	if(canmoverightStep(temp)){
		var obj = new Array();
		obj  = temp.slice(0);
		obj.push(2);
		step.push(obj);
		flagStep.push(obj);
		if(obj[16]==15){
			if(istheendStep(obj))
			{
				return true;
			}	
		}
	}
	temp = numStep.slice(0);
	if(canmovedownStep(temp)){
		var obj = new Array();
		obj  = temp.slice(0);
		obj.push(3);
		step.push(obj);
		flagStep.push(obj);
		if(obj[16]==15){
			if(istheendStep(obj))
			{
				return true;
			}	
		}
	}
	temp = numStep.slice(0);
	if(canmoveleftStep(temp)){
		var obj = new Array();
		obj  = temp.slice(0);
		obj.push(4);
		step.push(obj);
		flagStep.push(obj);
		if(obj[16]==15){
			if(istheendStep(obj))
			{
				return true;
			}	
		}
		temp = numStep.slice(0);
	}
	return false;
}

function sortStep(){
	var minnum = 13;
	if(step.length<95)
		return;
	else{
		for(var i = 0;i<minnum;i++)
		{
			var min = step[i][18];
			for(var j = i;j<step.length;j++)
			{
				if(min>step[j][18])
				{
					min = step[j][18];
					var temp = step[i];
					step[i] = step[j];
					step[j] = temp;
				}
			}
		}
		step.splice(minnum,step.length-minnum);
	}
}

function theMinStepRoute(){
	var sum = step.length;
	sortStep();
	for(var i = 0;i<sum;i++)
	{
		if(insertStep(step[0])){
			var temp = new Array();
			temp = step[0].slice(0);
			flagStep = [];
			step = [];
			return temp;
		}
		step.shift();
	}
	return theMinStepRoute();
}

function isthesameStep(numStep,theflagStep){
	for(var i = 0;i<16;i++)
	{
		if(numStep[i]!=theflagStep[i])
			return false;
	}
	return true;
}

function isinFlag(numStep){
	for(var i=0;i<flagStep.length;i++)
	{
		if(isthesameStep(numStep,flagStep[i]))
			{				
				return true;
			}
	}
	return false;
}

function theMinStep(){
	var numStep = new Array();
	flagStep = [];
	step = [];
	for(var i=0;i<4;i++)
		for(var j=0;j<4;j++)
			numStep.push(num[i][j]);
	for(var i=0;i<16;i++)
	{
		if(numStep[i]==0){
			numStep.push(i);
			break;
		}
	}
	numStep.push(0);
	numStep.push(0);
	flagStep.push(numStep);
	step.push(numStep);
	return theMinStepRoute();
}

function tipMove(i){
	switch(i){
		case 1:moveDown();
			break;
		case 2:moveLeft();
			break;
		case 3:moveUp();
			break;
		case 4:moveRight();
			break;
	}
}

function tipStep(){
	if(tipNum!=0){
		$('#tipbuttom').css('background-color','black');
		return;
	}
	var tipStep = theMinStep();
	tipMove(tipStep[19]);
	if(tipStep.length>=20)
		tipMove(tipStep[20]);
	if(tipStep.length>=21)
		tipMove(tipStep[21]);
	tipNum++;
}