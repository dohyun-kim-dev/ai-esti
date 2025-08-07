// src/app/ai-estimate/components/EstimateActionButtons.tsx
"use client";

import React from 'react';
import styled from 'styled-components';
import { IoChevronForward } from 'react-icons/io5';
import Icon from './Icon';

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (min-width: 1024px) {
    margin-top: 0;
  }
`;

const ActionButton = styled.button`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
  border: none;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.surface1};
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  @media (min-width: 1024px) {
    padding: 24px;
    min-height: 120px;
    flex-direction: column;
  }

  &:hover {
    background-color: ${({ theme }) => theme.pick};
  }
`;

const LeftContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;
const Flex = styled.div`
display:flex;
align-items:center;
gap:10px;
`

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  @media (min-width: 1024px) {
    font-size: 20px;
  }
`;

const Description = styled.div`
  font-size: 14px;
  color: ${({ theme }) => theme.subtleText};
  opacity: 0.8;
  width: 100%;
  line-height: 1.4;
  white-space: pre-line;
  text-align: left;
  margin-top: 4px;

  @media (min-width: 1024px) {
    font-size: 16px;
    margin-top: 20px;
    margin-bottom: 50px;
  }
`;

const ChevronIcon = styled(IoChevronForward)`
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  @media (min-width: 1024px) {
    display: none;
  }
`;

const ActionButtonBottom = styled.div`
  display: none;
  
  @media (min-width: 1024px) {
  width:100%;
  margin-top:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 36px;
    background-color: ${({ theme }) => theme.accent};
    color: white;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.9;
    }
  }
`;

interface EstimateActionButtonsProps {
  onConsult?: () => void;
  onAiEstimate?: () => void;
  onAiOptimize?: () => void;
}

const EstimateActionButtons: React.FC<EstimateActionButtonsProps> = ({
  onConsult,
  onAiEstimate,
  onAiOptimize
}) => {
  return (
    <ButtonsContainer>
      <ActionButton onClick={onConsult}>
        <LeftContent>
          <TextContent>
          <Flex>
          <IconWrapper>
            <Icon src="/ai-estimate/docs.png" width={24} height={24} />
          </IconWrapper><Title>여기닷에게 문의하기</Title>
          </Flex>

            <Description>대표님의 예산에 맞춘 기능들을 
            견적으로 <br></br>자세히 받아보세요 ~ 등등</Description>
                    </TextContent>
          </LeftContent>
          <ChevronIcon size={20} />
          <ActionButtonBottom>문의하기</ActionButtonBottom>
        </ActionButton>

        <ActionButton onClick={onAiEstimate}>
          <LeftContent>
            <TextContent>
            <Flex>
            <IconWrapper>
              <Icon src="/ai-estimate/trending_down.png" width={24} height={24} />
            </IconWrapper><Title>AI 예산 줄이기</Title>
            </Flex>

              <Description>기능을 조소화 하여 전략기준 <br></br>스마트하게 줄임</Description>
            </TextContent>
          </LeftContent>
          <ChevronIcon size={20} />
          <ActionButtonBottom>AI 예산 줄이기</ActionButtonBottom>
        </ActionButton>

        <ActionButton onClick={onAiOptimize}>
          <LeftContent>
            <TextContent>
            <Flex>
            <IconWrapper>
              <Icon src="/ai-estimate/awesome.png" width={24} height={24} />
            </IconWrapper><Title>AI 맞춤 추천</Title>
            </Flex>

              <Description>AI가 문제된 필수 기능들을 빠르게 제안,<br></br> 사업성장에 핵심기능들 추천</Description>
            </TextContent>
          </LeftContent>
          <ChevronIcon size={20} />
          <ActionButtonBottom>AI 맞춤추천</ActionButtonBottom>
        </ActionButton>
    </ButtonsContainer>
  );
};

export default EstimateActionButtons;