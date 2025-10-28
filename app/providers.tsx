// app/providers.tsx
"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CartProvider } from "@/context/CartContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    // NextThemesProvider es un componente válido exportado por next-themes
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <CartProvider>{children}</CartProvider>
    </NextThemesProvider>
  );
}
