"use client"

import { ChevronDown, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    onClick?: () => void
  }[]
}) {
  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            onClick={item.onClick}
            className={`flex items-center justify-center my-2 p-2 rounded-lg hover:bg-gray-100 transition ${
              item.isActive ? "bg-gray-200" : ""
            }`}
            title={item.title} // Tooltip on hover
          >
            {item.icon && <item.icon className="w-6 h-6" />}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
