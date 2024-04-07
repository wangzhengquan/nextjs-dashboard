import clsx from 'clsx';
import { useState } from 'react';

export function FloatLeftPanel({opened, className, children} : {opened: boolean, className?: string, children: React.ReactNode}) {
  
  return (
    <div className={
      clsx("bg-white fixed z-50 overflow-y-auto w-64 top-0 -left-64 h-full duration-300 transition-transform " + className,
      {
        "translate-x-64": opened,
        "translate-x-0": !opened,
      }
    )}>
      {children}
    </div>
  )
}

export function BackdropPanel({opened, onClick, className}: {opened: boolean, onClick: ()=>void, className?: string}) {
  // const [leftPanelOpened, setLeftPanelOpened] = useState(false);
  return (
    <div className={clsx("fixed left-0 top-0 w-full h-full bg-black/[0.3] z-10 inset-0 " + className,
      {
      "block": opened,
      "hidden": !opened
      })}
      onClick={(event) => onClick()}
    ></div>
  );
}