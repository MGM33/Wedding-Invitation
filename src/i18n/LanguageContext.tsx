import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { strings, type Lang, type Strings } from "./strings";
import type { Bilingual } from "@/config/wedding";

type Ctx = { lang: Lang; t: Strings; setLang: (l: Lang) => void; b: (v: Bilingual) => string };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");
  useEffect(() => {
    const saved = sessionStorage.getItem("lang") as Lang | null;
    if (saved === "ar" || saved === "en") setLang(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    sessionStorage.setItem("lang", lang);
  }, [lang]);
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: strings[lang], b: (v) => v[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const c = useContext(LanguageContext);
  if (!c) throw new Error("useLang must be inside LanguageProvider");
  return c;
}
