"use client"

import type { TreeItem } from "@/lib/tree"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Navigation } from "@/components/docs-navigation"
import { headerNavigation } from "@/components/main-navbar"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
} from "@/components/ui/sidebar"
import { current } from "@/lib/navigation"
import { cn } from "@/lib/utils"
import { ChevronsUpDown } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function SiteSidebar({
  items,
  collections,
  activeCollection,
  hideSwitcher,
  defaultHidden,
}: {
  items: TreeItem[]
  collections: string[]
  activeCollection: string
  hideSwitcher?: boolean
  defaultHidden?: boolean
}) {
  const pathname = usePathname()

  return (
    <Sidebar className="md:mt-12" defaultHidden={defaultHidden}>
      {!hideSwitcher && (
        <SidebarHeader>
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full rounded-md ring-ring hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 data-[state=open]:bg-accent">
              <div className="flex items-center gap-1.5 overflow-hidden px-2 py-1.5 text-left text-sm transition-all">
                <div className="line-clamp-1 flex-1 pr-2 font-medium">
                  {activeCollection}
                </div>
                <ChevronsUpDown className="ml-auto h-4 w-4 text-muted-foreground/50" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-64"
              align="start"
              side="right"
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Collections
              </DropdownMenuLabel>
              {collections.map((element) => (
                <DropdownMenuItem
                  key={element}
                  className="items-start gap-2 px-1.5"
                  asChild
                >
                  <Link href={`/docs/${element}`}>
                    <div className="grid flex-1 leading-tight">
                      <div className="line-clamp-1 font-medium">{element}</div>
                    </div>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>
      )}
      <SidebarContent>
        <SidebarItem className="border-b pb-5 md:hidden">
          <SidebarLabel>Navigation</SidebarLabel>
          <Navigation items={headerNavigation as TreeItem[]} />
        </SidebarItem>
        {items.map((item) => {
          if (item.children) {
            return (
              <SidebarItem key={item.path}>
                {item.isFile && item.children.length === 0 && (
                  <Link
                    href={item.path}
                    className={cn(
                      "flex min-w-8 flex-1 items-center px-1.5 text-sm text-muted-foreground outline-none ring-ring transition-all hover:text-accent-foreground focus-visible:ring-2",
                      current({ pathname, item }) ? "font-medium" : "",
                    )}
                  >
                    {item.title}
                  </Link>
                )}
                {item.isFile && item.children.length > 0 && (
                  <Link href={item.path}>
                    <SidebarLabel>{item.title}</SidebarLabel>
                  </Link>
                )}
                {!item.isFile && <SidebarLabel>{item.title}</SidebarLabel>}
                <Navigation items={item.children} />
              </SidebarItem>
            )
          }
        })}
      </SidebarContent>
    </Sidebar>
  )
}
