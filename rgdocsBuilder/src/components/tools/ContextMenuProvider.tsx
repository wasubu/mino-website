import React, { createContext, useContext, useState } from "react"

type MenuItem = {
    label: string
    onClick: () => void
}

type MenuState = {
    x: number
    y: number
    items: MenuItem[]
}

// ContextMenuProvider.tsx
const ContextMenuContext = createContext<{
    openMenu: (items: MenuItem[], e: React.MouseEvent) => void
    closeMenu: () => void
} | null>(null)

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
    const [menu, setMenu] = useState<MenuState | null>(null)

    const openMenu = (items: MenuItem[], e: React.MouseEvent) => {
        e.preventDefault()
        setMenu({
            x: e.clientX,
            y: e.clientY,
            items
        })
    }

    const closeMenu = () => setMenu(null)

    return (
        <ContextMenuContext.Provider value={{ openMenu, closeMenu }}>
            {children}
            {menu && (
                <ul
                    className="fixed z-50 bg-zinc-800 text-white rounded-md shadow-lg"
                    style={{ top: menu.y, left: menu.x }}
                    onClick={closeMenu}
                >
                    {menu.items.map((item, i) => (
                        <li
                            key={i}
                            className="px-3 py-2 hover:bg-zinc-700 cursor-pointer"
                            onClick={item.onClick}
                        >{item.label}</li>
                    ))}
                </ul>
            )}
        </ContextMenuContext.Provider>
    )
}


export function useContextMenu() {
    const ctx = useContext(ContextMenuContext)
    if (!ctx) throw new Error("useContext Menu must be used inside Context MenuProvider")
    return ctx
}