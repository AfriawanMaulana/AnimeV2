import BackButton from "@/components/BackBtn"


export default function Page() {
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <BackButton path="/" />
            <h1 className="font-bold text-3xl">404 Not Found</h1>
        </div>
    )
}