$(document).ready(function() {	
		
			var URL = "https://inox-mpariseaucstj.c9.io/";
			var URLRunesFusion = URL + "inventaires/runes/fusion"
			URLRunesFusion = URLRunesFusion + "?token="+ localStorage.getItem("Token");
			if(localStorage.getItem("nom") === null )
			{
				$("#Explorateur").text("Vous devez vous connecter pour voir vos runes.");
				
			}
			else
			{
				$("#Explorateur").text("Bienvenue, Explorateur " + localStorage.getItem("nom"));
				URLRunes = URL + "inventaires/runes?token=" + localStorage.getItem("Token");
				$.ajax({
					type:'GET',								
					url : URLRunes,						
					contentType: "application/json",
					success: function(response) {	
							
						$.each(response,function (key,value){
							if(key == "fusion")
									$("#runesTable").append("<tr><td> <img  src=\"images/"+key+".png\"  > </td> <td align=\"center\">"+ key  +" </td><td>"+ value + "</td> </tr>")
							else
								$("#runesTable").append("<tr>  <td> <img  src=\"images/"+key+".png\"  >  </td>  <td align=\"center\" >"+ key  +" </td><td>"+ value + "</td><td> <button id=\""+key+"\" >Fusionner</button> </td>  </tr>")
								
						});
						
						
						$("body").delegate("button","click", function (){						
							var type = this.id;
							
							var RuneFusion = {};
							RuneFusion.type = type;
							var json = JSON.stringify(RuneFusion);
							
							
							
							$.ajax({
								type:'patch',
								url : URLRunesFusion,
								data : json,
								contentType : "application/json",
								success : function(xhr, ajaxOptions, thrownError)
								{
									if(thrownError.status == 200)
									{
										alert("Fusion complété !");
										location.reload();
									}
									else if (thrownError.status == 304)
									{
										alert("Il vous manque des runes !");
									}
								}
								
							});
						
						});			
						
					}
				
				});
			}
});