import { z } from 'zod'
import type { NextRequest } from "next/server"

import data from '../data.json'

export async function GET(
    request: NextRequest, //diferente de Request, pois aqui já importa todas as funcionalidades do native fetch (que é a vantagem sobre o axios que usa o xml alguma coisa)
    // { params }: { params: Promise<{ slug: string }> },
) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const { searchParams } = request.nextUrl;

    const query = z.string().parse(searchParams.get("q"));

    const product = data.products.filter((product) => {
        return product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase());
    })

    return Response.json(product)
} 