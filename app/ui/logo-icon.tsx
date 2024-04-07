import clsx from 'clsx';
import {
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

export default function()  {
  return (
    <GlobeAltIcon className={clsx("h-8 w-8 rotate-[15deg] text-blue-600/100 group-[.collapsed]:hidden", {})} />
  );
};