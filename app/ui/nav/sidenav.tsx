import Link from 'next/link';
import SideNavLinks, {SideNavLink} from './sidenav-links';
import { signOut } from '@/auth';
import clsx from 'clsx';
import Capacity from './capacity';
import ExpandButton from './collapse-button';
import {
  Cog6ToothIcon,
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  CubeIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

const links1 = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon, },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

const links2 = [
  { name: 'Store Visibility', href: '/dashboard', icon: FolderIcon },
  { name: 'App Downloads', href: '/dashboard/invoices', icon: CubeIcon, },
  { name: 'Download Trends', href: '/dashboard/customers', icon: PowerIcon },
];
export default function SideNav({className, collapsed, onClickLink} : {className: string, collapsed: boolean, onClickLink?: (event: React.MouseEvent)=>void}) {
  
  return (
    <nav className={clsx(
      'bg-white flex h-[calc(100%_-_3rem)] flex-col gap-4 overflow-auto hide-scrollbar w-full' + className, {
      })}>
     
      <SideNavLinks title="OVERVIEW" links={links1} onClickLink={onClickLink} collapsed={collapsed}/>
      <SideNavLinks title="ANALYZE MARKET" links={links2} onClickLink={onClickLink} collapsed={collapsed}/>
      
      <div className="grow"/> 
      {/* <Capacity collapsed={collapsed}/> */}
     
      <SideNavLink item={{name: "Setting", href: "", icon: Cog6ToothIcon}} collapsed={collapsed}/>
    </nav>
  );
}