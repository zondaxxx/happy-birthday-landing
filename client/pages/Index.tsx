import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function Index() {
  const [showDetails, setShowDetails] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);

  useEffect(() => {
    if (!showDetails || photos.length > 0) return;
    (async () => {
      try {
        const res = await fetch("/api/osteria/photos");
        const data = (await res.json()) as { images: string[] };
        if (Array.isArray(data.images)) setPhotos(data.images);
      } catch (e) {
        // silent fail
      }
    })();
  }, [showDetails]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background font-sans">
      <div className="relative w-full max-w-[600px] h-[700px] sm:h-[750px] bg-background rounded-[25px] shadow-[0_12px_48px_rgba(45,90,61,0.25)] overflow-hidden">
        {/* Decorative background shape */}
        <svg
          viewBox="0 0 300 200"
          className="absolute top-0 right-0 w-[300px] h-[200px] opacity-10"
          aria-hidden
        >
          <path d="M150 50C150 77.614 172.386 100 200 100H300V0H200C172.386 0 150 22.386 150 50Z" fill="#2D5A3D" />
          <path d="M75 150C75 177.614 97.386 200 125 200H300V100H125C97.386 100 75 122.386 75 150Z" fill="#4A7C59" />
        </svg>

        <div className="relative z-10 h-full flex flex-col p-6 sm:p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h3 className="text-[32px] font-normal leading-[120%] tracking-[-1px] text-primary">
              Приглашение на день рождения
            </h3>
          </div>

          {/* Names */}
          <div className="mb-6">
            <h1 className="text-[56px] sm:text-[84px] font-bold leading-[100%] tracking-[-2.5px] text-primary mb-2">
              Анютке
            </h1>
            <h2 className="text-[48px] sm:text-[76px] font-bold leading-[100%] tracking-[-2.3px] text-right text-secondary">
              сегодня 18!
            </h2>
          </div>

          {/* Photo */}
          <div className="relative mb-6">
            <div className="relative w-full h-[220px] sm:h-[280px] rounded-[20px] overflow-hidden bg-primary">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F9069a1963a434c6c8964e76405250aaf%2Fa5e81d1a186e4e9680f767274db50827?format=webp&width=800"
                alt="Birthday celebration"
                className="w-full h-full object-cover object-[40%_35%]"
              />
              <div
                className="absolute"
                style={{
                  left: 46,
                  right: 0,
                  top: 664,
                  bottom: 0,
                  backgroundImage: "linear-gradient(to right bottom, #2D5A3D, #4A7C59)",
                  opacity: 0.1,
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[18px] sm:text-[25px] leading-[120%] tracking-[-0.8px] text-primary">14:00</p>
              </div>
              <div className="text-right">
                <p className="text-[20px] sm:text-[28px] leading-[120%] tracking-[-0.9px] text-primary">20.09.2025</p>
              </div>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: "hsl(var(--border))" }}>
              <button
                type="button"
                onClick={() => setShowDetails((s) => !s)}
                className="w-full rounded-[12px] py-3 px-6 text-[16px] sm:text-[18px] font-medium tracking-[-0.5px] text-[#E8F5E8] transition-all duration-300 bg-[#2D5A3D] hover:bg-[#4A7C59] active:-translate-y-px"
                aria-expanded={showDetails}
              >
                {showDetails ? "Скрыть детали" : "Показа��ь детали"}
              </button>
            </div>

            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogContent className="sm:max-w-xl rounded-2xl p-0">
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Детали</DialogTitle>
                  </DialogHeader>
                  <div className="mt-2 p-4 rounded-[12px] border" style={{ backgroundColor: "hsl(120 40% 97%)", borderColor: "hsl(var(--border))" }}>
                    <h4 className="text-[16px] font-bold tracking-[-0.5px] text-primary mb-2">О ресторане (Остерия Марио, м. Щёлковская)</h4>
                    <ul className="text-[14px] leading-[140%] tracking-[-0.2px] text-secondary space-y-1 list-none">
                      <li><span className="text-primary">Адрес:</span> Щёлковское ш., 75, ТРЦ «Щёлковский», 3 этаж</li>
                      <li><span className="text-primary">Метро:</span> Щёлковская</li>
                      <li><span className="text-primary">Телефон:</span> +7 (495) 790-70-90 доб. 223</li>
                      <li><span className="text-primary">Часы:</span> Вс–Чт 10:00–22:00, Пт–Сб 10:00–23:00</li>
                      <li><span className="text-primary">Кухня:</span> итальянская, пицца, паста, антипасти</li>
                      <li><span className="text-primary">Сайт:</span> <a className="underline text-secondary" href="https://www.osteria-mario.com" target="_blank" rel="noreferrer">osteria-mario.com</a></li>
                    </ul>
                    <div className="mt-4">
                      <h5 className="text-[14px] font-semibold tracking-[-0.4px] text-primary mb-2">Фотографии с Яндекс Карт</h5>
                      <div className="overflow-x-auto -mx-1 px-1">
                        <div className="flex gap-3 snap-x snap-mandatory">
                          {photos.map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt={`Остерия Марио фото ${i + 1}`}
                              className="h-24 w-36 object-cover rounded-md snap-center border"
                              loading="lazy"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#2D5A3D" }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#4A7C59" }} />
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#6B8E6B" }} />
        </div>
      </div>
    </div>
  );
}
