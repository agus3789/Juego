var http=require('http');
var url=require('url');
var fs=require('fs');
var querystring = require('querystring');

var mime = {
   'html' : 'text/html',
   'css'  : 'text/css',
   'png'  : 'image/png',
   'ico'  : 'image/x-icon',
   'mp3'  :	'audio/mpeg3',
   'mp4'  : 'video/mp4'
};

var servidor=http.createServer(function(pedido,respuesta){
    var objetourl = url.parse(pedido.url);
	var camino='public'+objetourl.pathname;
	if (camino=='public/')
		camino='public/index.html';
	encaminar(pedido,respuesta,camino);
});

var server_port = process.env.YOUR_PORT || process.env.PORT || 8888;
var server_host = process.env.YOUR_HOST || '0.0.0.0';
servidor.listen(server_port, server_host, function() {
    console.log('Listening on port %d', server_port);
});


function encaminar (pedido,respuesta,camino) {
	console.log(camino);
	switch (camino) {
		case 'public/recuperardatos': {
			recuperar(pedido,respuesta);
			break;
		}	
	    default : {  
			fs.exists(camino,function(existe){
				if (existe) {
					fs.readFile(camino,function(error,contenido){
						if (error) {
							respuesta.writeHead(500, {'Content-Type': 'text/plain'});
							respuesta.write('Error interno');
							respuesta.end();					
						} else {
							var vec = camino.split('.');
							var extension=vec[vec.length-1];
							var mimearchivo=mime[extension];
							respuesta.writeHead(200, {'Content-Type': mimearchivo});
							respuesta.write(contenido);
							respuesta.end();
						}
					});
				} else {
					respuesta.writeHead(404, {'Content-Type': 'text/html'});
					respuesta.write('<!doctype html><html><head></head><body>Recurso inexistente</body></html>');		
					respuesta.end();
				}
			});	
		}
	}	
}


function recuperar(pedido,respuesta, num) {
    var info = '';
    pedido.on('data', function(datosparciales){
         info += datosparciales;
    });
    pedido.on('end', function(){
		num = Mathrandom(1,4);
		var formulario = querystring.parse(info);
		var res1 = formulario['nombre'];
		respuesta.writeHead(200, {'Content-Type': 'text/html'});
		var pagina=`<!doctype html><html><head>
		<head>
	<title>TP juego</title>
	<meta charset="UTF-8">
	 
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
  </head>
		
		 <body style="background-color:#CECECE">
		 <div class="jumbotron text-center">
      		<h1>PIedra, Papel o Tijera</h1>
		 </div><center>
		 <br>
		 <br>
		 <h3>
		 ${Retornar(res1, num)}
		 </h3>
		 </center>
		 <br>
		 <center>
		  <a href="index.html"  class="btn btn-info">Volver</button></a>
		  </center>
	</body></html>`;
		respuesta.end(pagina);
    });	
}

	function Mathrandom(min, max) 
	{
	 var num = Math.floor(Math.random() * (4 - 1) + 1);
	 return num;	
	}

	function Retornar(res1, num)
	{
	
		num = parseInt(num);
		var resp;
		//1 piedra, 2 papel, 3 tijeras
		if(num==1 && res1=="a")
		{
			resp = "You Win! la maquina eligio Piedra";
		}
		if(num==2 && res1=="t")
		{
			resp = "You Win! la maquina eligio Papel";
		}
		if(num==3 && res1=="p")
		{
			resp = "You Win! la maquina eligio Tijeras";
		}
		if(num==1 && res1=="t")
		{
			resp = "You Lose! la maquina eligio Piedra";
		}
		if(num==2 && res1=="p")
		{
			resp = "You Lose! la maquina eligio Papel";
		}
		if(num==3 && res1=="a")
		{
			resp = "You Lose! la maquina eligio Tijeras";
		}
		if(num==1 && res1=="p")
		{
			resp = "Draw!";
		}
		if(num==2 && res1=="a")
		{
			resp = "Draw!";
		}
		if(num==3 && res1=="t")
		{
			resp = "Draw!";
		}
		return resp;
	}
	 

console.log('Servidor web iniciado');