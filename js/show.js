function showmove(fromx,fromy,tox,toy){
	var number = $('#grid-cell-'+fromx+'-'+fromy).text();
	var numbercell = "";
	for(var i=0;i<4;i++){
		for(var j=0;j<4;j++){
			if(4*i+j+1==number)
			{
				numbercell = $('#number-cell-'+i+'-'+j);
				break;	
			}
		}
	}       
	numbercell.animate(
		{
			left:getPosLeft(tox,toy),
			top:getPosTop(tox,toy)
		},80,function(){
			var stepnum = $('#beststep').text();
			$('#beststep').text(--stepnum);
			if(!isgameovered)
				isgameover();
		});
}
