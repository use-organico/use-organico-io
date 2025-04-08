export async function getTogetherProducts(context: Context, next: () => Promise<any>) {
    const skuId = context.request.query.skuId as string;
    const data = await context.clients.GetBuyTogether.getProducts(skuId);
 
    context.response.status = 200;
    context.response.body = { data };
 
    next();
 };