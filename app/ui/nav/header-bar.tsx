'use client';
import Image from 'next/image';
import CollapseButton from './collapse-button';
import { Bars3Icon } from '@heroicons/react/24/outline';
import {TOnCollapse} from "@/app/lib/definitions";
// import Panels from "@/app/components/panels"
import SideNav from './sidenav';
import { createRoot } from "react-dom/client";
// import profilePic from '@/public/customers/john-doe.jpg'

export default function HeaderBar({onClickNavButton} : {onClickNavButton: ()=>void}) {
  
  return (
    <>
    <div className="flex shadow justify-between items-center min-h-headerh h-headerh max-h-headerh w-full">
      <a className="block md:hidden" onClick={(e) => {
          onClickNavButton();
        }} 
        >
        <Bars3Icon className="h-6 w-6"/>
      </a>
      <div className="grow-1"></div>
      <a href="" className="flex items-center py-3 grow-0">
      <Image
        // src={profilePic}
        src="/customers/john-doe.jpg"
        className="mr-2 rounded-full"
        width={28}
        height={28}
        alt={`Jone Doe's profile picture`}
      />
        <span>Jone Doe</span>
      </a>
    </div>
    
    </> 
  );
}