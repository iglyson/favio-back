import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
let favoritos=[{id:1, nome:'google',
  url: 'http://www.google.com.br',
  importante:true
  }]
export default class FavoritosController {
  

  public async index({}: HttpContextContract) {
    return 
  }

  public async store({request,response}: HttpContextContract) {
    const{nome,url,importante}=request.body()
    const newFavorito={id:favoritos.length+1,nome,url,importante}  
    favoritos.push(newFavorito)
    return response.status(201).send(newFavorito)
  }

  public async show({params,response}: HttpContextContract) {
    let favoritoencontrado = favoritos.find((favorito) => favorito.id == params.id)
  //retorna o objeto caso exista, senao retornar objeto vazio ()
  if favoritoencontrado == undefined
    return response.status(404)
  return favoritoencontrado
  }

  public async update({request,params,response}: HttpContextContract) {
    const{nome,url,importante}=request.body()
    let favoritoencontrado = favoritos.find((favorito) => favorito.id == params.id)
    if(!favoritoencontrado)
      return response.status(404)
    favoritoencontrado.nome=nome
    favoritoencontrado.url=url
    favoritoencontrado.importante=importante

    favoritos[params.id]=favoritoencontrado
    return response.status(200).send(favoritoencontrado)
  }

  public async destroy({params,response}: HttpContextContract) {
    let favoritoencontrado=favoritos.find((favorito)=>favorito.id==params.id)
    if(!favoritoencontrado)
      return response.status(404)
    favoritos.splice(favoritos.indexOf(favoritoencontrado),1)
    return response.status(204)
  }
}
