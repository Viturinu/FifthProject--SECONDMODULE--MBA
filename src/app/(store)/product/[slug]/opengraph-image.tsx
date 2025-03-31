import { api } from '@/data/api';
import { Product } from '@/data/types/products';
import { env } from '@/env';
import { ImageResponse } from 'next/og'
import colors from "tailwindcss/colors"

// Image metadata
export const alt = 'About Acme'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

async function getProduct(slug: string): Promise<Product> {
    //sempre uma função async retorna uma Promise
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const response = await api(`/products/${slug}`, {
        next: {
            revalidate: 60 * 60,
        }
    });
    const products = await response.json();
    return products;
}

// Image generation
export default async function OgImage({ params }: { params: { slug: string } }) {
    // Font loading, process.cwd() is Next.js project directory

    const product = await getProduct(params.slug);

    const productImageURL = new URL(product.image, env.APP_URL).toString();

    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    background: colors.zinc[950],
                    widows: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <img src={productImageURL} alt='' style={{ width: "100%" }} />
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported opengraph-image
            // size config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}