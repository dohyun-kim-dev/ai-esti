"use client"

import React, { useState } from 'react'
import styled from 'styled-components'
import useAI from '@/hooks/useAI'
import { useToast } from '@/components/common/ToastProvider'
import { useChatStore } from '@/store/chatStore'
import BottomInput from '@/components/ai-esti/BottomInput'
import AiResponseMessage from '@/components/ai-esti/AiResponseMessage'
import PromptSelector from '@/components/ai-esti/PromptSelector'
import { promptTemplates, combinePrompts } from '@/ai/promptTemplates'
import EstimateCard from '@/components/ai-esti/EstimateCard'
import EstimateAccordion from '@/components/ai-esti/EstimateAccordion'
import DetailModal from '@/components/ai-esti/DetailModal'
import EstimateActionButtons from '@/components/ai-esti/EstimateActionButtons'
import PeriodSlider from '@/components/ai-esti/PeriodSlider'
import { IoChevronDown, IoChevronUp } from 'react-icons/io5'
import type { ProjectEstimate } from '@/app/ai-estimate/types/projectEstimate'
import type { EstimateItem } from '@/app/ai-estimate/types'

const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 16px;
  padding-bottom: calc(76px + env(safe-area-inset-bottom));
`

const ChatBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: 8px;
  padding: 12px;
  min-height: 320px;
`

const UserMessage = styled.div`
  align-self: flex-end;
  background: ${({ theme }) => theme.surface1};
  color: ${({ theme }) => theme.text};
  padding: 10px 12px;
  border-radius: 12px;
  max-width: 80%;
  white-space: pre-wrap;
`
const StyledAiMessage = styled(AiResponseMessage)<{ isFullWidth?: boolean }>`
  padding: 0;
  max-width: ${({ isFullWidth }) => (isFullWidth ? '100%' : '80%')}; // 👈 prop에 따라 동적 스타일 적용
  align-self: flex-start;
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

const Button = styled.button`
  height: 44px;
  padding: 0 16px;
  background: ${({ theme }) => theme.accent};
  color: ${({ theme }) => theme.body};
  border-radius: 8px;
  font-weight: 600;
`

const EstimateContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: flex-start;
    gap: 24px;
  }
`;

const MainContent = styled.div`
  flex: 1;
  min-width: 320px;
  width: 100%;

  @media (min-width: 1024px) {
    width: 560px;
  }
`;

const SideContent = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 320px;
    position: sticky;
    top: 120px;
  }
`;

const DetailsToggle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 160%; 
  letter-spacing: 0.28px;
  color: ${({ theme }) => theme.subtleText};
  cursor: pointer;
  margin: -20px 0 20px;
`;

const DetailsToggleIcon = styled.div`
  margin-top: 4px;
  margin-left: 10px;
`;

const AnimatedContainer = styled.div<{ $isvisible: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isvisible }) => ($isvisible ? '1fr' : '0fr')};
  transition: grid-template-rows 0.5s ease-in-out;
  overflow: hidden;

  > * {
    min-height: 0;
  }
`;

type ModelName = 'gemini-2.5-flash' | 'gemini-2.5-flash-lite' | 'gemini-2.0-flash';

// JSON 응답에서 견적서 데이터 추출
const extractEstimateData = (content: string): ProjectEstimate | null => {
  try {
    const match = content.match(/<script type="application\/json" id="invoiceData">([\s\S]*?)<\/script>/);
    if (!match) return null;
    
    const jsonStr = match[1];
    const data = JSON.parse(jsonStr);
    
    // 데이터 구조 검증
    if (!data || typeof data !== 'object' || !Array.isArray(data.categories)) {
      console.error('Invalid estimate data structure:', data);
      return null;
    }
    
    return data as ProjectEstimate;
  } catch (error) {
    console.error('Failed to parse estimate data:', error);
    return null;
  }
};

// AI 응답 메시지 렌더링 컴포넌트
const AiMessageContent: React.FC<{ content: string }> = ({ content }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<EstimateItem | null>(null);
  const [projectPeriod, setProjectPeriod] = useState(20); // 기본값
  
  const estimateData = extractEstimateData(content);
  
  const handleItemClick = (item: EstimateItem) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };
  
  if (estimateData && estimateData.categories) {
    return (
      <EstimateContainer>
        {/* 견적서 JSON 이전의 텍스트가 있다면 표시 */}
        {content.split('<script')[0].trim() && (
          <div style={{ marginBottom: '16px' }}>
            {content.split('<script')[0].trim()}
          </div>
        )}
        
        <TopSection>
          <MainContent>
            <EstimateCard estimate={estimateData} />
            <DetailsToggle onClick={() => setIsDetailsVisible(!isDetailsVisible)}>
              상세견적 보기 {isDetailsVisible ? 
                <DetailsToggleIcon><IoChevronUp size={24}/></DetailsToggleIcon> : 
                <DetailsToggleIcon><IoChevronDown size={24}/></DetailsToggleIcon>
              }
            </DetailsToggle>
            <PeriodSlider value={projectPeriod} onChange={setProjectPeriod} />
            <AnimatedContainer $isvisible={isDetailsVisible}>
              <EstimateAccordion 
                data={estimateData} 
                onItemClick={handleItemClick}
              />
            </AnimatedContainer>
          </MainContent>
          <SideContent>
            <EstimateActionButtons 
              onConsult={() => console.log('문의하기')}
              onAiEstimate={() => console.log('AI 예산 줄이기')}
              onAiOptimize={() => console.log('AI 맞춤 추천')}
            />
          </SideContent>
        </TopSection>
        
        {selectedItem && (
          <DetailModal 
            item={selectedItem} 
            onClose={handleCloseModal} 
          />
        )}
      </EstimateContainer>
    );
  }
  if (estimateData && estimateData.categories) {
    // 견적서 UI 렌더링
  } else if (content.includes('<script')) {
    // JSON 파싱 중일 때 로딩 상태 표시
    return <div>견적서를 불러오는 중...</div>;
  }
  
  return <div>{content}</div>;
};

export default function AiChatPage() {
  const { modelName, setModelName, generate, sendChat, resetChat, testModel } = useAI('gemini-2.5-flash-lite')
  const { success, error } = useToast()
  const messages = useChatStore((s) => s.messages)
  const addMessage = useChatStore((s) => s.addMessage)
  const clear = useChatStore((s) => s.clear)
  const [selectedPromptId, setSelectedPromptId] = useState('default')
  const [isProcessing, setIsProcessing] = useState(false)
  const updateLastMessage = useChatStore((s) => s.updateLastMessage);


  const isEstimateMessage = (content: string) => {
    return content.includes('<script type="application/json" id="invoiceData">');
  };


  const handleSubmit = async (input: string) => {
    if (!input.trim() || isProcessing) return;
  
    setIsProcessing(true);
  
    addMessage({ role: 'user', content: input });
    addMessage({ role: 'ai', content: '', isLoading: true });
  
    try {
      const combinedPrompt = combinePrompts(selectedPromptId, input);
      const reply = await sendChat(combinedPrompt);
      updateLastMessage(reply); // 마지막 메시지를 응답으로 업데이트
    } finally {
      setIsProcessing(false);
    }
  };

  const onTestModel = async () => {
    const r = await testModel()
    if (r.ok) success(`[${modelName}] OK: ${r.message}`)
    else error(`[${modelName}] ERROR: ${r.message}`)
  }

  const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setModelName(e.target.value as ModelName)
  }

  return (
    <Container>
      <h1 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>AI 대화</h1>
      <Controls>
        <Select value={modelName} onChange={handleModelChange}>
          <option value="gemini-2.5-flash">gemini-2.5-flash</option>
          <option value="gemini-2.5-flash-lite">gemini-2.5-flash-lite</option>
          <option value="gemini-2.0-flash">gemini-2.0-flash</option>
        </Select>
        <Button type="button" onClick={onTestModel}>모델 테스트</Button>
        <Button type="button" onClick={resetChat} style={{ background: '#374151' }}>채팅 세션 초기화</Button>
        <Button type="button" onClick={clear} style={{ background: '#6b7280' }}>메시지 비우기</Button>
        
        <PromptSelector
          templates={promptTemplates}
          selectedId={selectedPromptId}
          onSelect={setSelectedPromptId}
        />
      </Controls>

      <ChatBox>
        {messages.map((m, idx) => (
          m.role === 'user' ? (
            <UserMessage key={idx}>{m.content}</UserMessage>
          ) : (
            <StyledAiMessage 
              key={idx}
              content={<AiMessageContent content={m.content} />}
              profileImage="/ai-estimate/pretty.png"
              name="AI 에이전트"
              isFullWidth={isEstimateMessage(m.content)}
            />
          )
        ))}
      </ChatBox>

      <BottomInput 
        placeholder="메시지를 입력하세요"
        onSubmit={handleSubmit}
      />
    </Container>
  )
}