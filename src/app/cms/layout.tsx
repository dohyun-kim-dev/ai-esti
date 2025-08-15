'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { usePathname, useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AdminAuthProvider, useAdminAuth } from '@/contexts/AdminAuthContext';
import { useDevice } from '@/contexts/DeviceContext';
import { THEME_COLORS } from '@/styles/theme_colors';
import { toast, ToastContainer } from 'react-toastify';

// Dynamic imports for components
const ResponsiveSidebar = dynamic(() => import('@/components/CustomSidebar/ResponsiveSidebar'), {
  ssr: false,
  loading: () => <div style={{ width: 250, background: '#2c2e3c' }} />
});
const CustomSidebarHeader = dynamic(() => import('@/components/CustomSidebar/CustomSidebarHeader'), {
  ssr: false
});

// Dynamic imports for icons
const DashboardIcon = dynamic(() => import('@mui/icons-material/Dashboard'));
const AdminPanelSettingsIcon = dynamic(() => import('@mui/icons-material/AdminPanelSettings'));
const PeopleIcon = dynamic(() => import('@mui/icons-material/People'));
const DatasetIcon = dynamic(() => import('@mui/icons-material/Dataset'));
const SettingsIcon = dynamic(() => import('@mui/icons-material/Settings'));
const DescriptionIcon = dynamic(() => import('@mui/icons-material/Description'));
const LogoutIcon = dynamic(() => import('@mui/icons-material/Logout'));
const AssessmentIcon = dynamic(() => import('@mui/icons-material/Assessment'));
const TextFieldsIcon = dynamic(() => import('@mui/icons-material/TextFields'));
const QuestionAnswerIcon = dynamic(() => import('@mui/icons-material/QuestionAnswer'));
const ChatIcon = dynamic(() => import('@mui/icons-material/Chat'));
const BusinessIcon = dynamic(() => import('@mui/icons-material/Business'));
const TuneIcon = dynamic(() => import('@mui/icons-material/Tune'));
const DownloadIcon = dynamic(() => import('@mui/icons-material/Download'));
const ContactSupportIcon = dynamic(() => import('@mui/icons-material/ContactSupport'));
const StorageIcon = dynamic(() => import('@mui/icons-material/Storage'));
const RequestQuoteIcon = dynamic(() => import('@mui/icons-material/RequestQuote'));

import type { MenuItemConfig } from '@/components/CustomSidebar/CustomSidebar';
import ScrollAwareWrapper from '@/layout/ScrollAwareWrapper';

export default function CmsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuthProvider>
      <ProtectedCmsLayout>{children}</ProtectedCmsLayout>
    </AdminAuthProvider>
  );
}

function ProtectedCmsLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, ready, logout } = useAdminAuth();
  const pathname = usePathname();
  const router = useRouter();
  const device = useDevice();
  const isLoginPage = pathname === '/cms/login';

  useEffect(() => {
    if (ready && !isLoggedIn && !isLoginPage) {
      router.replace('/cms/login');
    }
  }, [ready, isLoggedIn, isLoginPage]);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const handleLogout = () => {
    logout();
    router.replace('/cms/login');
    toast.success('로그아웃 되었습니다');
  };

  const effectiveSidebarExpanded = useMemo(
    () => (device === 'mobile' ? isMobileSidebarOpen : !isCollapsed),
    [device, isMobileSidebarOpen, isCollapsed]
  );

  const menuItems: MenuItemConfig[] = [
    { icon: <DashboardIcon />, title: '대시보드', path: '/cms' },
    { icon: <AdminPanelSettingsIcon />, title: '관리자 회원관리', path: '/cms/adminMng' },
    { icon: <PeopleIcon />, title: '고객관리', path: '/cms/userMng' },
    {
      icon: <DatasetIcon />,
      title: 'AI 데이터 관리',
      path: '/cms/aiData',
      subMenu: [
        { icon: <AssessmentIcon />, title: '기초조사 관리', path: '/cms/aiData/survey' },
        { icon: <TextFieldsIcon />, title: 'AI 프롬프트 관리', path: '/cms/aiData/prompt' },
        { icon: <QuestionAnswerIcon />, title: 'AI 동문서답 관리', path: '/cms/aiData/wrongAnswer' },
        { icon: <ChatIcon />, title: 'AI 대화이력 관리', path: '/cms/aiData/conversationHistory' },
      ],
    },
    {
      icon: <SettingsIcon />,
      title: 'AI 설정',
      path: '/cms/aiSetting',
      subMenu: [
        { icon: <BusinessIcon />, title: '회사정보 관리', path: '/cms/aiSetting/companyInfo' },
        { icon: <TuneIcon />, title: 'AI 설정관리', path: '/cms/aiSetting/mng' },
      ],
    },
    {
      icon: <StorageIcon />,
      title: '고객 데이터 관리',
      path: '/cms/userData',
      subMenu: [
        { icon: <RequestQuoteIcon />, title: '단가표 관리', path: '/cms/userData/price' },
        { icon: <DownloadIcon />, title: '견적 다운로드 현황', path: '/cms/userData/proposal' },
        { icon: <ContactSupportIcon />, title: '견적 문의 관리', path: '/cms/userData/inquiry' },
      ],
    },
    { icon: <DescriptionIcon />, title: '이용 약관 관리', path: '/cms/terms' },
  ];

  if (!ready || (!isLoggedIn && !isLoginPage)) return null;
  if (isLoginPage) return <>{children}</>;

  return (
    <ScrollAwareWrapper>
    <OuterLayoutContainer $themeMode="light" $device={device}>
      <ToastContainer position="top-center" autoClose={3000} />
      <ResponsiveSidebar
        isCollapsed={isCollapsed}
        toggleSidebar={toggleSidebar}
        menuItems={menuItems}
        footerIcon={<LogoutIcon />}
        onFooterClick={handleLogout}
        onMobileSidebarOpenChange={setIsMobileSidebarOpen}
      >
        <CustomSidebarHeader
          isCollapsed={isCollapsed}
          iconSrc="/icon.png"
          showTime={false}
        />
      </ResponsiveSidebar>
      <MainContent
  $device={device}
  $isSidebarExpanded={effectiveSidebarExpanded}
>
  {children}
</MainContent>
    </OuterLayoutContainer>
    </ScrollAwareWrapper>
  );
}

// --- Styled Components ---

const OuterLayoutContainer = styled.div<{
  $themeMode: "light" | "dark";
  $device: "mobile" | "tablet" | "desktop"; // $device prop 추가
}>`
  min-height: 100vh;
  background-color: #E6E7E9;
  
  // $device가 'mobile'이 아닐 때만 min-width 적용
  ${({ $device }) => $device !== 'mobile' && `
    min-width: 1200px;
  `}
`;


const MainContent = styled.div<{
  $device: "mobile" | "tablet" | "desktop";
  $isSidebarExpanded: boolean;
}>`
  transition: all 0.3s ease;
  box-sizing: border-box;
  background-color: #E6E7E9;

  ${({ $device, $isSidebarExpanded }) => {
    if ($device === "mobile") {
      return `
        margin-top: 56px;
        margin-left: ${$isSidebarExpanded ? "250px" : "0"};
        width: ${$isSidebarExpanded ? "calc(100% - 250px)" : "100%"};
        max-width: 100%;
        overflow-x: auto;
      `;
    } else {
      return `
        // padding-top: 40px;
        margin-left: ${$isSidebarExpanded ? "250px" : "80px"};
        min-width: 1200px;
        min-height: 100vh;
      `;
    }
  }}
`;
