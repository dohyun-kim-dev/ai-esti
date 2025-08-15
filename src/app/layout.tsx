"use client";

import StyledComponentsRegistry from "@/lib/registry";
import { Inter } from "next/font/google";
import { ThemeProvider } from "styled-components";
import { useThemeStore } from "@/store/themeStore";
import { lightTheme, darkTheme } from "@/styles/theme";
import { GlobalStyle } from "@/styles/globalStyles";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import styled from "styled-components";
import { ToastProvider } from "@/components/common/ToastProvider";
import { PageLoaderProvider } from "@/contexts/PageLoaderContext";
import { useSearchParams, usePathname } from "next/navigation";
import { GlobalWrapper } from "./global-wrapper";

import React from "react";

const inter = Inter({ subsets: ["latin"] });

// isCms 값에 따라 스타일을 동적으로 적용하도록 수정
const Main = styled.main`

  ${({ $isCms }) =>
    $isCms
      ? `
      padding: 0;
      min-height: auto;
      background-color: #E6E7E9;
    `
      : `
      padding: 76px 0 84px;
      min-height: 100vh;
    `}
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode } = useThemeStore();
  const params = useSearchParams();
  const pathname = usePathname();
  const [compact, setCompact] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    setCompact(params.get("embed") === "1");
  }, [params]);

  const theme = mounted ? (isDarkMode ? darkTheme : lightTheme) : lightTheme;

  const isCms = pathname?.startsWith("/cms");

  return (
    <html lang="ko">
      <body className={inter.className}>
        <StyledComponentsRegistry>
        <GlobalWrapper>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <PageLoaderProvider>
              <ToastProvider>
                {!isCms && <Header compact={compact} />}
                <Main $isCms={isCms}>{children}</Main>
                {!isCms && <Footer compact={compact} />}
              </ToastProvider>
            </PageLoaderProvider>
          </ThemeProvider>
          </GlobalWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}