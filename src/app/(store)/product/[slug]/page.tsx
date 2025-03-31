import { AddToCartButton } from '@/components/add-to-cart-button';
import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { Metadata } from 'next';
import Image from 'next/image'

interface ProductProps {
    params: {
        slug: string;
    }
}

// Função que retorna as props para a página estática (sem ser em rota dinâmica)
export async function getStaticProps() {
    const response = await api('/products/featured')  // Exemplo de requisição para um produto destacado
    const product = await response.json()

    return {
        props: {
            product,
        },
        revalidate: 60 * 60, // Opção de revalidação (regerar a página a cada 1 hora, por exemplo)
    }
}

export async function generateMetadata({ params }: ProductProps): Promise<Metadata> {//pra alterar o titulo do texto dinamicamente de acordo com o params da URL

    const product = await getProduct(params.slug);

    return {
        title: product.title
    }
}

export async function generateStaticParams() { //isso aqui faz o cache dessas páginas dinamicas, assim, se for uma pagina pesada, a primeira vez que alguem solicita-la, não vai precisar ficar aguardando (sendo a cobaia, pois os solicitantes posteriores já teriam a página rapidamente por conta do cache feito e armazanado no server-side com a primeira solicitação) a página. Ele faz isso porque esse nome de função já é conhecido pelo next para fazer pre building, daí ele reconhece no retorno do elemento o slug - que é o parametro da rota dinâmica
    const response = await api("/products/featured");
    const products: Product[] = await response.json();

    return products.map(product => {
        return { slug: product.slug }
    })
    // return [
    //     { slug: "moletom-never-stop-learning" }
    // ]
}


async function getProduct(slug: string): Promise<Product> {
    //sempre uma função async retorna uma Promise
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api(`/products/${slug}`, {
        next: {
            revalidate: 60 * 60,
        }
    });
    const product = await response.json();
    return product;
}

export default async function ProductPage({ params }: ProductProps) {

    const product = await getProduct(params.slug) //vai acontecer a memoização que é o reaproveitamento da chamada lá de cima (o next faz isso automaticamente - pra não ficar chamando várias vezes) ; também existe o cached que a gente utilizou com next: {revalidate: 60} | cache: "no-store"

    return (
        <div className="relative grid max-h-[860px] grid-cols-3 ">
            <div className="col-span-2 overflow-hidden">
                <Image
                    src={product.image}
                    alt=""
                    width={1000}
                    height={1000}
                    quality={100}
                />
            </div>

            <div className="flex flex-col justify-center px-12">
                <h1>{product.description}</h1>
                <p className="mt-2 leading-relaxed text-zinc-400">
                    {product.title}
                </p>

                <div className="mt-8 flex items-center gap-3">
                    <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
                        {product.price.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                            minimumFractionDigits: 0,
                            maximumFractionDigits: 0,
                        })}
                    </span>
                    <span className="text-sm text-zinc-400">
                        Em 12x s/juros de {(product.price / 12).toLocaleString("pr-BR", {
                            style: "currency",
                            currency: "BRL"
                        })}
                    </span>
                </div>

                <div className="mt-8 space-y-4">
                    <span className="block font-semibold">Tamanhos</span>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
                        >
                            P
                        </button>

                        <button
                            type="button"
                            className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
                        >
                            M
                        </button>

                        <button
                            type="button"
                            className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
                        >
                            G
                        </button>

                        <button
                            type="button"
                            className="flex h-9 w-14 items-center justify-center rounded-full border border-zinc-700 bg-zinc-800 text-sm font-semibold"
                        >
                            GG
                        </button>
                    </div>
                </div>

                <AddToCartButton productId={product.id} />
            </div>
        </div>
    )
}
