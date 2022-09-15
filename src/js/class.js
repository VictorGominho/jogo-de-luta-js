class Sprite {
     constructor({posicao, imagemSrc, escala = 1, maxFrames = 1, alteracao = {x:0,y:0}}) {
          this.posicao = posicao
          this.altura = 150
          this.largura = 50
          this.imagem = new Image()
          this.imagem.src = imagemSrc
          this.escala = escala
          this.maxFrames = maxFrames
          this.frameAtual = 0
          this.framesPassados = 0
          this.frameParar = 6
          this.alteracao = alteracao
     }

     desenhar() {
          contexto.drawImage(
               this.imagem,
               this.frameAtual * (this.imagem.width / this.maxFrames),
               0,
               this.imagem.width / this.maxFrames,
               this.imagem.height,
               this.posicao.x - this.alteracao.x,
               this.posicao.y - this.alteracao.y,
               (this.imagem.width / this.maxFrames) * this.escala,
               this.imagem.height * this.escala
               )
     }

     animarFrames() {
          this.framesPassados++

          if(this.framesPassados % this.frameParar === 0) {
               if (this.frameAtual < this.maxFrames - 1){
                    this.frameAtual++
               } else {
                    this.frameAtual = 0
               }
          } 
     }

     atualizar() {
          this.desenhar()
          this.animarFrames()
     }
}

class Personagem extends Sprite {
     constructor({posicao, movimento, cor, imagemSrc, escala = 1, maxFrames = 1, alteracao = {x:0,y:0}, animacoes, areaAtaque = {alteracao: {}, width: undefined, height: undefined}}) {
          super({
               posicao,
               imagemSrc,
               escala,
               maxFrames,
               alteracao 
          })

          this.movimento = movimento
          this.altura = 150
          this.largura = 50
          this.apertouTecla
          this.areaAtaque = {
               posicao: {
                    x: this.posicao.x,
                    y: this.posicao.y
               },
               alteracao: areaAtaque.alteracao,
               height: areaAtaque.height,
               width: areaAtaque.width
          }
          this.cor = cor
          this.atacando
          this.vida = 100
          this.frameAtual = 0
          this.framesPassados = 0
          this.frameParar = 6
          this.animacoes = animacoes
          this.podeAtacar = true
          this.morto = false

          for (const frame in this.animacoes) {
               animacoes[frame].imagem = new Image()
               animacoes[frame].imagem.src = animacoes[frame].imagemSrc
          }
     }

     atualizar() {
          this.desenhar()
          if (!this.morto) this.animarFrames()
          
          this.areaAtaque.posicao.x = this.posicao.x + this.areaAtaque.alteracao.x
          this.areaAtaque.posicao.y = this.posicao.y + this.areaAtaque.alteracao.y

          //contexto.fillRect(this.areaAtaque.posicao.x , this.areaAtaque.posicao.y,
               //this.areaAtaque.width, this.areaAtaque.height)

          this.posicao.x += this.movimento.x
          this.posicao.y += this.movimento.y

          if (this.atacando) {
               this.podeAtacar = false
          } else this.podeAtacar = true

          if (this.posicao.y + this.altura + this.movimento.y >= tela.height - 95) {
               this.movimento.y = 0
               this.posicao.y = 331
          } else {
               this.movimento.y += gravidade
          }

     }

     ataque() {
          this.trocaAnimacao('atacando1')
          this.atacando = true
     }

     atingido(dano) {
          this.vida -= dano

          if (this.vida <= 0) {
               this.trocaAnimacao('morreu')
          } else this.trocaAnimacao('atingido')
     }
     
     trocaAnimacao(animacoes) {
          //prioriza animação de morte
          if (this.imagem === this.animacoes.morreu.imagem) {
               if (this.frameAtual === this.animacoes.morreu.maxFrames - 1) this.morto = true
               return
          }

          //prioriza animação de ataque
          if (this.imagem === this.animacoes.atacando1.imagem &&
               this.frameAtual < this.animacoes.atacando1.maxFrames -1) return
          
          //prioriza animação de atingido
          if (this.imagem === this.animacoes.atingido.imagem && 
               this.frameAtual < this.animacoes.atingido.maxFrames - 1) return

          switch (animacoes) {
               case 'parado':
                    if (this.imagem !== this.animacoes.parado.imagem) {
                         this.imagem = this.animacoes.parado.imagem
                         this.maxFrames = this.animacoes.parado.maxFrames
                         this.frameAtual = 0
                    }  
                    break
               case 'correndo':
                    if (this.imagem !== this.animacoes.correndo.imagem) {
                         this.imagem = this.animacoes.correndo.imagem
                         this.maxFrames = this.animacoes.correndo.maxFrames
                         this.frameAtual = 0
                    }
                    break
               case 'pulando':
                    if (this.imagem !== this.animacoes.pulando.imagem) {
                         this.imagem = this.animacoes.pulando.imagem
                         this.maxFrames = this.animacoes.pulando.maxFrames
                         this.frameAtual = 0
                    }
               case 'caindo':
                    if (this.imagem !== this.animacoes.caindo.imagem) {
                         this.imagem = this.animacoes.caindo.imagem
                         this.maxFrames = this.animacoes.caindo.maxFrames
                         this.frameAtual = 0
                    }
                    break
               case 'atacando1':
                    if (this.imagem !== this.animacoes.atacando1.imagem) {
                         this.imagem = this.animacoes.atacando1.imagem
                         this.maxFrames = this.animacoes.atacando1.maxFrames
                         this.frameAtual = 0
                    }
                    break
               case 'atingido':
                    if (this.imagem !== this.animacoes.atingido.imagem) {
                         this.imagem = this.animacoes.atingido.imagem
                         this.maxFrames = this.animacoes.atingido.maxFrames
                         this.frameAtual = 0
                    }
                    break
               case 'morreu':
                    if (this.imagem !== this.animacoes.morreu.imagem) {
                         this.imagem = this.animacoes.morreu.imagem
                         this.maxFrames = this.animacoes.morreu.maxFrames
                         this.frameAtual = 0
                    }
                    break
          }
     }
     
}
