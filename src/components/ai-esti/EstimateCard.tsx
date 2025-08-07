"use client";

import React from 'react';
import styled from 'styled-components';
import { ProjectEstimate } from '../types';
import Icon from './Icon';

const CardWrapper = styled.div`
  background-color: ${({ theme }) => theme.surface1};
  color: ${({ theme }) => theme.text};
  border-radius: 12px;
  overflow: hidden;
  margin: 24px 0;
`;

const Header = styled.div`
  padding: 10px 8px 0 8px;

`;

  const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 32px 0;
`;

const Title = styled.h2`
  font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
`;


const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Price = styled.p`
  font-size: 20px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 0.4px;
  margin: 0 0 8px 0;
  
  span {
    font-size: 0.7em;
    font-weight: normal;
    color: ${({ theme }) => theme.subtleText};
    margin-left: 8px;
  }
`;

const Period = styled.p`
  font-size: 16px;
font-style: normal;
font-weight: 700;
line-height: normal;
letter-spacing: 0.32px;
  color: ${({ theme }) => theme.text};
  margin: 0 0 24px 0;

  .p {
  font-size: 12px;
font-style: normal;
font-weight: 400;
line-height: normal;
letter-spacing: 0.24px;
color: ${({ theme }) => theme.subtleText};
}
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 4px;
  border-top: 1px solid ${({ theme }) => theme.border};
  margin: 4px;
`;

const Line = styled.div`
  border-left: 1px solid ${({ theme }) => theme.border};
  `;

const ActionButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 12px;
  border-radius: 8px;
  border: none;
  background-color: ${({ theme, primary }) => (primary ? theme.accent : 'transparent')};
  color: ${({ theme, primary }) => (primary ? (theme.body) : theme.accent)};
  font-family: Roboto;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; 
  letter-spacing: 0.28px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

interface EstimateCardProps {
  estimate: ProjectEstimate;
}

const EstimateCard: React.FC<EstimateCardProps> = ({ estimate }) => {
  // estimated_period가 '30주'와 같은 문자열일 경우를 가정하고 숫자만 추출합니다.
  const weekValue = parseInt(estimate.estimated_period);

  // 1개월의 평균 주 수 (30.41일 / 7일)를 사용하여 개월 수를 계산하고 올림 처리합니다.
  const weeksPerMonth = 4.345;
  const monthValue = Math.ceil(weekValue / weeksPerMonth);

  // 최종적으로 보여줄 기간 문자열을 생성합니다.
  const displayPeriod = `(약 ${monthValue}개월)`;

  return (
    <CardWrapper>
      <Header>
        <Flex>
        <Title>{estimate.project_name}</Title>
        <Right>
        <span><Icon src={'/ai-estimate/share2_dark.png'} width={36} height={36} /></span>
        <span><Icon src={'/ai-estimate/download_dark.png'} width={36} height={36} /></span>
        </Right>

        </Flex>
        <Price>
          KRW {estimate.total_price}
          <span>(부가세 별도)</span>
        </Price>
        {/* 계산된 displayPeriod를 Period 컴포넌트에 적용 */}
        <Period>
          <span style={{marginRight: '4px'}}>{estimate.estimated_period}</span>
          <span className="p">{displayPeriod}</span>
        </Period>
        <ActionButtons>
          <ActionButton>AI 예산 줄이기</ActionButton>
          <Line></Line>
          <ActionButton>AI 맞춤 추천</ActionButton>
        </ActionButtons>
      </Header>
    </CardWrapper>
  );
};

export default EstimateCard;
