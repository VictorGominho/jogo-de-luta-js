const tela = document.querySelector('canvas');
const contexto = tela.getContext('2d');

tela.width = 1024
tela.height = 576

contexto.fillRect(0, 0, tela.width, tela.height)

const gravidade = 0.7

class Personagem {
     constructor({posicao, movimento, cor, alteracao}) {
          this.posicao = posicao
          this.movimento = movimento
          this.altura = 150
          this.largura = 50
          this.apertouTecla
          this.areaAtaque = {
               posicao: {
                    x: this.posicao.x,
                    y: this.posicao.y
               },
               alteracao,
               height: 50,
               width: 100
          }
          this.cor = cor
          this.atacando
          this.vida = 100
     }

     desenhar() {
          //personagem
          contexto.fillStyle = this.cor
          contexto.fillRect(this.posicao.x, this.posicao.y, 50, this.altura)

          //ataque
          if (this.atacando) {
               contexto.fillStyle = 'green'
               contexto.fillRect(
                    this.areaAtaque.posicao.x, 
                    this.areaAtaque.posicao.y, 
                    this.areaAtaque.width, 
                    this.areaAtaque.height)
          }
     }

     atualizar() {
          this.desenhar()
          this.areaAtaque.posicao.x = this.posicao.x + this.areaAtaque.alteracao.x
          this.areaAtaque.posicao.y = this.posicao.y
          this.posicao.x += this.movimento.x
          this.posicao.y += this.movimento.y

          if (this.posicao.y + this.altura + this.movimento.y >= tela.height) {
               this.movimento.y = 0
          } else {
               this.movimento.y += gravidade
          }

     }

     ataque() {
          this.atacando = true
          setTimeout(() => {
               this.atacando = false
          }, 100);
     }
}

const jogador1 = new Personagem({
     posicao: {
          x: 0,
          y: 0
     },
     movimento: {
          x: 0,
          y: 0
     },
     cor: 'red',
     alteracao: {
          x: 0,
          y: 0
     }
})

const jogador2 = new Personagem({
     posicao: {
          x: 400,
          y: 100
     },
     movimento: {
          x: 0,
          y: 0
     },
     cor: 'blue',
     alteracao: {
          x: -50,
          y: 0
     }
})

const teclas = {
     a: {
          pressionado: false
     },
     d: {
          pressionado: false
     },
     w: {
          pressionado: false
     },
     ArrowRight: {
          pressionado: false
     },
     ArrowLeft: {
          pressionado: false
     },
     ArrowUp: {
          pressionado: false
     }
}

function colisaoRetangulo({retangulo1, retangulo2}) {
     return (
          retangulo1.areaAtaque.posicao.x + retangulo1.areaAtaque.width >= retangulo2.posicao.x &&
          retangulo1.areaAtaque.posicao.x <= retangulo2.posicao.x + retangulo2.largura &&
          retangulo1.areaAtaque.posicao.y + retangulo1.areaAtaque.height >= retangulo2.posicao.y &&
          retangulo1.areaAtaque.posicao.y <= retangulo2.posicao.y + retangulo2.altura
          )
}

function animar(){
     window.requestAnimationFrame(animar)
     contexto.fillStyle = 'black'
     contexto.fillRect(0, 0, tela.width, tela.height)
     jogador1.atualizar()
     jogador2.atualizar()

     jogador1.movimento.x = 0
     jogador2.movimento.x = 0

     if (teclas.a.pressionado && jogador1.apertouTecla === 'a') {
          jogador1.movimento.x = -4
     } else if (teclas.d.pressionado && jogador1.apertouTecla === 'd'){
          jogador1.movimento.x = 4
     }

     if (teclas.ArrowLeft.pressionado && jogador2.apertouTecla === 'ArrowLeft') {
          jogador2.movimento.x = -4
     } else if (teclas.ArrowRight.pressionado && jogador2.apertouTecla === 'ArrowRight'){
          jogador2.movimento.x = 4
     }

     //colisão
     if (colisaoRetangulo({
          retangulo1: jogador1,
          retangulo2: jogador2
     }) && 
          jogador1.atacando) {
               jogador1.atacando = false
               jogador2.vida -= 20
               document.querySelector('#vidaJogador2').style.width = jogador2.vida + '%'
     }

     if (colisaoRetangulo({
          retangulo1: jogador2,
          retangulo2: jogador1
     }) && 
          jogador2.atacando) {
               jogador2.atacando = false
               jogador1.vida -= 20
               document.querySelector('#vidaJogador1').style.width = jogador1.vida + '%'
     }

     //terminar o jogo baseado na vida
     if (jogador2.vida <= 0 || jogador1.vida <= 0) {
          document.querySelector('#texto-resultado').style.display = 'flex'
          escolheVencedor({jogador1, jogador2, tempoId})
     }
}

function escolheVencedor({jogador1, jogador2, tempoId}) {
     clearTimeout(tempoId)
     if (jogador1.vida === jogador2.vida){
          document.querySelector('#texto-resultado').innerHTML = 'Empate';
     } else if (jogador1.vida > jogador2.vida) {
          document.querySelector('#texto-resultado').innerHTML = 'Jogador 1 Vence!'
     } else if (jogador1.vida < jogador2.vida) {
          document.querySelector('#texto-resultado').innerHTML = 'Jogador 2 Vence!'
     }
}

let tempo = 60
let tempoId
function tempoRegressivo() {
     if (tempo > 0) {
          tempoId = setTimeout(tempoRegressivo, 1000)
          tempo --
          document.querySelector('#tempo').innerHTML = tempo
     }
     if (tempo === 0) {
          document.querySelector('#texto-resultado').style.display = 'flex'
          escolheVencedor({jogador1,jogador2,tempoId})
     }
     
}

tempoRegressivo()

animar()

window.addEventListener('keydown', (Event) => {
     switch (Event.key) {
          case 'd':
               teclas.d.pressionado = true
               jogador1.apertouTecla = 'd'
               break;
          case 'a':
               teclas.a.pressionado = true
               jogador1.apertouTecla = 'a'
               break;
          case 'w':
               jogador1.movimento.y = -19
               break;
          case ' ':
               jogador1.ataque()
               break;

          case 'ArrowRight':
               teclas.ArrowRight.pressionado = true
               jogador2.apertouTecla = 'ArrowRight'
               break;
          case 'ArrowLeft':
               teclas.ArrowLeft.pressionado = true
               jogador2.apertouTecla = 'ArrowLeft'
               break;
          case 'ArrowUp':
               jogador2.movimento.y = -19
               break;
          case '0':
               jogador2.ataque()
               break;

     }

})

window.addEventListener('keyup', (Event) => {
     switch (Event.key) {
          case 'd':
               teclas.d.pressionado = false
               break;
          case 'a':
               teclas.a.pressionado = false
               break;

          case 'ArrowRight':
               teclas.ArrowRight.pressionado = false
               break;
          case 'ArrowLeft':
               teclas.ArrowLeft.pressionado = false
               break;
     }

})
