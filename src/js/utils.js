function colisaoRetangulo({retangulo1, retangulo2}) {
     return (
          retangulo1.areaAtaque.posicao.x + retangulo1.areaAtaque.width >= retangulo2.posicao.x &&
          retangulo1.areaAtaque.posicao.x <= retangulo2.posicao.x + retangulo2.largura &&
          retangulo1.areaAtaque.posicao.y + retangulo1.areaAtaque.height >= retangulo2.posicao.y &&
          retangulo1.areaAtaque.posicao.y <= retangulo2.posicao.y + retangulo2.altura
          )
}

function escolheVencedor({jogador1, jogador2, tempoId}) {
     clearTimeout(tempoId)
     if (jogador1.vida === jogador2.vida){
          document.querySelector('#texto-resultado').innerHTML = 'Empate';
     } else if (jogador1.vida > jogador2.vida) {
          document.querySelector('#texto-resultado').innerHTML = 'Jogador 1 Vence'
     } else if (jogador1.vida < jogador2.vida) {
          document.querySelector('#texto-resultado').innerHTML = 'Jogador 2 Vence'
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
          jogador1.invul = true
          jogador2.invul = true
          document.querySelector('#texto-resultado').style.display = 'flex'
          escolheVencedor({jogador1,jogador2,tempoId})
     }
     
}
