"use client"
import axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// components
import Loading from "./search/[anime]/loading";


interface Anime {
  results: [{
    title: string;
    url: string;
    status: string;
    type: string;
    image: Base64URLString;
  }],
  pagination: {
    currentPage: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPageUrl: string;
    nextPageUrl: string;
  }
}

export default function Home() {
  const [ anime, setAnime ] = useState<Anime | null>(null);
  const [ loading, setLoading ] = useState(true);
  const [ page, setPage ] = useState(1)
  // const [ currentPage, setCurrentPage ] = useState(page)
  const API = "https://api.i-as.dev/api/animev2?page=";

  useEffect(() => {
    const fetchApi = async () => {
     const response = await axios.get(API + page);
     if (response.status === 200) {
      setAnime(response.data);
      setLoading(false);
     }
    }
    fetchApi();
  }, [page, loading])

  // Scroll to Top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });  
  }

  // Handle Previous Page Button
  const handlePrev = () => {
    if (page <= 1) return
    scrollToTop();
    setPage(page - 1);
    setLoading(true)
  }

  // Handle Next Page Button
  const handleNext = () => {
    if (page >= 1) {
      scrollToTop()
      setPage(page + 1);
      setLoading(true)
    }
  }

  
  
  return (
    <>
      <section className="my-10">
        {!loading ? (
          <div className="flex flex-wrap gap-4 items-center justify-center">
            {anime?.results.map((item, index) => {
              return (
                <Link href={`/detail/${item.title.slice(0, 7).toLowerCase().split(/[ ]/).join("-").split(/[:`".!,“()]/).join("")}`} key={index}
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
              )
            })}
          </div>
        ) : <Loading />}
      </section>
      {!loading ? (
        <div className="flex w-full items-center justify-center gap-4">
          <button onClick={handlePrev} className={page <= 1 ? 'hidden' : ''}>Prev</button>
          <p>{page}</p>
          <button onClick={handleNext} className="nextBtn">Next</button>
        </div>
      ): null}
    </>
  )
}