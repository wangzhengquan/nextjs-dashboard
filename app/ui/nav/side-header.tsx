import clsx from 'clsx';
import LogoIcon from '../logo-icon';
import { useState } from 'react';
import CollapseButton from './collapse-button';

import {TOnCollapse} from "@/app/lib/definitions";

export default function SideHeader({className, collapsed, onCollapse}: {className: string, collapsed: boolean, onCollapse: TOnCollapse}) {
  // const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={clsx("flex items-center min-h-headerh h-headerh max-h-headerh w-full px-4" + className, {
      "justify-between": !collapsed,
      "justify-center": collapsed,
    })}> 
      <LogoIcon  />
      <span className={clsx("group-[.collapsed]:hidden", {})}>Storeity</span> 
      <CollapseButton onCollapse={(checked: boolean) => onCollapse(checked)}/>
    </div>
  );
}