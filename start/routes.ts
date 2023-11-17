/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
const favoritos=[{id:1, nome: 'google', url: "http://www.google.com",importante:true}]
import { http } from 'Config/app'

Route.get('/', async () => {
  return { app: 'favio-back' }
})

Route.get('/favoritos', async () => {
  return favoritos
})

Route.get('/favoritos/:id', async ({params}) => {
  let favoritoencontrado=favoritos.find((favorito)=>favorito.id==params.id)
  //retorna o objeto caso exista, senao retornar objeto vazio ()
  if favoritoencontrado==undefined
    return {msg: 'favorito não encontrado'}
  return favoritoencontrado
})
Route.get('/favoritos/:nome', async ({params}) => {
  return {id:1,nome: params.nome, url: "http://www.google.com",importante:true}
})