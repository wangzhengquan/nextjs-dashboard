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
  ArrowDownTrayIcon,
  ArrowTrendingUpIcon,
  EyeIcon,
  PowerIcon,
} from '@heroicons/react/24/outline';

const links1 = [
  { name: 'Home', href: '/dashboard', icon: HomeIcon },
  { name: 'Invoices', href: '/dashboard/invoices', icon: DocumentDuplicateIcon, },
  { name: 'Customers', href: '/dashboard/customers', icon: UserGroupIcon },
];

const links2 = [
  { name: 'Store Visibility', href: '/dashboard', icon: EyeIcon },
  { name: 'App Downloads', href: '/dashboard/invoices', icon: ArrowDownTrayIcon, },
  { name: 'Download Trends', href: '/dashboard/customers', icon: ArrowTrendingUpIcon },
];
export default function SideNav({className} : {className: string}) {
  return (
    <nav className={clsx(
      'bg-white flex h-[calc(100%_-_3rem)] flex-col gap-4 overflow-auto hide-scrollbar w-full' + className, {
      })}>
     
      <SideNavLinks title="OVERVIEW" links={links1} />
      <SideNavLinks title="ANALYZE MARKET" links={links2} />
      
      <div className="grow"/> 
      {/* <Capacity collapsed={collapsed}/> */}
     
      <form action={async () => {
          'use server';
          await signOut();
        }}>
        <button className="flex h-[48px] w-full grow items-center gap-2 rounded-md bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none justify-start p-2 px-3">
          <PowerIcon className="w-6 h-6 shrink-0" />
          <span className="shrink truncate group-[.collapsed]:invisible">Sign Out</span>
        </button>
      </form>
      {/* <SideNavLink item={{name: "Setting", href: "", icon: Cog6ToothIcon}} collapsed={collapsed}/> */}
    </nav>
  );
}