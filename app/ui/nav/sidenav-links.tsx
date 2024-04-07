// "use client";
import Link from 'next/link';
import clsx from 'clsx';
import {
  TNavLink,
} from '@/app/lib/definitions';
// import { usePathname } from 'next/navigation';

export function SideNavLink({item}: {item: TNavLink}) {
  // const pathname = usePathname();
  
  return (
    <Link href={item.href} 
      title={item.name} 
      className={clsx("nav-link flex h-[48px] w-full grow items-center gap-2 bg-gray-50 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 flex-none justify-start p-2 px-3", {
      // "bg-sky-100 text-blue-600": pathname === item.href
      })}>
      <item.icon className="w-6 h-6 shrink-0"/>
      <span className="shrink truncate group-[.collapsed]:invisible">{item.name}</span> 
    </Link>
  );
}

export default function SideNavLinks({title, links} : {title: string, links: TNavLink[]}) {
  return (
    <section className=""> 
      <h2 className={clsx("px-4 text-slate-400 truncate group-[.collapsed]:invisible", {
        // "invisible": collapsed
      })}>{title}</h2>
      <ul className="">
        {links.map((item)=> {
          return ( 
            <li key={item.name}> 
              <SideNavLink item={item}  />
            </li>
            );
        })}
      </ul>
    </section>
  );
}
