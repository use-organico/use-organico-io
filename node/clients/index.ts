import { IOClients } from '@vtex/api'
import { GetProductsBuyTogether } from './Queries/getProductsBuytogether'
import { GetBuyTogether } from './Queries/getBuyTogether'
import { GetReviews } from './Queries/getReviews'

export class Clients extends IOClients {
  //graphql config
  public get getProductsBuyTogether() {
    return this.getOrSet('getProductsBuyTogether', GetProductsBuyTogether)
  }
  public get GetBuyTogether() {
    return this.getOrSet('GetBuyTogether', GetBuyTogether)
  }
  public get GetReviews() {
    return this.getOrSet('GetReviews', GetReviews)
  }
}
