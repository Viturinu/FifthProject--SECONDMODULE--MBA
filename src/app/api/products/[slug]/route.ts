import { z } from 'zod'

import data from '../data.json'

export async function GET(
    _: Request,
    { params }: { params: Promise<{ slug: string }> },
) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const slug = z.string().parse(await params.then(element => element.slug))

    console.log(slug)

    const product = data.products.find((product) => product.slug === slug)

    if (!product) {
        return Response.json({ message: 'Product not found.' }, { status: 400 })
    }

    return Response.json(product)
}