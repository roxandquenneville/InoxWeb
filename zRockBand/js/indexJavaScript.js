$(document).ready(function() {	

	var URL = "https://inox-mpariseaucstj.c9.io/";
	
		
		if(localStorage.getItem("nom") === null )
		{
			
			$("#home").append(
				
					"<div class=\"connexion\" >" +
					"<p>Connexion </p>" +					
					"	Nom d'utilisateur:<br>" +
					"	<input type=\"text\" id=\"usernameConnexion\" >" +
					"	<br> " +
					"	Mot de passe:<br> " +
					"	<input type=\"password\" id=\"passwordConnexion\"> " +
					"	<br><br>" +
					"	<button id=\"btnConnexion\" >Connexion</button>" +
					 
					"</div>" + 
					"<div class=\"creationcompte\">"  +
					" <p>Création d'un compte </p>" +					
					"	Nom complet:<br>" +
					"	<input type=\"text\"  id=\"name\"> " +
					"	<br>" +
					"	Nom d'utilisateur:<br>" +
					"	<input type=\"text\"  id=\"username\">" + 
					"	<br>" +
					"	Mot de passe:<br>" +
					"	<input type=\"password\" id=\"password\"> " + 
					"	<br>" +
					"	Confirmation mot de passe:<br>" +
					"	<input type=\"password\" id=\"confirmationpassword\" value=\"\" >" +
					"	<br><br>" +
					"	<Button id=\"btnCreationCompte\">Creation</button>" +
				    "</div>"			
			);
			// Ajout evenement du bouton Connexion
			$("#btnConnexion").click(function () {
			
				
				var explorateur = {};				
				
				explorateur.username = $("#usernameConnexion").val();
				explorateur.password = $("#passwordConnexion").val();	
				
				var URLExplorateur = URL + "explorateurs?username=" + explorateur.username +"&password="+ explorateur.password;
				
				
			
				$.ajax({
						type:'GET',								
						url : URLExplorateur,		
						
						contentType: "application/json",
						success: function(response) {	
							
							localStorage.setItem("Token", response.token);
							localStorage.setItem("nom", response.user);					
							window.location.replace("runes.html");
						}
				});	
		
			});
			
			//Ajout evenement CreationCompte
			$("#btnCreationCompte").click(function () 
			{	
				var URLExplorateur = URL + "explorateur";
				
				var explorateur = {};
						
				explorateur.nom = $("#name").val();
				explorateur.utilisateur = $("#username").val();
				explorateur.password = $("#password").val();
						
				var json = JSON.stringify(explorateur);	

				$.ajax({
						type:'POST',
						datatype:'json',
						url : URLExplorateur,
						data:json,
						contentType: "application/json",
						success: function(response) {	
							localStorage.setItem("Token", response.token);
							localStorage.setItem("nom", response.user);					
							window.location.replace("runes.html");
						}
				});				
			});		
	
		// Fin du IF	
			
		}
		else 
		{
		
			//Utilisateur deja connecter
			$("#Explorateur").text("Bienvenue, Explorateur " + localStorage.getItem("nom"));
			
			$("#home").append ("<br><br> <button id=\"btnDeconnexion\" >Deconnexion</button>");
			
			
			// Ajout evenement deconnexion
			$("#btnDeconnexion").click(function (){
					localStorage.clear()
					window.location.reload("index.html");
			
			});
			
		}
	
		
		
		
		
		
		
	
});
	