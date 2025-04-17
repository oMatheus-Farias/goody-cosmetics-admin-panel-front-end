export class UpdateError extends Error {
  constructor(message = 'Erro ao atualizar') {
    super(message)
    this.name = 'UpdateError'
  }
}
