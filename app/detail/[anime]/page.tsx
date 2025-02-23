"use client"
import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import BackButton from "@/components/BackBtn";
import Loading from "./loading";

interface Anime {
    result: {
        title: string;
        videoUrl: string;
        image: Base64URLString;
        status: string;
        studio: string;
        released: string;
        season: string;
        type: string;
        censor: string;
        director: string;
        producers: string;
        description: string;
        episodes: [{
            epNo: string;
            epTitle: string;
            epDate: string;
            epUrl: string;
        }]
    }
}

export default function AnimeDetail() {
    const [ detail, setDetail ] = useState<Anime | null>(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams<{ anime: string }>();
    useEffect(() => {
        const fetchApi = async () => {
            const response = await axios.get(`https://api.i-as.dev/api/animev2/detail/${params.anime}`);
            if (response.status === 200) {
                setDetail(response.data);
                setLoading(false)
            }
            return null;
        }
        fetchApi()
    }, [params.anime])

    if (loading) return <Loading />
    return (
        <div className="p-10">
            <BackButton path="/" />
            <div className="grid grid-cols-1 md:grid-cols-2 w-full items-center">
                {detail?.result.image && (
                    <Image 
                        src={detail?.result.image} 
                        alt={detail?.result.title} 
                        width={250} 
                        height={250}
                        loading="lazy"
                        className="w-full max-h-96 object-contain" 
                    />
                )}
                <ul className="">
                    <h1 className="opacity-100 font-bold text-3xl">{detail?.result.title}</h1>
                    <p className="opacity-55">{detail?.result.description}</p>
                    <div className="opacity-55 py-2">
                        {detail && (
                            <ul>
                                <p>Status: {detail?.result.status}</p>
                                <p>Studio: {detail?.result.studio}</p>
                                <p>Released: {detail?.result.released}</p>
                                <p>Season: {detail?.result.season}</p>
                                <p>Director: {detail?.result.director}</p>
                                <p>Producers: {detail?.result.producers}</p>
                            </ul>
                        )}
                    </div>
                </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10 max-h-96 overflow-y-scroll">
                {detail?.result.episodes.map((episode, index) => (
                    <Link 
                        href={episode.epUrl.split('https://api.i-as.dev/api/animev2').join('').split('http://oploverz.ch').join('')} 
                        key={index} 
                        className="bg-white/10 p-2 max-h-96 hover:bg-red-600">
                        Episode {episode.epNo}
                    </Link>
                ))}
            </div>
        </div>
    )
}