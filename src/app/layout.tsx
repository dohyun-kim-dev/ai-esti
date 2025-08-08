'use client'

import StyledComponentsRegistry from '@/lib/registry'
import { Inter } from 'next/font/google'
import { ThemeProvider } from 'styled-components'
import { useThemeStore } from '@/store/themeStore'
import { lightTheme, darkTheme } from '@/styles/theme'
import { GlobalStyle } from '@/styles/globalStyles'
import Header from '@/components/common/Header'
import Footer from '@/components/common/Footer'
import styled from 'styled-components'
import { ToastProvider } from '@/components/common/ToastProvider'

const inter = Inter({ subsets: ['latin'] })

const Main = styled.main`
  padding: 76px 0 84px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body};
`

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isDarkMode } = useThemeStore()

  return (
    <html lang="ko">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            <GlobalStyle />
            <ToastProvider>
              <Header />
              <Main>{children}</Main>
              <Footer />
            </ToastProvider>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}