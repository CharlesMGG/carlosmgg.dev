import { notFound } from "next/navigation";
import { isLocale, getDictionary } from "@/i18n";
import { worlds } from "@/data/worlds";
import { CaseOverlay } from "@/components/case/CaseOverlay";

export function generateStaticParams() {
  return worlds.map((world) => ({ slug: world.slug }));
}

export default async function InterceptedWorldPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const index = worlds.findIndex((world) => world.slug === slug);
  if (index < 0) notFound();

  return (
    <CaseOverlay
      world={worlds[index]}
      index={index}
      locale={locale}
      dict={getDictionary(locale)}
    />
  );
}
