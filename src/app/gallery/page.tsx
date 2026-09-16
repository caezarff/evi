import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { WorksWheel } from "@/components/ui/works-wheel";

const imageBase =
  "https://pub-8abee449136941f5b0a1cd2c014534e9.r2.dev/vault-listing-images/assets-images/stack-spread";

const items = Array.from({ length: 8 }, (_, index) => ({
  title: `Ensaio ${String(index + 1).padStart(2, "0")}`,
  image: `${imageBase}/img${index + 1}.png`,
}));

export default function GalleryPage() {
  return (
    <>
      <main className="relative h-dvh min-h-[24rem] w-full">
        <h1 className="sr-only">Galeria</h1>
        <WorksWheel items={items} label="Galeria" className="h-full" />
        <Link
          href="/"
          className="bg-background/80 text-foreground absolute top-6 left-6 z-20 rounded-full px-3 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-background focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          ← Voltar
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
