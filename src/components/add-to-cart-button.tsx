'use client'

import { useCart } from "@/contexts/cart-context";

export interface AddToCartButtonProps {
    productId: number;
}

export function AddToCartButton({ productId }: AddToCartButtonProps) {

    const { addToCart } = useCart();

    function handleAddProductToCart() {
        addToCart(productId);
    }

    return (
        <button
            type="button"
            className="flex mt-8 h-12 items-center justify-center rounded-full bg-emerald-600 font-semibold text-white"
            style={{ cursor: "pointer" }}
            onClick={handleAddProductToCart}
        >
            Adicionar ao carrinho
        </button>
    )
}