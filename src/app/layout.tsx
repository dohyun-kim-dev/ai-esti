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

const Main = styled.main<{ $hideDefault?: boolean }>`
  ${({ $hideDefault }) =>
    $hideDefault
      ? `
      min-height: 100vh;
      `
      : `
      padding: 76px 0 84px;
      min-height: 100vh;
      `}
`;

interface HeaderFooterProps {
  isCompact?: boolean;
}

const HeaderWrapper = ({ isCompact }: HeaderFooterProps) => (
  <Header compact={isCompact || false} />
);

const FooterWrapper = ({ isCompact }: HeaderFooterProps) => (
  <Footer compact={isCompact || false} />
);

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

  // 특정 경로에서는 기본 헤더/푸터를 숨김
  const hideDefaultLayout = pathname?.startsWith("/cms") || 
                          pathname?.startsWith("/ai") || 
                          pathname?.startsWith("/ai-estimate");

  return (
    <html lang="ko">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <GlobalWrapper>
            <ThemeProvider theme={theme}>
              <GlobalStyle />
              <PageLoaderProvider>
                <ToastProvider>
                  {!hideDefaultLayout && <HeaderWrapper isCompact={compact} />}
                  <Main $hideDefault={hideDefaultLayout}>{children}</Main>
                  {!hideDefaultLayout && <FooterWrapper isCompact={compact} />}
                </ToastProvider>
              </PageLoaderProvider>
            </ThemeProvider>
          </GlobalWrapper>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}