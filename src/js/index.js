const tela = document.querySelector('canvas');
const contexto = tela.getContext('2d');

tela.width = 1024
tela.height = 576

contexto.fillRect(0, 0, tela.width, tela.height)

const gravidade = 0.7

const estagio = new Sprite({
     posicao: {
          x: 0,
          y: 0
     },
     imagemSrc: './src/assets/background.png'
})
const loja = new Sprite({
     posicao: {
          x: 646,
          y: 173
     },
     imagemSrc: './src/assets/shop.png',
     escala: 2.40,
     maxFrames: 6
})

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
     },
     imagemSrc: './src/assets/samuraiMack/Idle.png',
     maxFrames: 8,
     escala: 2.5,
     alteracao: {
          x: 215,
          y: 156
     },
     animacoes: {
          parado: {
               imagemSrc: './src/assets/samuraiMack/Idle.png',
               maxFrames: 8
          },
          correndo: {
               imagemSrc: './src/assets/samuraiMack/Run.png',
               maxFrames: 8
          },
          pulando: {
               imagemSrc: './src/assets/samuraiMack/Jump.png',
               maxFrames: 2
          },
          caindo: {
               imagemSrc: './src/assets/samuraiMack/Fall.png',
               maxFrames: 2
          },
          atacando1: {
               imagemSrc: './src/assets/samuraiMack/Attack1.png',
               maxFrames: 6
          },
          atingido: {
               imagemSrc: './src/assets/samuraiMack/Take Hit.png',
               maxFrames: 4
          },
          morreu: {
               imagemSrc: './src/assets/samuraiMack/Death.png',
               maxFrames: 6
          }
     },
     areaAtaque: {
          alteracao: {
               x: 80,
               y: -20
          },
          width: 150,
          height: 150
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
     },
     imagemSrc: './src/assets/kenji/Idle.png',
     maxFrames: 4,
     escala: 2.5,
     alteracao: {
          x: 215,
          y: 171
     },
     animacoes: {
          parado: {
               imagemSrc: './src/assets/kenji/Idle.png',
               maxFrames: 4
          },
          correndo: {
               imagemSrc: './src/assets/kenji/Run.png',
               maxFrames: 8
          },
          pulando: {
               imagemSrc: './src/assets/kenji/Jump.png',
               maxFrames: 2
          },
          caindo: {
               imagemSrc: './src/assets/kenji/Fall.png',
               maxFrames: 2
          },
          atacando1: {
               imagemSrc: './src/assets/kenji/Attack1.png',
               maxFrames: 4
          },
          atingido: {
               imagemSrc: './src/assets/kenji/Take hit.png',
               maxFrames:3
          },
          morreu: {
               imagemSrc: './src/assets/kenji/Death.png',
               maxFrames: 7
          }
     },
     areaAtaque: {
          alteracao: {
               x: -160,
               y: 0
          },
          width: 160,
          height: 140
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



function animar(){
     window.requestAnimationFrame(animar)
     contexto.fillStyle = 'black'
     contexto.fillRect(0, 0, tela.width, tela.height)
     estagio.atualizar()
     loja.atualizar()
     jogador1.atualizar()
     jogador2.atualizar()

     jogador1.movimento.x = 0
     jogador2.movimento.x = 0

     //jogador 1 - movimento
     if (teclas.a.pressionado && jogador1.apertouTecla === 'a') {
          jogador1.movimento.x = -5
          jogador1.trocaAnimacao('correndo')
     } else if (teclas.d.pressionado && jogador1.apertouTecla === 'd'){
          jogador1.movimento.x = 5
          jogador1.trocaAnimacao('correndo')
     } else {
          jogador1.trocaAnimacao('parado')
     }

     if (jogador1.movimento.y < 0) {
          jogador1.trocaAnimacao('pulando')
     } else if (jogador1.movimento.y > 0){
          jogador1.trocaAnimacao('caindo')
     }
     //jogador 2 - movimento
     if (teclas.ArrowLeft.pressionado && jogador2.apertouTecla === 'ArrowLeft') {
          jogador2.movimento.x = -5
          jogador2.trocaAnimacao('correndo')
     } else if (teclas.ArrowRight.pressionado && jogador2.apertouTecla === 'ArrowRight'){
          jogador2.movimento.x = 5
          jogador2.trocaAnimacao('correndo')
     } else {
          jogador2.trocaAnimacao('parado')
     }

     if (jogador2.movimento.y < 0) {
          jogador2.trocaAnimacao('pulando')
     } else if (jogador2.movimento.y > 0){
          jogador2.trocaAnimacao('caindo')
     }

     //colisão
     if (colisaoRetangulo({
          retangulo1: jogador1,
          retangulo2: jogador2
     }) && 
          jogador1.atacando && jogador1.frameAtual === 4) {
               jogador2.atingido(20)
               jogador1.atacando = false
               document.querySelector('#vidaJogador2').style.width = jogador2.vida + '%'
     }

     if (jogador1.atacando && jogador1.frameAtual === 4) {
          jogador1.atacando = false
     }

     if (colisaoRetangulo({
          retangulo1: jogador2,
          retangulo2: jogador1
     }) && 
          jogador2.atacando && jogador2.frameAtual === 2) {
               jogador1.atingido(10)
               jogador2.atacando = false
               document.querySelector('#vidaJogador1').style.width = jogador1.vida + '%'
     }

     if (jogador2.atacando && jogador2.frameAtual === 2) {
          jogador2.atacando = false
     }

     //terminar o jogo baseado na vida
     if (jogador2.vida <= 0 || jogador1.vida <= 0) {
          document.querySelector('#texto-resultado').style.display = 'flex'
          escolheVencedor({jogador1, jogador2, tempoId})
     }
}


tempoRegressivo()

animar()

window.addEventListener('keydown', (Event) => {
     if (!jogador1.morto) {
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
                    if (jogador1.posicao.y == 331){
                         jogador1.movimento.y = -19
                    break;
                    } break;

               case ' ':
                    if (jogador1.podeAtacar) {
                         jogador1.ataque()
                    break;
                    }
          }
     }
     if (!jogador2.morto) {
          switch (Event.key) {
               case 'ArrowRight':
                    teclas.ArrowRight.pressionado = true
                    jogador2.apertouTecla = 'ArrowRight'
                    break;
               case 'ArrowLeft':
                    teclas.ArrowLeft.pressionado = true
                    jogador2.apertouTecla = 'ArrowLeft'
                    break;
               case 'ArrowUp':
                    if (jogador2.posicao.y == 331) {
                         jogador2.movimento.y = -19
                    break;
                    } break;

               case '0':
                    if (jogador2.podeAtacar) {
                         jogador2.ataque()
                    break;
                    }
          }
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
