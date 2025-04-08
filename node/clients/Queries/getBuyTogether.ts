import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api";

export class GetBuyTogether extends ExternalClient {
    public constructor(ctx: IOContext, options?: InstanceOptions) {
        super("http://licensemanager.vtex.com.br/api/pvt/accounts", ctx, {
            ...options,
            headers: {
               // 'X-VTEX-API-AppKey': 'vtexappkey-brmotorolanew-TSKDFR',
               // 'X-VTEX-API-AppToken': 'RIENUZAYFONEVTFVBCIPNNQHIGQBWWYXNCXSTCRKOKVAYPBBPECSDLIERXEOJZBIPQQSWNCYLXBCSQITFOMSUFTCUTAWXDBPJMKIZIFCBEHFKFMBOLJUNJOJXOYDMGAI',
                ...(options && options.headers),
                ...(ctx.adminUserAuthToken
                    ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
                    : null)
            },
        });
    }

   public async getProducts(skuId: string) {
      const url = `https://ioemania.vtexcommercestable.com.br/api/catalog/pvt/stockkeepingunit/${skuId}/complement/3`;
      console.log('skuId', skuId)
      const { data } = await this.http.getRaw(url, {
         headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            "X-Vtex-Use-Https": true,
            'X-VTEX-API-AppKey': `vtexappkey-emania-ARTSXY`,
            'X-VTEX-API-AppToken': 'PWLUIJVFKBQLOSHOXRPCAVUAXKVKLFDNLAUWOBMGEPCXHWVCHHPTKPCGVKUBEEQCTSLGTPEDPQCKRKOASPCMDBJABEZAEIRAUAAHSUBQLAABJKBRQNUPGTGRXMJZXBBB'
         }
      });
      return data;
   }
}