import { api } from "@/data/api";
import { Product } from "@/data/types/products";
import Image from "next/image"
import Link from "next/link"
import { redirect } from "next/navigation";

interface SearchProps {
    searchParams: {
        q: string;
    }
}

async function searchProducts(query: string): Promise<Product[]> { //Promise porque é uyma função async (lembrar disso)
    //sempre uma função async retorna uma Promise

    const response = await api(`/products/search?q=${query}`, {
        next: {
            revalidate: 60 * 60, // 1 hour
        },
    });

    console.log(response)

    const products = await response.json();

    return products;
}

export default async function Search({ searchParams }: SearchProps) {
    const { q: query } = searchParams

    if (!query) {
        redirect('/')
    }

    const products = await searchProducts(query)

    return (
        <div>
            <p>
                Resultados para: <span className="font-semibold"> {query} </span>
            </p>

            <div className="grid grid-cols-6 gap-6">
                {products.map(product => {
                    return (
                        <Link
                            key={product.id}
                            href={`/product/${product.slug}`}
                            className="group col-span-2 relative rounded-lg bg-zinc-900 overflow-hidden flex justify-center items-start"
                        >
                            <Image
                                src={product.image}
                                alt=""
                                className="group-hover:scale-105 transition-transform duration-500"
                                width={480}
                                height={480}
                                quality={100}
                            />
                            <div className="absolute bottom-10 right-10 flex items-center gap-2 max-w-[280px] rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                                <span className="text-sm truncate">{product.title}</span>
                                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                                    {product.price.toLocaleString("pt-BR", {
                                        style: "currency",
                                        currency: "BRL",
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0,
                                    })}
                                </span>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div >
    )
}