export async function getReviews(context: Context, next: () => Promise<any>) {
    const productId = context.request.query.productId as string;
    const data = await context.clients.GetReviews.getReviews(productId);
    context.response.status = 200;
    context.response.body = { data };
    next();
}