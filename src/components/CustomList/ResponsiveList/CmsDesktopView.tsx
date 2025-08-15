"use client";

import React, { useRef } from "react";
import GenericListUI, { FetchParams } from "@/components/CustomList/GenericListUI";
import { ColumnDefinition } from "@/components/CustomList/GenericDataTable";

// BaseRecord 타입 정의
interface BaseRecord {
  id?: string | number;
  index?: number;
  [key: string]: any;
}

interface CmsDesktopViewProps<T extends BaseRecord> {
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
  compactFieldCount?: number; // 모바일용이지만 props 통일을 위해
  defaultViewMode?: 'detail' | 'compact' | 'large'; // 모바일용이지만 props 통일을 위해
  enableDateFilter?:boolean;
}

export default function CmsDesktopView<T extends BaseRecord>({
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
  enableDateFilter
}: CmsDesktopViewProps<T>) {
  const listRef = useRef<{ refetch: () => void } | null>(null);

  const handleFetchData = async (params: FetchParams) => { // ✅ params를 받습니다.
    if (fetchData) {
      return await fetchData(params); // ✅ params를 전달합니다.
    }
    // 기본 더미 데이터 반환
    return {
      data,
      totalItems: data.length,
      allItems: data.length,
    };
  };

  return (
    <GenericListUI<T>
      ref={listRef}
      title={title}
      excelFileName="데이터 목록"
      columns={columns}
      fetchData={handleFetchData}
      themeMode={themeMode}
      enableDateFilter={false}
      onAdd={onAdd}
      addButtonLabel={addButtonLabel}
      onRowClick={onRowClick}
      enableDateFilter={enableDateFilter}
    />
  );
}
