"use client";

import * as LucideIcons from "lucide-react";

export interface ClientIconProps {
  name: keyof typeof LucideIcons;
  className?: string;
}

export function ClientIcon({ name, className }: ClientIconProps) {
  const LucideIcon = LucideIcons[name] as React.ElementType || LucideIcons.HelpCircle;

  return <LucideIcon className={className || "w-6 h-6"} />;
}