"use client";
import BackButton from "@/components/BackBtn";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
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
    }
}

interface Episode {
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

interface Genre {
    genres: [
        {
            name: string;
            url: string;
        }
    ]
}
export default function EpisodePage() {
    const [ episode, setEpisode ] = useState<Anime | null>(null); 
    const [ listEp, setListEp ] = useState<Episode | null>(null);
    const [ genre, setGenre ] = useState<Genre | null>(null);
    const [ loading, setLoading ] = useState(true);
    const params = useParams<{ anime: string }>();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await axios.get('https://api.i-as.dev/api/animev2/episode/' + params.anime);
            const episodeRes = await axios.get('https://api.i-as.dev/api/animev2/detail/' + params.anime.slice(0, 7));
            const genreRes = await axios.get('https://api.i-as.dev/api/animev2/genres');
            if (response.status === 200) {
                setEpisode(response.data);
                setListEp(episodeRes.data);
                setGenre(genreRes.data);
                setLoading(false)
            }
            return null;
        }
        fetchApi();
    }, [params.anime])

    if (loading) return <Loading />

    return (
        <div className="py-10 lg:px-10">
            <BackButton path={`/detail/${params.anime.slice(0, 7)}`} />
            <ul className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 border border-white/10">
                <li className="bg-white/5 border border-white/10">
                    <div className="relative w-[100%] pt-[56.25%] mb-2">
                        <iframe 
                            src={episode?.result.videoUrl} 
                            allowFullScreen 
                            width={640} 
                            height={360} 
                            className="absolute top-0 left-0 w-[100%] h-[100%]">
                        </iframe>
                    </div>
                    <h1 className="font-bold text-2xl">{episode?.result.title}</h1>
                    <p>{episode?.result.description}</p>
                    <div className="flex flex-col gap-2 overflow-y-scroll mt-5 max-h-96">
                        {listEp?.result.episodes.map((episode, index) => (
                            <Link 
                                href={episode.epUrl.split('https://api.i-as.dev/api/animev2').join('')} 
                                key={index} 
                                className="bg-white/10 p-2">
                                Episode {episode.epNo}
                            </Link>
                        ))}
                    </div>
                </li>
                <li className="border border-white/10 w-88">
                    <h1 className="p-2 bg-white/5 border border-white/10 text-white/50">Cari Berdasarkan Genre</h1>
                    <div className="grid grid-cols-3 relative bg-white/5 max-h-96 overflow-y-scroll">
                       {genre?.genres.map((genre) => (
                           <Link 
                                href={genre.url} 
                                key={genre.name} 
                                className="border border-white/10 p-1 text-[12px] text-white/50 text-center hover:bg-red-600 hover:text-white">
                                {genre.name}
                            </Link>
                        ))}
                    </div>
                </li>
            </ul>
        </div>
    )
}