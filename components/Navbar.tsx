"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Navbar() {
    const [ value, setValue ] = useState('');
    const router = useRouter();

    return (
        <nav className="grid grid-cols-1 md:grid-cols-2 justify-evenly border border-white p-4 sticky top-0 z-50 bg-black">
            <h1 className="text-center font-sigmar text-2xl">Anime<span className="text-red-600">Station</span></h1>
            <div className="relative flex items-center">
                <input type="text" onKeyDown={(e) => e.key === 'Enter' && router.push(`/search/${value}`)} onChange={(e) => setValue(e.currentTarget.value)} placeholder="Search..." className="w-full pl-2 pr-10 py-1 rounded-md text-black"/>
                <button onClick={() => router.push(`/search/${value}`)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="black" className="size-7 absolute right-2 top-0.5 rounded-md">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>

            </div>
        </nav>
    )
}