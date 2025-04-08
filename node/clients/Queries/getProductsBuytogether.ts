import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api";

export class GetProductsBuyTogether extends ExternalClient {
   public constructor(ctx: IOContext, options?: InstanceOptions) {
        super("http://licensemanager.vtex.com.br/api/pvt/accounts", ctx, {
            ...options,
            headers: {
               // 'X-VTEX-API-AppKey': `vtexappkey-emania-ARTSXY`,
               // 'X-VTEX-API-AppToken': 'PWLUIJVFKBQLOSHOXRPCAVUAXKVKLFDNLAUWOBMGEPCXHWVCHHPTKPCGVKUBEEQCTSLGTPEDPQCKRKOASPCMDBJABEZAEIRAUAAHSUBQLAABJKBRQNUPGTGRXMJZXBBB'
               // 'X-VTEX-API-AppKey': 'vtexappkey-brmotorolanew-TSKDFR',
               // 'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI',
                ...(options && options.headers),
                ...(ctx.adminUserAuthToken
                    ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
                    : null)
            },
        });
   }

   public async getProducts() {
      const url = `https://ioemania.vtexcommercestable.com.br/api/catalog_system/pvt/brand/pagedlist`;
      const { data } = await this.http.getRaw(url, {
         headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-VTEX-API-AppKey': `vtexappkey-emania-ARTSXY`,
            'X-VTEX-API-AppToken': 'PWLUIJVFKBQLOSHOXRPCAVUAXKVKLFDNLAUWOBMGEPCXHWVCHHPTKPCGVKUBEEQCTSLGTPEDPQCKRKOASPCMDBJABEZAEIRAUAAHSUBQLAABJKBRQNUPGTGRXMJZXBBB'
         }
      });
      // const urlType = `https://ioemania.vtexcommercestable.com.br/api/catalog_system/pub/products/search?ft=camera`;
      // const { data } = await this.http.getRaw(urlType, {
      //    headers: { 
      //       'Content-Type': 'application/json',
      //       'Accept': 'application/json'
      //    }
      // })
      return data;
   }
}