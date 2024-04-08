export function FloatLeftPanel({id, children} : {id: string, children: React.ReactNode}) {
  
  return (
    <div id={id} className="bg-white fixed z-50 overflow-y-auto w-64 top-0 -left-64 h-full duration-300 transition-transform translate-x-0 [&.opened]:translate-x-64">
      {children}
    </div>
  )
}

export function BackdropPanel({ className}: {className?: string}) {
  return (
    <div id="backdrop-panel" className="backdrop-panel fixed left-0 top-0 w-full h-full bg-black/[0.3] z-10 inset-0 hidden [&.opened]:block md:[&.opened]:hidden"></div>
  );
}