export class Profissional {
  id: number
  nome: string
  endereco: string
  // tslint:disable-next-line: variable-name
  estabelecimento_id: number

  constructor(nome, endereco, estabelecimento_id){
    this.nome = nome
    this.endereco = endereco
    this.estabelecimento_id = estabelecimento_id
  }
}
