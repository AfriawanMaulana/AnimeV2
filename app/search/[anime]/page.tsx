"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "./loading";
import Image from "next/image";
import Link from "next/link";
import BackButton from "@/components/BackBtn";



interface Search {
    results: [{
        title: string;
        url: string;
        image: Base64URLString;
        status: string;
        type: string;
    }],
    pagination: {
        currentPage: number;
        hasPrevPage: boolean;
        hasNextPage: boolean;
    }
}

export default function SearchAnime() {
    const [ anime, setAnime ] = useState<Search | null>(null);
    const [ loading, setLoading ] = useState(true);
    const [ notFound, setNotFound ] = useState(false);
    const params = useParams<{ anime: string }>();
    
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const response = await axios.get('https://api.i-as.dev/api/animev2/search?q=' + params.anime);
                if (response.data === null) {
                    console.log('Not found');
                    setLoading(false);
                }
                setAnime(response.data)
                setLoading(false);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    const { response } = error;

                    if (response && response.status === 404) {
                        setNotFound(true);
                        setLoading(false)
                    }
                }
            }
        }
        fetchApi()
    }, [params.anime])

    if (loading) return <Loading />
    if (notFound) {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <BackButton path="/search" />
                <h1 className="font-bold text-xl">No Result For {params.anime}</h1>
            </div>
        )
    }
    return (
        <div>
            <BackButton path="/search" />
            <div className="flex flex-wrap gap-4 items-center justify-center my-10">
                {anime?.results.map((item, index) => (
                    <Link href={`/detail/${item.title.slice(0, 15).toLowerCase().split(/[ ]/).join("-").split(/[:`".!,“()]/).join("")}`} key={index}
                    className="relative cursor-pointer overflow-hidden rounded-xl border border-white/20 shadow-md shadow-white/20">
                    <Image 
                        src={item.image} 
                        alt={item.title} 
                        height={200} 
                        width={200} 
                        loading="lazy"
                        className="hover:scale-105 object-cover w-[200px] h-[250px] rounded-xl border border-white/20 shadow-md shadow-white/20"
                    />
                    <h1 className="absolute bottom-0 p-2 font-semibold text-sm w-full h-10 bg-black/70">
                        {item.title.slice(0, 20)}...
                    </h1>
                    </Link>
                ))}
            </div>
        </div>
    )
}