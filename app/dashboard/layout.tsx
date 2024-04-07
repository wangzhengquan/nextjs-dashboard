import SideNav from '@/app/ui/nav/sidenav';
import HeaderBar from '@/app/ui/nav/header-bar';
import SideHeader from '@/app/ui/nav/side-header';
// import SideNav from '@/app/ui/nav/sidenav';
import {FloatLeftPanel, BackdropPanel} from '@/app/components/panels';
import clsx from 'clsx';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';
import LogoIcon from '@/app/ui/logo-icon';
import Interaction from '@/app/interaction/interaction';

export default function Layout({ children }: { children: React.ReactNode }) {
   
  return (
    <>
    <div className="flex h-screen overflow-hidden flex-col md:flex-row ">
      <div id="left-panel" className={clsx("group flex-none bg-white hidden md:block transition-width duration-200 shadow w-64 [&.collapsed]:w-14",
        {
          
        })}>
        <SideHeader className=""  />
        <SideNav className={clsx("", { })} />
      </div>
      <div className="flex-grow px-6 h-full overflow-y-auto">
        <HeaderBar/>
        <div className="md:py-6">{children}</div>
      </div>
    </div>

    <FloatLeftPanel id="float-left-panel" >
        <header className="flex justify-between items-center min-h-headerh h-headerh max-h-headerh w-full px-4"> 
          <a id="close-float-left-panel-btn" className="h-6 w-6" > <ArrowLeftIcon /> </a>
          <LogoIcon />
        </header>
        <SideNav className="" />
    </FloatLeftPanel>
    {/*panel-overlay--> */}
    <BackdropPanel  />

    <Interaction />
    </>
  );
}