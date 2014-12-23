$(document).ready(function() {	

	var URL = "https://inox-mpariseaucstj.c9.io/";
	
			
		
		
		if(localStorage.getItem("nom") === null )
		{
		
		
			
			
			// S'il y a pas d'utilisateur connecter on affiche la connection et la cr�ation d'un compte
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
					" <p>Cr�ation d'un compte </p>" +					
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
			// Ajout �v�nement du bouton Connexion
			$("#btnConnexion").click(function () {
			
				
				var explorateur = {};				
				
				explorateur.utilisateur = $("#usernameConnexion").val();
				explorateur.password = $("#passwordConnexion").val();	
				
				var URLExplorateur = URL + "explorateurs?utilisateur=" + explorateur.utilisateur +"&password="+ explorateur.password;
				
				
			
				$.ajax({
				
						type:'GET',								
						url : URLExplorateur,	
						
						contentType: "application/json",
						success: function(response) {	
								localStorage.setItem("Token", response.token);
								localStorage.setItem("nom", response.user);					
								window.location.replace("runes.html");
						},
						error: function(xhr, ajaxOptions, thrownError)
						{
							var err = eval("(" + xhr.responseText + ")");
							alert(err.message);
						}
				});	
			
				
				
			});
			
			//Ajout �v�nement CreationCompte
			$("#btnCreationCompte").click(function () 
			{	
				var URLExplorateur = URL + "explorateurs";
				var explorateur = {};
				
				//v�rification du mot de passe pour voir s'il identique
				
				if($("#confirmationpassword").val() ==$("#password").val())
				{
					
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
							},
							error: function(xhr, ajaxOptions, thrownError)
							{
								
								var err = JSON.parse( (xhr.responseText) );
								
								if(err.message.code == 'ER_DUP_ENTRY')
								{
									alert('Nom d\'utilisateur d�j� utilis�');
								}
								else
									alert('Probl�mes avec le serveur, veuillez r�essayer plus tard.');
								
								
							}
					});	
				}
				else
				{
					alert("Les mots de passe ne sont pas identiques.");
				}
			});		
			
		}
		else 
		{
		
			//Utilisateur d�j� connecter alors on offre la d�connection
			$("#Explorateur").text("Bienvenue, Explorateur " + localStorage.getItem("nom"));
			
			$("#home").append ("<br><br> <button id=\"btnDeconnexion\" >Deconnexion</button>");
			
			
			// Ajout �v�nement d�connexion et on vide la localStorage
			$("#btnDeconnexion").click(function (){
					localStorage.clear()
					window.location.reload("index.html");
			
			});
			
		}
	
		//Event pour la Touche Entrer, Connexion
		$('#usernameConnexion').keypress(function(event)
		{
			var keycode =  event.which;
			if(keycode == '13'){
				 $('#btnConnexion').trigger('click');
			}
		});
		$('#passwordConnexion').keypress(function(event)
		{
			var keycode =  event.which;
			if(keycode == '13'){
				 $('#btnConnexion').trigger('click');
			}
		});
		
		
		//Event pour la Touche Entrer, Creation Compte
		$('#name').keypress(function(event)
		{
			var keycode =  event.which;
			if(keycode == '13'){
				 $('#btnCreationCompte').trigger('click');
			}
		});
		$('#username').keypress(function(event)
		{
			var keycode =  event.which;
			if(keycode == '13'){
				 $('#btnCreationCompte').trigger('click');
			}
		});
		$('#password').keypress(function(event)
		{
			var keycode =  event.which;
			if(keycode == '13'){
				 $('#btnCreationCompte').trigger('click');
			}
		});
		$('#confirmationpassword').keypress(function(event)
		{
			var keycode =  event.which;
			if(keycode == '13'){
				 $('#btnCreationCompte').trigger('click');
			}
		});
	
});
	