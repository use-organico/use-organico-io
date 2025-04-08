export async function getBuyTogetherProducts(context: Context, next: () => Promise<any>) {
   const data = await context.clients.getProductsBuyTogether.getProducts();

   context.response.status = 200;
   context.response.body = { data };

   next();
};

