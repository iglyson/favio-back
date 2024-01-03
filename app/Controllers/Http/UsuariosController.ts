import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Usuario from 'App/Models/Usuario'
import { DateTime } from 'luxon'
import { md5 } from 'js-md5'

export default class UsuariosController {
  
  public async index({}: HttpContextContract) {
    return Usuario.all()
  }

  public async store({request,response}: HttpContextContract) {
    const{nome,cpf,senha}=request.body()
    const newUsuario={nome,cpf,senha}
    const novasenha = md5(senha)
    newUsuario.senha = novasenha
    Usuario.create(newUsuario)
    return response.status(201).send(newUsuario)
  }

  public async show({params,response}: HttpContextContract) {
    let usuarioencontrado=await Usuario.findByOrFail('id',params.id)
  //retorna o objeto caso exista, senao retornar objeto vazio ()
  if (usuarioencontrado == undefined)
    return response.status(404)
  return usuarioencontrado
  }

  public async update({request,params,response}: HttpContextContract) {
    const{nome,cpf,senha}=request.body()
    let usuarioencontrado=await Usuario.findByOrFail('id',params.id)
    if(!usuarioencontrado)
      return response.status(404)
    usuarioencontrado.nome=nome
    usuarioencontrado.cpf=cpf
    usuarioencontrado.senha=senha

    await usuarioencontrado.save()
    await usuarioencontrado.merge({updatedAt:DateTime.local()}).save()
    return response.status(200).send(usuarioencontrado)
  }

  public async destroy({params,response}: HttpContextContract) {
    let usuarioencontrado=await Usuario.findByOrFail('id',params.id)
    if(!usuarioencontrado)
      return response.status(404)

    usuarioencontrado.delete()
    return response.status(204)
  }
}
