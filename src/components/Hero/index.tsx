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

export default function Hero() {
  return (
    <Carousel className="h-full w-full [&>div]:h-full">
      <CarouselContent className="h-full">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="h-full">
            <div className="relative h-full bg-background">
              <div className="flex h-full w-[70%] flex-col justify-evenly px-16">
                <p className="text-lg font-light italic">- Authors</p>
                <p className="z-10 text-7xl font-semibold text-white mix-blend-difference">
                  Hovhannes Tumanyan asdfasdf asdf asdf asdf asdf asdf
                </p>
                <div className="flex flex-col pl-6">
                  <p>Hovhannes Tumanyan biography and fact</p>
                  <Link href="" className="flex flex-row">
                    Learn More <MoveRight />
                  </Link>
                </div>
              </div>

              <div className="absolute top-0 h-full w-full overflow-hidden bg-red-300 md:right-10 md:top-20 md:h-[400px] md:w-[400px] md:rounded-full lg:right-20 lg:top-10 lg:h-[600px] lg:w-[600px]">
                <Image
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Tumanyan_%282%29.jpg/640px-Tumanyan_%282%29.jpg"
                  alt="asd"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4" />
      <CarouselNext className="right-4" />
    </Carousel>
  );
}
