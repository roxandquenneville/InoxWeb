$(document).ready(function() {	
		
			var URL = "https://inox-mpariseaucstj.c9.io/";
	
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
									$("#runesTable").append("<tr>  <td> <img  src=\"images/"+key+".png\"  >  </td>  <td align=\"center\" >"+ key  +" </td><td>"+ value + "</td><td> <button id=\"btnFusion"+key+"\" >Fusionner</button> </td>  </tr>")
								
							});
						}
				});	
			}
});