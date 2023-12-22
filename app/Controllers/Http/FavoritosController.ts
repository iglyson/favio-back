import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Favorito from 'App/Models/Favorito'
import { DateTime } from 'luxon'

export default class FavoritosController {
  

  public async index({}: HttpContextContract) {
    return Favorito.all()
  }

  public async store({request,response}: HttpContextContract) {
    const{nome,url,importante}=request.body()
    const newFavorito={nome,url,importante}
    Favorito.create(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({params,response}: HttpContextContract) {
    let favoritoencontrado=await Favorito.findByOrFail('id',params.id)
  //retorna o objeto caso exista, senao retornar objeto vazio ()
  if (favoritoencontrado == undefined)
    return response.status(404)
  return favoritoencontrado
  }

  public async update({request,params,response}: HttpContextContract) {
    const{nome,url,importante}=request.body()
    let favoritoencontrado=await Favorito.findByOrFail('id',params.id)
    if(!favoritoencontrado)
      return response.status(404)
    favoritoencontrado.nome=nome
    favoritoencontrado.url=url
    favoritoencontrado.importante=importante

    await favoritoencontrado.save()
    await favoritoencontrado.merge({updatedAt:DateTime.local()}).save()
    return response.status(200).send(favoritoencontrado)
  }

  public async destroy({params,response}: HttpContextContract) {
    let favoritoencontrado=await Favorito.findByOrFail('id',params.id)
    if(!favoritoencontrado)
      return response.status(404)

    favoritoencontrado.delete()
    return response.status(204)
  }
}
