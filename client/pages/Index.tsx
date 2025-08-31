import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Index() {
  const [showDetails, setShowDetails] = useState(false);
  const [photos, setPhotos] = useState<string[]>([]);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const staticPhotos = [
    "https://cdn.builder.io/api/v1/image/assets%2F9069a1963a434c6c8964e76405250aaf%2F86d101502bdb4b67823967d5493c0c4a?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F9069a1963a434c6c8964e76405250aaf%2F3bf620bfdb3d4180aba53cea927dda06?format=webp&width=800",
    "https://cdn.builder.io/api/v1/image/assets%2F9069a1963a434c6c8964e76405250aaf%2F1f3df45d00724e47a6e14e9a16cfbcb4?format=webp&width=800",
  ];

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
          <path
            d="M150 50C150 77.614 172.386 100 200 100H300V0H200C172.386 0 150 22.386 150 50Z"
            fill="#2D5A3D"
          />
          <path
            d="M75 150C75 177.614 97.386 200 125 200H300V100H125C97.386 100 75 122.386 75 150Z"
            fill="#4A7C59"
          />
        </svg>

        <div className="relative z-10 h-full flex flex-col p-6 sm:p-8">
          {/* Heading */}
          <div className="text-center mb-6">
            <h3 className="text-[32px] sm:text-[36px] leading-[120%] tracking-[-1px] text-primary font-display italic">
              Приглашение на День Рождения
            </h3>
          </div>

          {/* Name and 18! in one row */}
          <div className="mb-6 flex items-baseline justify-between gap-3">
            <h1 className="flex-1 mr-2 text-[64px] sm:text-[96px] font-bold leading-[100%] tracking-[0.06em] text-primary whitespace-nowrap">
              Анютке
            </h1>
            <div className="relative">
              <span aria-hidden className="absolute inset-0 translate-x-1 translate-y-1 text-[64px] sm:text-[96px] font-extrabold tracking-[-4px] text-[#2D5A3D]/25 select-none">18!</span>
              <span aria-hidden className="absolute inset-0 translate-x-2 translate-y-2 text-[64px] sm:text-[96px] font-extrabold tracking-[-4px] text-[#4A7C59]/30 select-none">18!</span>
              <h2 className="relative text-[64px] sm:text-[96px] font-extrabold tracking-[-4px] bg-gradient-to-br from-[#2D5A3D] to-[#4A7C59] text-transparent bg-clip-text">18!</h2>
            </div>
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
                  backgroundImage:
                    "linear-gradient(to right bottom, #2D5A3D, #4A7C59)",
                  opacity: 0.1,
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-[18px] sm:text-[25px] leading-[120%] tracking-[-0.8px] text-primary">
                  16:00
                </p>
              </div>
              <div className="text-right">
                <p className="text-[20px] sm:text-[28px] leading-[120%] tracking-[-0.9px] text-primary">
                  20.09.2025
                </p>
              </div>
            </div>

            <div
              className="pt-4 border-t"
              style={{ borderColor: "hsl(var(--border))" }}
            >
              <button
                type="button"
                onClick={() => setShowDetails((s) => !s)}
                className="w-full rounded-[12px] py-3 px-6 text-[16px] sm:text-[18px] font-medium tracking-[-0.5px] text-[#E8F5E8] transition-all duration-300 bg-[#2D5A3D] hover:bg-[#4A7C59] active:-translate-y-px"
                aria-expanded={showDetails}
              >
                {showDetails ? "Скрыть детали" : "Показать детали"}
              </button>
            </div>

            <Dialog open={showDetails} onOpenChange={setShowDetails}>
              <DialogContent className="sm:max-w-xl rounded-2xl p-0">
                <div className="p-6">
                  <DialogHeader>
                    <DialogTitle className="text-primary">Детали</DialogTitle>
                  </DialogHeader>
                  <div
                    className="mt-2 p-4 rounded-[12px] border"
                    style={{
                      backgroundColor: "hsl(120 40% 97%)",
                      borderColor: "hsl(var(--border))",
                    }}
                  >
                    <h4 className="text-[16px] font-bold tracking-[-0.5px] text-primary mb-2">
                      О ресторане (Остерия Марио, м. Щёлковская)
                    </h4>
                    <ul className="text-[14px] leading-[140%] tracking-[-0.2px] text-secondary space-y-1 list-none">
                      <li>
                        <span className="text-primary">Адрес:</span> Щёлковское
                        ш., 75, ТРЦ «Щёлковский», 3 этаж
                      </li>
                      <li>
                        <span className="text-primary">Метро:</span> Щёлковская
                      </li>
                      <li>
                        <span className="text-primary">Телефон:</span> +7 (495)
                        790-70-90 доб. 223
                      </li>
                      <li>
                        <span className="text-primary">Часы:</span> Вс–Чт
                        10:00–22:00, Пт–Сб 10:00–23:00
                      </li>
                      <li>
                        <span className="text-primary">Кухня:</span>{" "}
                        итальянская, пицца, паста
                      </li>
                      <li>
                        <span className="text-primary">Сайт:</span>{" "}
                        <a
                          className="underline text-secondary"
                          href="https://www.osteria-mario.com"
                          target="_blank"
                          rel="noreferrer"
                        >
                          osteria-mario.com
                        </a>
                      </li>
                    </ul>
                    <div className="mt-4">
                      <h5 className="text-[14px] font-semibold tracking-[-0.4px] text-primary mb-2">
                        Фотографии с Яндекс Карт
                      </h5>
                      <div className="overflow-x-auto -mx-1 px-1">
                        <div className="flex gap-3 snap-x snap-mandatory">
                          {[...staticPhotos, ...photos].map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt={`Остерия Марио фото ${i + 1}`}
                              className="h-24 w-36 object-cover rounded-md snap-center border cursor-zoom-in transition-transform hover:scale-[1.03]"
                              loading="lazy"
                              onClick={() => setZoomSrc(src)}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="mt-4">
                        <a
                          href="https://yandex.ru/maps/org/osteria_mario/82975400237?si=y5b38dyxgxtmdhh0v4g0hgy460"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center rounded-lg bg-[#2D5A3D] hover:bg-[#4A7C59] text-[#E8F5E8] px-4 py-2 text-sm font-medium"
                        >
                          Построить маршрут в Яндекс.Картах
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={!!zoomSrc}
              onOpenChange={(o) => !o && setZoomSrc(null)}
            >
              <DialogContent className="max-w-3xl p-0 bg-black/80 sm:bg-background sm:p-2">
                <img
                  src={zoomSrc ?? ""}
                  alt="Просмотр фото"
                  className="w-full max-h-[80vh] object-contain rounded-md"
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Dots */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#2D5A3D" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#4A7C59" }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "#6B8E6B" }}
          />
        </div>
      </div>
    </div>
  );
}
