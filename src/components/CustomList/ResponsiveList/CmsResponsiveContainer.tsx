"use client";

import React from "react";
import ResponsiveView from "@/layout/ResponsiveView";
import { AdminUser } from "../types";
import { ColumnDefinition } from "@/components/CustomList/GenericDataTable";
import CmsMobileView from "./CmsMobileView";
import CmsDesktopView from "./CmsDesktopView";

// BaseRecord 타입 정의
interface BaseRecord {
  id?: string | number;
  index?: number;
  [key: string]: any;
}

// ViewMode 타입 추가
type ViewMode = 'detail' | 'compact' | 'large';

interface CmsResponsiveContainerProps<T extends BaseRecord> {
  title: string;
  data: T[];
  columns: ColumnDefinition<T>[];
  onRowClick?: (item: T) => void;
  onAdd?: () => void;
  addButtonLabel?: string;
  onExport?: () => void;
  isLoading?: boolean;
  fetchData?: () => Promise<{ data: T[]; totalItems: number; allItems: number; }>;
  themeMode?: "light" | "dark";
  compactFieldCount?: number;
  defaultViewMode?: ViewMode; // 모바일에서 기본 보기 모드
  enableDateFilter:boolean;
}

export default function CmsResponsiveContainer<T extends BaseRecord = AdminUser>({
  title,
  data,
  columns,
  onRowClick,
  onAdd,
  addButtonLabel,
  onExport,
  isLoading = false,
  fetchData,
  themeMode = "light",
  compactFieldCount = 3,
  defaultViewMode = 'detail',
  enableDateFilter
}: CmsResponsiveContainerProps<T>) {
  
  // 공통 props
  const commonProps = {
    title,
    data,
    columns,
    onRowClick,
    onAdd,
    onExport,
    isLoading,
    fetchData,
    themeMode,
    compactFieldCount,
    defaultViewMode,
    enableDateFilter
  };

  return (
    <ResponsiveView
      mobileView={<CmsMobileView {...commonProps} />}
      desktopView={<CmsDesktopView {...commonProps} addButtonLabel={addButtonLabel} />}
    />
  );
}
