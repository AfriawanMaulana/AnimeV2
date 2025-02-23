
import Link from "next/link"

export default function BackButton({ path }: { path: string }) {
    return (
        <Link href={path} className="font-bold text-4xl fixed top-4 left-4 z-50">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="size-7 hover:stroke-red-600">
                <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
            </svg>

        </Link>
    )
}