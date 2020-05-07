export class Estabelecimento {
  id: number
  nome: string
  endereco: string

  constructor(nome: string, endereco: string){
    this.nome = nome
    this.endereco = endereco
  }
}
