"use client"

import { Skeleton } from "@/components/skeleton";
import { useSearchParams } from "next/navigation";
export default function SearchLoading() { //na pagina de loading não tem como acessar esses paremtros dinamicos como searchParams, por isso vamos ter que transformar em client component pra usar o hook

    const searchParams = useSearchParams();

    const query = searchParams.get("q");

    return (
        <div className="flex flex-col gap-4">
            <p className="text-sm">
                Resultado para:
                <span className="font-semibold">{query}</span>
            </p>

            <div className="grid grid-cols-3 gap-6">
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
                <Skeleton className="h-[400px]" />
            </div>
        </div>
    );
}
