"use client"

import { type LucideIcon } from "lucide-react"
import { NavLink } from "react-router-dom"
import {
  SidebarGroup,
  SidebarMenu,
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
          <NavLink
            key={item.title}
            to={item.url}
            className={({ isActive }) =>
              `flex items-center justify-center my-2 p-2 rounded-lg hover:bg-gray-100 transition ${
                isActive ? "bg-gray-200" : ""
              }`
            }
            title={item.title} // Tooltip on hover
          >
            {item.icon && <item.icon className="w-6 h-6" />}
          </NavLink>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
