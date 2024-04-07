'use client';
import { useState } from 'react';
// import SideNav from '@/app/ui/dashboard/sidenav';
import SideNav from '@/app/ui/nav/sidenav';
import HeaderBar from '@/app/ui/nav/header-bar';
import SideHeader from '@/app/ui/nav/side-header';
// import SideNav from '@/app/ui/nav/sidenav';
import {FloatLeftPanel, BackdropPanel} from '@/app/components/panels';
import clsx from 'clsx';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import LogoIcon from '@/app/ui/logo-icon';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [floatLeftPanelOpened, setFloatLeftPanelOpened] = useState(false);
  
  return (
    <>
    <div className="flex h-screen overflow-hidden flex-col md:flex-row ">
      <div className={clsx("group flex-none bg-white hidden md:block transition-width duration-200 shadow",
        {
          'collapsed': collapsed, 
          'w-64': !collapsed,
          'w-14': collapsed,
        })}>
        <SideHeader className="" collapsed={collapsed} onCollapse={(checked) => setCollapsed(checked)}/>
        <SideNav className={clsx("", { })} collapsed={collapsed}/>
      </div>
      <div className="flex-grow px-6 h-full overflow-y-auto">
        <HeaderBar onClickNavButton={() => setFloatLeftPanelOpened(true)}/>
        <div className="md:py-6">{children}</div>
      </div>
    </div>

    <FloatLeftPanel className="md:hidden" opened={floatLeftPanelOpened} >
        <header className={clsx("flex justify-between items-center min-h-headerh h-headerh max-h-headerh w-full px-4 " , {
          })}> 
          <a className="h-6 w-6" onClick={()=>{setFloatLeftPanelOpened(false);}}> <ArrowLeftIcon /> </a>
          <LogoIcon />
        </header>
        <SideNav className="" collapsed={false} onClickLink={(e)=>{setFloatLeftPanelOpened(false);}}/>
    </FloatLeftPanel>
    {/*panel-overlay--> */}
    <BackdropPanel className="md:hidden" opened={floatLeftPanelOpened}  onClick={()=>{setFloatLeftPanelOpened(false);}}/>
    </>
  );
}