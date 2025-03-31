'use client'

import { Search } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'

export function SearchForm() {
    const router = useRouter(); //apenas disponivel em use client
    const searchParams = useSearchParams(); //apenas disponivel em use client

    const query = searchParams.get('q'); //se já tiver algo na query da url, já seta o defaultValue do input

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const data = Object.fromEntries(formData)

        const query = data.q; //esse query é o valor do input, não query do url (q é o nome dado ao input)

        if (!query) { //se não tiver nada no input
            return null
        }

        router.push(`/search?q=${query}`)
    }

    return (
        <form
            onSubmit={handleSearch}
            className="flex w-[320px] items-center gap-3 rounded-full bg-zinc-900 px-5 py-3 ring-zinc-700"
        >
            <Search className="w-5 h-5 text-zinc-500" />

            <input
                name="q"
                defaultValue={query ?? ''}
                placeholder="Buscar produtos..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-zinc-500"
                required
            />
        </form>
    )
}