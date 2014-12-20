$(document).ready(function() {	
			var URL = "https://inox-mpariseaucstj.c9.io/";
			
			
			if(localStorage.getItem("nom") === null )
			{
				$("#Explorateur").text("Vous devez vous connecter pour voir vos troops.");
			}
			else
			{
	
				$("#Explorateur").text("Bienvenue, Explorateur " + localStorage.getItem("nom"));
				
				URLTroops = URL + "inventaires/troops?token=" + localStorage.getItem("Token");

				$.ajax({
					type:'GET',
					contentType: "application/json",
					url : URLTroops,
					success: function(response) {	
						
						if(response.message)
							$("#message").text(response.message)
						else
						{
									
							$.each(response,function (key, values){
										
								$("#troopsTable").append("<tr id=\"tr"+key +"\" ><td> <img src=\""+response[key].imageUrl+"\" height=50 width=50  > Troops # "+(key+1) +" :     </td><td> "+  response[key].name +" <br><br> </br>   "+ "</td> <td> <button id=\""+key+"\" class=\"troopsDetail\" >Détails</button> </td> </tr></br>")
										
							});
									
							//Event Button Details 
							$("body").delegate("button","click", function (){
								var id = this.id;
								
								$.ajax({
									type:'GET',
									contentType: "application/json",
									url : URLTroops,
									success: function(response)	{
									
										$.each(response,function (key,values) {
											
											if(key == id)
											{
												var URLDetailTroops =  response[key].href + '?token='+ localStorage.getItem('Token');
												$.ajax({
													type:'GET',
													contentType: "application/json",
													
													url : URLDetailTroops,
													success: function(response)	{
														//var idInt = +id + 1;
														var tr = "#tr"+id+"";
														$(tr).append( "  <td align=\"center\"> Attaque : </td><td>" + response.attack + "</td> <td align=\"center\"> Vitesse : </td><td> "+ response.speed +" </td> <td align=\"center\"> Défense : </td><td>"+ response.defense +"</td> ") ;
														$("#"+id+"").attr("disabled","disabled");
													}
												});	
											}
											
										});
									}
								
								});
							});		
						}	
					}
				});
			}
});		