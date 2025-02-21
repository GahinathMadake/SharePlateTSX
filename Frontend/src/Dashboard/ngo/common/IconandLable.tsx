import { LucideIcon } from 'lucide-react';
import React from 'react';

interface IconLabelData{
    label:String,
    icon: LucideIcon,
}

interface IconLabelProps{
    item:IconLabelData,
}


const IconAndLabel: React.FC<IconLabelProps> = ({item}) => { 
  return (
    <div className="opacity-70 text-sm flex items-center gap-[5px]">
        <item.icon className="w-[18px] "/>
        <span>{item.label}</span>
    </div>
  )
}

export default IconAndLabel