/* eslint-disable @typescript-eslint/ban-types */
// import exampleHandler from './handlers/exampleHandler'
import type { ServiceContext, RecorderState, ClientsConfig } from "@vtex/api";
import { Service, LRUCache, method } from "@vtex/api"

import { getBuyTogetherProducts } from './src/buytogether';
import {getTogetherProducts} from './src/together'
import { getReviews } from "./src/reviews";
import { Clients } from './clients'

const TIMEOUT_MS = 800

// Create a LRU memory cache for the Status client.
// The @vtex/api HttpClient respects Cache-Control headers and uses the provided cache.
const memoryCache = new LRUCache<string, any>({ max: 1000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // graphql
    queryGetProductTeaser: {
      timeout: 10000
    }
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    id: number
  }
}



export default new Service({
  clients,
  graphql: {
    resolvers: {
    }
  },
  routes: {
    buytogether: method({
      GET: [getBuyTogetherProducts]
    }),
    together: method({
      GET: [getTogetherProducts]
    }),
    reviews: method({
      GET: [getReviews]
    })
  }
})

