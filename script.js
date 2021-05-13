class Perguntas{
	
	escolherPergunta(pergunta, alternativas, resposta){

		var random = Math.ceil(Math.random() * (pergunta.length - 1))

		for (var i = 1; i < pergunta.length; i++) {
			if(random == i){
				let mostrarPergunta = new MostrarPergunta(pergunta[i], alternativas[i], resposta[i])
				mostrarPergunta.colocarHtml()
			}else{
				continue
			}
		}
		
	}

	perguntasSalvas(){
		let perguntas = Array()

		perguntas['titulo'] = [
			'zero',
			'O que é via láctea?',
			'Qual é o animal que representa o signo de touro?',
			'Cipó é:',
			'Qual desses símbolos significa quilômetro?',
			'De quem é a famosa frase “Penso, logo existo”?',
			'De onde é a invenção do chuveiro elétrico?',
			'Quais o menor e o maior país do mundo?',
			'Qual o nome do presidente do Brasil que ficou conhecido como Jango?',
			'Qual o livro mais vendido no mundo a seguir à Bíblia?',
			'Quantas casas decimais tem o número pi?',
			'O que a palavra legend significa em português?'
		]

		perguntas['alternativas'] = [
			'zero',
			['zero', 'Marca de leite', 'Civilização antiga', 'Carro', 'Galáxia'],
			['zero', 'Hipopótamo', 'Cavalo', 'Touro', 'Galo'],
			['zero', 'Uma comida', 'Um mineral', 'Uma planta', 'Um animal'],
			['zero', 'KD', 'KM', 'KK', 'KG'],
			['zero', 'Platão', 'Galileu Galilei', 'Descartes', 'Sócrates'],
			['zero', 'França', 'Inglaterra', 'Brasil', 'Austrália'],
			['zero', 'Vaticano e Rússia', 'Nauru e Rússia', 'Malta e Estados Unidos', 'São Marino e Índia'],
			['zero', 'Jânio Quadros', 'João Goulart', 'Getúlio Vargas', 'João Figueiredo'],
			['zero', 'O Senhor dos Anéis', 'O Pequeno Príncipe', 'Dom Quixote', 'Ela, a Feiticeira'],
			['zero', 'Centenas', 'Infinitas', 'Vinte', 'Milhares'],
			['zero', 'Legenda', 'Lenda', 'Legendário', 'História'],
		]

		perguntas['resposta'] = [
			'zero',
		 	'Galáxia',
		  	'Touro',
		   	'Uma planta',
		   	'KM',
		   	'Descartes',
		   	'Brasil',
		   	'Vaticano e Rússia',
		   	'João Goulart',
		   	'Dom Quixote',
		   	'Infinitas',
		   	'Lenda'
	   	]

		// perguntas['titulo'].push()
		// perguntas['alternativas'].push([])
		// perguntas['resposta'].push()

		for (var i = 1; i <= 4; i++) {
			let respostasHTML = document.getElementById('resposta' + i)
			respostasHTML.disabled = false;
			respostasHTML.style.cursor = 'pointer'

		}

		this.escolherPergunta(perguntas['titulo'], perguntas['alternativas'], perguntas['resposta'])
		return perguntas['resposta'] 
	}
}


class MostrarPergunta{
	constructor(pergunta, alternativas, resposta){
		this.pergunta = pergunta
		this.alternativas = alternativas
		this.resposta = resposta
	}

	colocarHtml(){
		document.getElementById('perguntaTitulo').innerHTML = this.pergunta

		let random = new PosicaoRandom()

		let numeros = random.gerar()

		for (var i = 3; i >= 0; i--) {
			document.getElementById('resposta' + numeros[i] ).innerHTML = this.alternativas[i+1]	
		}

		return this.resposta
	}
}

class PosicaoRandom{

	gerar(){

		let numeros = []

		for (var i = 30; i >= 0; i--) {
			let random = Math.ceil(Math.random() * 4)

			if(numeros.includes(random)){
				continue
			}else{
				numeros.push(random)
			}
		}

		return numeros

	}
}


class verifResposta{
	constructor(respostaMarcada, respostas){
		this.respostaMarcada = respostaMarcada
		this.respostas = respostas
	}

	verificarRespCorreta(){
		let posicaoAlternativas = []

		let acertou = false

		for (var i = 1; i <= 4; i++) {
			let respostasHTML = document.getElementById('resposta' + i)

			posicaoAlternativas.push(respostasHTML.innerHTML)

			respostasHTML.style.backgroundColor = 'red'
		}

		for (var i = 1; i < this.respostas.length; i++) {
			if(this.respostas[i] == this.respostaMarcada){
				acertou = true
			}

			if(posicaoAlternativas.includes(this.respostas[i])){
				let corVerde = posicaoAlternativas.indexOf(this.respostas[i])
				document.getElementById('resposta' + (corVerde + 1)).style.backgroundColor = 'green'
			}else{
				continue
			}
		}

		this.mostrarErrouAcertou(acertou)
	}

	mostrarErrouAcertou(acertou){
		let score = new Score(1)

		if(acertou){
			score.aumentarScore()
			console.log('Resposta correta')
		}else{
			score.zerarScore()
			console.log('Resposta incorreta')
		}

		for (var i = 1; i <= 4; i++) {
			let respostasHTML = document.getElementById('resposta' + i)
			respostasHTML.disabled = true
			respostasHTML.style.cursor = 'no-drop'
		}

		setTimeout(function(){

			for (var i = 1; i <= 4; i++) {
				let respostasHTML = document.getElementById('resposta' + i)
				respostasHTML.style.backgroundColor = 'rgb(36,36,36)'
			}

			perguntas.perguntasSalvas(); 

		}, 1800)
	}

}

class Score{
	constructor(adicionarPonto){
		this.adicionarPonto = adicionarPonto
	}

	aumentarScore(){
		let score = document.getElementById('score').innerHTML

		score = parseInt(score.slice(7)) + this.adicionarPonto

		document.getElementById('score').innerHTML = `Score: ${score}`
	}

	zerarScore(){
		document.getElementById('score').innerHTML = 'Score: 0'
	}
}


class Responder{
	resposta(respostaMarcada){

		let respostasCertas = perguntasSalvas
	 	let resposta = new verifResposta(respostaMarcada, respostasCertas)

		resposta.verificarRespCorreta()
	}
}


let perguntas = new Perguntas()

let perguntasSalvas = perguntas.perguntasSalvas() //inicia o quiz

let responder = new Responder()







