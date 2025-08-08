// src/app/ai-estimate/layout.tsx
"use client";

import React, { useState, ReactNode } from 'react';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import { lightTheme, darkTheme } from '@/styles/theme';
import Icon from '@/components/ai-esti/Icon';
import BottomInput from '@/components/ai-esti/BottomInput';
import { useRouter } from 'next/navigation'; // useRouter 훅 임포트

const GlobalStyle = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.25s linear;
  }
`;

const LayoutWrapper = styled.div`
  padding-top: 0px;
  padding-bottom: calc(76px + env(safe-area-inset-bottom)); /* 인풋 높이(52px) + 패딩(24px) + 안전영역 */
  min-height: 100vh;
  background-color: ${({ theme }) => theme.body};
`;

const TopNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.body};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  z-index: 100;
  

  .left-icons, .right-icons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    padding: 0;
    border-radius: 8px;

    &:hover {
      background-color: ${({ theme }) => `${theme.body}`};
    }
  }
`;

const ThemeToggleButton = styled.button`
  position: fixed;
  bottom: 120px;
  right: 20px;
  padding: 10px 15px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.border};
  background-color: ${({ theme }) => theme.surface1};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-weight: bold;
  z-index: 1000;
  
  &:hover {
    opacity: 0.8;
  }
`;

interface AiEstimateLayoutProps {
  children: ReactNode;
  inputPlaceholder?: string;
  onInputSubmit?: (value: string) => void;
}

interface ChildWithThemeProps {
  toggleTheme?: () => void;
  themeMode?: 'light' | 'dark';
}

export default function AiEstimateLayout({ children, inputPlaceholder, onInputSubmit }: AiEstimateLayoutProps) {
  const [themeMode, setThemeMode] = useState('dark');
  const router = useRouter(); // useRouter 훅 사용

  const toggleTheme = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  };
  
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  const isLightTheme = themeMode === 'light';
  const icons = {
    back: '/ai-estimate/arrow_back.png',
    share: isLightTheme ? '/ai-estimate/share.png' : '/ai-estimate/share_dark.png',
    new: isLightTheme ? '/ai-estimate/new.png' : '/ai-estimate/new_dark.png',
    estimate: isLightTheme ? '/ai-estimate/esti.png' : '/ai-estimate/esti_dark.png',
    profile: isLightTheme ? '/ai-estimate/profile.png' : '/ai-estimate/profile_dark.png',
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <LayoutWrapper>
        <TopNav>
          <div className="left-icons">
            {/* 뒤로 가기 아이콘 추가 */}
            <span className="icon" onClick={handleBack}>
              <Icon src={icons.back} width={24} height={24} />
            </span>
          </div>
          <div className="right-icons">
             <span className="icon"><Icon src={icons.share} width={36} height={36} /></span>
             <span className="icon"><Icon src={icons.new} width={36} height={36} /></span>
             <span className="icon"><Icon src={icons.estimate} width={36} height={36} /></span>
             <span className="icon"><Icon src={icons.profile} width={36} height={36} /></span>
          </div>
        </TopNav>
        
        {React.Children.map(children, child => {
          if (React.isValidElement<ChildWithThemeProps>(child)) {
            return React.cloneElement(child, { toggleTheme, themeMode: themeMode as 'light' | 'dark' });
          }
          return child;
        })}

        <ThemeToggleButton onClick={toggleTheme}>
          {themeMode === 'light' ? '🌙' : '☀️'}
        </ThemeToggleButton>
        <BottomInput 
          placeholder={inputPlaceholder} 
          onSubmit={onInputSubmit}
        />
      </LayoutWrapper>
    </ThemeProvider>
  );
}
