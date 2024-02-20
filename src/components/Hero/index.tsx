/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

export default function Hero() {
  return (
    <div className="flex min-h-[700px] items-center justify-center overflow-hidden">
      <Carousel
        plugins={[
          Autoplay({
            delay: 4000,
          }),
        ]}
        className="h-full w-full [&>div]:h-full"
      >
        <CarouselContent className="h-full">
          <CarouselItem className="h-full">
            <div className="relative h-full bg-background">
              <div className="relative z-10 flex h-full w-[70%] flex-col justify-evenly px-6 text-white mix-blend-difference md:px-16">
                <p className="text-lg font-light italic">- Authors</p>
                <p className="z-10 text-6xl font-semibold md:text-7xl">
                  Hovhannes Tumanyan: Armenia's national poet and writer
                </p>
                <div className="flex flex-col pl-6">
                  <p>Hovhannes Tumanyan biography and books</p>
                  <Link href="/authors/27" className="flex flex-row">
                    Learn More <MoveRight />
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 h-full w-full overflow-hidden md:right-10 md:top-20 md:h-[400px] md:w-[400px] md:rounded-full lg:right-20 lg:top-10 lg:h-[600px] lg:w-[600px]">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
                  alt="Hovhannes Tumanyan"
                  priority
                  quality={40}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  fill
                  loading="eager"
                  className="object-cover"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="h-full">
            <div className="relative h-full bg-background">
              <div className="relative z-10 flex h-full w-[70%] flex-col justify-evenly px-6 text-white mix-blend-difference md:px-16">
                <p className="text-lg font-light italic">- Authors</p>
                <p className="z-10 text-6xl font-semibold md:text-7xl">
                  Ink & Insight: Eghishe Charents' Literary Luminescence
                </p>
                <div className="flex flex-col pl-6">
                  <p>Eghishe Charents' biography and books</p>
                  <Link href="/authors/17" className="flex flex-row">
                    Learn More <MoveRight />
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 h-full w-full overflow-hidden md:right-10 md:top-20 md:h-[400px] md:w-[400px] md:rounded-full lg:right-20 lg:top-10 lg:h-[600px] lg:w-[600px]">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Yeghishe_Charents_Armenian_poet.jpg/1200px-Yeghishe_Charents_Armenian_poet.jpg"
                  alt="Eghishe Charents"
                  fill
                  quality={40}
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem className="h-full">
            <div className="relative h-full bg-background">
              <div className="relative z-10 flex h-full w-[70%] flex-col justify-evenly px-6 text-white mix-blend-difference md:px-16">
                <p className="text-lg font-light italic">- Authors</p>
                <p className="text-6xl font-semibold md:text-7xl">
                  Vahan Teryan: Poetic Visions in the Armenian Soul
                </p>
                <div className="flex flex-col pl-6">
                  <p>Vahan Teryan's biography and books</p>
                  <Link href="/authors/38" className="flex flex-row">
                    Learn More <MoveRight />
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 h-full w-full overflow-hidden md:right-10 md:top-20 md:h-[400px] md:w-[400px] md:rounded-full lg:right-20 lg:top-10 lg:h-[600px] lg:w-[600px]">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Vahan_Teryan_portrait.jpg/1920px-Vahan_Teryan_portrait.jpg"
                  alt="Vahan Teryan"
                  quality={40}
                  fill
                  loading="lazy"
                  className="object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
    </div>
  );
}
