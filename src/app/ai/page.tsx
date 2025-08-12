"use client"

import React, { useState } from 'react'
import styled from 'styled-components'
import useAI from '@/hooks/useAI'
import { useToast } from '@/components/common/ToastProvider'
import { buildSystemInstruction } from '@/ai/systemPrompt'
import { useChatStore } from '@/store/chatStore'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
`

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: ${({ theme }) => theme.surface1};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 8px;
  padding: 12px;
  min-height: 320px;
`

const Message = styled.div<{ $role: 'user' | 'ai' }>`
  align-self: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};
  background: ${({ $role, theme }) => ($role === 'user' ? theme.accent : theme.surface2)};
  color: ${({ $role, theme }) => ($role === 'user' ? theme.body : theme.text)};
  padding: 10px 12px;
  border-radius: 12px;
  max-width: 80%;
  white-space: pre-wrap;
`

const Controls = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
  flex-wrap: wrap;
`

const Select = styled.select`
  height: 36px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border-radius: 8px;
  padding: 0 8px;
`

const InputRow = styled.form`
  margin-top: 12px;
  display: flex;
  gap: 8px;
`

const TextInput = styled.input`
  flex: 1;
  height: 44px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 0 12px;
`

const Button = styled.button`
  height: 44px;
  padding: 0 16px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.body};
  border-radius: 8px;
  font-weight: 600;
`

export default function AiChatPage() {
  const { modelName, setModelName, generate, sendChat, resetChat, testModel, setSystemInstruction } = useAI('gemini-2.5-flash-lite')
  const [input, setInput] = useState('')
  const { success, error, info } = useToast()
  const messages = useChatStore((s) => s.messages)
  const addMessage = useChatStore((s) => s.addMessage)
  const clear = useChatStore((s) => s.clear)

  const onSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    addMessage({ role: 'user', content: input })
    const current = input
    setInput('')

    const reply = await sendChat(current)
    addMessage({ role: 'ai', content: reply })
  }

  const onQuickGenerate = async () => {
    const reply = await generate('간단 인사 한 줄만 해줘')
    addMessage({ role: 'ai', content: reply })
  }

  const onTestModel = async () => {
    const r = await testModel()
    if (r.ok) success(`[${modelName}] OK: ${r.message}`)
    else error(`[${modelName}] ERROR: ${r.message}`)
  }

  const applySystem = () => {
    const sys = buildSystemInstruction({
      userLocalization: {
        primary_language_code: 'ko',
        primary_currency_code: 'KRW',
        user_country_name: 'South Korea',
      },
      dataBlock: '',
    })
    setSystemInstruction(sys)
    info('시스템 프롬프트를 적용했어요.')
  }

  const clearSystem = () => {
    setSystemInstruction(undefined)
    info('시스템 프롬프트를 제거했어요.')
  }

  return (
    <Container>
      <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>AI 대화</h1>
      <Controls>
        <Select value={modelName} onChange={(e) => setModelName(e.target.value as any)}>
          <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
          <option value="gemini-2.0-flash">gemini-2.0-flash</option>
        </Select>
        <Button type="button" onClick={onTestModel}>모델 테스트</Button>
        <Button type="button" onClick={onQuickGenerate}>프롬프트 테스트</Button>
        <Button type="button" onClick={resetChat} style={{ background: '#374151' }}>채팅 세션 초기화</Button>
        <Button type="button" onClick={clear} style={{ background: '#6b7280' }}>메시지 비우기</Button>
        <Button type="button" onClick={applySystem} style={{ background: '#2563eb' }}>시스템 적용</Button>
        <Button type="button" onClick={clearSystem} style={{ background: '#6b7280' }}>시스템 제거</Button>
      </Controls>

      <ChatBox>
        {messages.map((m, idx) => (
          <Message key={idx} $role={m.role}>{m.content}</Message>
        ))}
      </ChatBox>
      <InputRow onSubmit={onSend}>
        <TextInput value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력하세요" />
        <Button type="submit">전송</Button>
      </InputRow>
    </Container>
  )
}
