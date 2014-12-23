$(document).ready(function() {	
			// Déclaration des variables pour la page
			var URL = "https://inox-mpariseaucstj.c9.io/";
			var URLRunesFusion = URL + "inventaires/runes/fusion"
			URLRunesFusion = URLRunesFusion + "?token="+ localStorage.getItem("Token");
			// Vérifie si l'explorateur est déja connecter
			if(localStorage.getItem("nom") === null )
			{
				$("#Explorateur").text("Vous devez vous connecter pour voir vos runes.");
				
			}
			else
			{
				// S'il est deja connecter on affiche les runes dynamiquement
				$("#Explorateur").text("Bienvenue, Explorateur " + localStorage.getItem("nom"));
				URLRunes = URL + "inventaires/runes?token=" + localStorage.getItem("Token");
				$.ajax({
					type:'GET',								
					url : URLRunes,						
					contentType: "application/json",
					success: function(response) {	
						// Boucle dans les runes 
						$.each(response,function (key,value){
							if(key == "fusion")
									$("#runesTable").append("<tr><td> <img  src=\"css/images/"+key+".png\"  > </td> <td align=\"center\">"+ key  +" </td><td>"+ value + "</td> </tr>")
							else
								$("#runesTable").append("<tr>  <td> <img  src=\"css/images/"+key+".png\"  >  </td>  <td align=\"center\" >"+ key  +" </td><td>"+ value + "</td><td> <button id=\""+key+"\" >Fusionner</button> </td>  </tr>")
								
						});
						
						// Event sur le bouton créer 
						$("body").delegate("button","click", function (){						
							var type = this.id;
							
							var RuneFusion = {};
							RuneFusion.type = type;
							var json = JSON.stringify(RuneFusion);
							
							
							// Requete pour la fusion
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