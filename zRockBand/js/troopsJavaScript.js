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
												var URLDetailTroops = URL + response[key].href + '?token='+ localStorage.getItem('Token');
												$.ajax({
													type:'GET',
													contentType: "application/json",
													url : URLDetailTroops,
													success: function(response)	{
														$("#troopsTable > tbody > tr:eq(" + id + ")").after( " <td> Attaque : </td><td>" + response[id].attaque + "</td><br> <td> Vitesse : </td><td> "+ response[id].speed +" </td><br> <td> Défense : </td><td>"+ response[id].defence +"</td><br> " ))
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