var documentWidth = $(window).width(); 
var gridContainerWidth = 0.92*documentWidth;
var cellSideLength = 0.18*documentWidth;
var cellSpace = 0.04*documentWidth;

function getPosTop(i,j){
	return cellSpace+i*(cellSpace+cellSideLength);
}

function getPosLeft(i,j){
	return cellSpace+j*(cellSideLength+cellSpace);
}

function getNumberBackGroundColor(number){
	switch(number){
		case 1:
			return "#c29b8c";
			break;
		case 2:
			return "#f5a1b9";
			break;	
		case 3:
			return "#5fbca1";
			break;
		case 4:
			return "#d9ebb1";
			break;
		case 5:
			return "#bbb6d6";
			break;
		case 6:
			return "#b7dfc7";
			break;
		case 7:
			return "#97bda2";
			break;
		case 8:
			return "#009e9d";
			break;
		case 9:
			return "#ee9d34";
			break;
		case 10:
			return "#d5a8c7";
			break;
		case 11:
			return "#ffeb44";
			break;
		case 12:
			return "#e35760";
			break;
		case 13:
			return "#7fc445";
			break;	
		case 14:
			return "#01a371";
			break;
		case 15:
			return "#a1216b";
			break;
	}
}
