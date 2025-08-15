'use client'

import React from 'react'
import styled from 'styled-components'
import Modal from '@/components/common/Modal'

interface AdditionalInfoModalProps {
  open: boolean
  onClose: () => void
}

const Content = styled.div`
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #cccccc;
  border-radius: 6px;
  font-size: 14px;
  background: #ffffff;
  color: #111827;
`

const Submit = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  background: #202055;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
  &:hover { opacity: 0.9; }
`

export default function AdditionalInfoModal({ open, onClose }: AdditionalInfoModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="회원 정보 입력" width={520} centerTitle>
      <Content>
        <Input placeholder="이름" />
        <Input placeholder="이메일" />
        <Submit>완료</Submit>
      </Content>
    </Modal>
  )
}