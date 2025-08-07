// src/app/ai-estimate/components/Icon.tsx
import React from 'react';
import styled from 'styled-components';

interface IconProps {
  src: string;
  width?: number;
  height?: number;
  angle?: number;
  className?: string;
  onClick?: () => void;
}

const ImageWrapper = styled.img<{ width?: number; height?: number; angle?: number }>`
  width: ${({ width }) => (width ? `${width}px` : 'auto')};
  height: ${({ height }) => (height ? `${height}px` : 'auto')};
  transform: ${({ angle }) => (angle ? `rotate(${angle}deg)` : 'none')};
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  padding: 0;
  margin:0
  &:hover {
    transform: ${({ angle }) => (angle ? `rotate(${angle}deg)` : 'none')} scale(1.1);
  }
`;

const Icon: React.FC<IconProps> = ({ src, width, height, angle, className, onClick }) => {
  return (
    <ImageWrapper
      src={src}
      width={width}
      height={height}
      angle={angle}
      className={className}
      onClick={onClick}
    />
  );
};

export default Icon;
