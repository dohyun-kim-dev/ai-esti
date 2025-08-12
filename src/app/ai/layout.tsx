'use client'

import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const Tabs = styled.nav`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px 16px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.surface1};
  border-radius: 8px;
  margin: 8px auto 12px;
  max-width: 960px;
`

const Tab = styled(Link)<{ $active?: boolean }>`
  padding: 8px 12px;
  border-radius: 6px;
  color: ${({ theme, $active }) => ($active ? theme.body : theme.text)};
  background: ${({ theme, $active }) => ($active ? theme.accent : 'transparent')};
  font-weight: 600;
  text-decoration: none;
`

export default function AiLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const base = '/ai'
  return (
    <div style={{ padding: '8px 16px' }}>
      <Tabs>
        <Tab href={`${base}`} $active={pathname === base}>대화</Tab>
        <Tab href={`${base}/history`} $active={pathname === `${base}/history`}>히스토리</Tab>
        <Tab href={`${base}/settings`} $active={pathname === `${base}/settings`}>설정</Tab>
      </Tabs>
      {children}
    </div>
  )
}
