import Link from 'next/link';
import clsx from 'clsx';
import {
  TNavLink,
} from '@/app/lib/definitions';

export function SideNavLink({onClick, item, collapsed}: { onClick?: (event: React.MouseEvent)=>void, item: TNavLink, collapsed: boolean}) {
  const handleClick = (event: React.MouseEvent) => {
    // Handle the click event here
    onClick?.(event);
    // console.log(`Navigating to ${item.href}`);
  };
  return (
    <Link href={item.href} onClick={handleClick} title={item.name} className="flex place-items-center px-4 py-2 hover:bg-slate-100">
      <item.icon className="w-6 h-6 shrink-0"/>
      <span className={clsx("shrink ml-4 truncate group-[.collapsed]:invisible", {
        // "md:invisible": collapsed
      })}>{item.name}</span> 
    </Link>
  );
}

export default function SideNavLinks({title, links, collapsed, onClickLink} : {title: string, links: TNavLink[], collapsed: boolean, onClickLink?: (event: React.MouseEvent) => void}) {
  return (
    <section className=""> 
      <h2 className={clsx("px-4 text-slate-400 truncate group-[.collapsed]:invisible", {
        // "invisible": collapsed
      })}>{title}</h2>
      <ul className="">
        {links.map((item)=> {
          return ( 
            <li key={item.name}> 
              <SideNavLink item={item} collapsed={collapsed} onClick={onClickLink}/>
            </li>
            );
        })}
      </ul>
    </section>
  );
}