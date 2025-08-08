// pages/print.tsx
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function PrintPage() {
  const [images, setImages] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("auth") !== "1") {
      router.push("/");
    }
  }, [router]);

  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      const data = await res.json();
      setImages(data);
    };
    fetchImages();
  }, []);

  const clearQueue = async () => {
    await fetch("/api/webhooks", { method: "DELETE" });
    setImages([]);
  };

  return (
    <div className="bg-white">
      <div className="min-h-screen p-4 bg-green-50 mx-40">
        {/* Screen view - hidden when printing */}
        <div className="print:hidden mb-6">
          
          <h1 className="text-5xl text-black flex justify-center font-sans"><span>السلام علیکم بابا</span></h1>
          <h1 className="text-3xl font-bold text-black">Print Queue</h1>
          <p className="text-xl text-gray-600 mb-4">Click below to print <span className="font-bold">{images.length}</span> images</p>
            <button
              onClick={() => window.print()}
              className="bg-green-600 text-white px-4 py-2 rounded-2xl hover:bg-green-700"
            >
              Print
            </button>
             <button
                onClick={clearQueue}
                className="bg-red-400 text-white px-4 py-2 rounded-2xl hover:bg-red-600 mx-5"
              >
                Clear queue
              </button>
        </div>
        {/* Print-only view */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:block print:grid-cols-1 print:gap-0">
          {images.map((img, i) => (
            <div key={i} className="break-after-page">
              <img
                src={`data:image/jpeg;base64,${img}`}
                className="w-full h-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
