import clsx from 'clsx';
import LogoIcon from '../logo-icon';
import { useState } from 'react';
import CollapseButton from './collapse-button';

import {TOnCollapse} from "@/app/lib/definitions";

export default function SideHeader({className}: {className: string}) {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={clsx("flex items-center justify-between group-[.collapsed]:justify-center min-h-headerh h-headerh max-h-headerh w-full px-4" + className, {
      
    })}> 
      <LogoIcon  />
      <span className={clsx("group-[.collapsed]:hidden", {})}>Storeity</span> 
      <CollapseButton/>
    </div>
  );
}