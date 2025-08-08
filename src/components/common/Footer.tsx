'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useThemeStore } from '@/store/themeStore'
import Icon, { IconName } from '@/components/ai-esti/Icon'

const FooterWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: ${({ theme }) => theme.body};
  border-top: 1px solid ${({ theme }) => theme.border};
  z-index: 100;
`

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0 20px;
`

const NavItem = styled(Link)<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  text-decoration: none;
  color: ${({ theme, $isActive }) => ($isActive ? theme.accent : theme.subtleText)};
  font-size: 12px;
  min-width: 64px;
  padding: 8px 0;

  &:hover {
    color: ${({ theme }) => theme.accent};
  }
`

const IconWrapper = styled.div<{ $isActive?: boolean }>`
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.7)};
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
`

const NavText = styled.span`
  font-weight: 500;
`

const Footer = () => {
  const pathname = usePathname()
  const { isDarkMode } = useThemeStore()

  const navItems: { href: string; icon: string; fallbackIcon: IconName; text: string }[] = [
    {
      href: '/',
      icon: isDarkMode ? '/main/consultation_dark.png' : '/main/consultation_light.png',
      fallbackIcon: 'chat',
      text: '견적상담',
    },
    {
      href: '/my-estimate',
      icon: isDarkMode ? '/main/estimate_dark.png' : '/main/estimate_light.png',
      fallbackIcon: 'document',
      text: '나의견적',
    },
    {
      href: '/settings',
      icon: isDarkMode ? '/main/setting_dark.png' : '/main/setting_light.png',
      fallbackIcon: 'settings',
      text: '설정',
    },
    {
      href: '/ai-estimate',
      icon: isDarkMode ? '/main/full_dark.png' : '/main/full_light.png',
      fallbackIcon: 'expand',
      text: '전체화면',
    },
  ]

  return (
    <FooterWrapper>
      <FooterContent>
        {navItems.map((item) => (
          <NavItem 
            key={item.href} 
            href={item.href} 
            $isActive={pathname === item.href}
          >
            <IconWrapper $isActive={pathname === item.href}>
              <Icon 
                src={item.icon} 
                width={80} 
                height={60} 
                fallbackIcon={item.fallbackIcon}
              />
            </IconWrapper>
            {/* <NavText>{item.text}</NavText> */}
          </NavItem>
        ))}
      </FooterContent>
    </FooterWrapper>
  )
}

export default Footer