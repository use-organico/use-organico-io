import { InstanceOptions, IOContext, ExternalClient } from "@vtex/api";

export class GetReviews extends ExternalClient {
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

   public async getReviews(productId: string) {
        const url = `https://useorganico.vtexcommercestable.com.br/api/dataentities/RV/search?_fields=categoryTree,comment,date,email,productId,productName,rating,recommendation,user&_where=productId=${productId}`;
        const { data } = await this.http.getRaw(url, {
            headers: {
                'Accept': 'application/vnd.vtex.ds.v10+json',
                'Content-Type': 'application/json',
                'REST-Range': 'resources=0-100',
                "X-Vtex-Use-Https": true,
                'X-VTEX-API-AppKey': 'vtexappkey-useorganico-BDQBTO',
                'X-VTEX-API-AppToken': 'YCLVRQJIEZDSJXARLYILJSTNINHGTLYPMBQKGTZQKBNCPYXOBQFTCSUZMIFITVBAGDUDITVSLYPLEXWERVGCVYNVGTBZPUPSAYZYUFGQWFFMUOADSSDXFCWKNNOQLOIM'
            }
        })
        return data;
   }
}