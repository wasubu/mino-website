import React, { createContext, useContext, useEffect, useRef, useState, type KeyboardEvent } from "react"

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
    isOpen: boolean
} | null>(null)

export function ContextMenuProvider({ children }: { children: React.ReactNode }) {
    const [menu, setMenu] = useState<MenuState | null>(null)
    const selectedTextRef = useRef("")

    const openMenu = (items: MenuItem[], e: React.MouseEvent) => {
        e.preventDefault()
        e.stopPropagation()
        selectedTextRef.current = getSelectedText()
        const finalItems: MenuItem[] = []
        if (selectedTextRef.current.trim().length > 0) {
            finalItems.push({
                label: "Copy",
                onClick: async () => {
                    try {
                        await navigator.clipboard.writeText(selectedTextRef.current)
                    } catch (err) {
                        console.warn("Clipboard write failed", err)
                    }
                    closeMenu()
                }
            })
        }
        setMenu({
            x: e.clientX,
            y: e.clientY,
            items: [...finalItems, ...items]
        })
    }

    const closeMenu = () => setMenu(null)

    useEffect(() => {
        if (!menu) return

        const handleClick = () => closeMenu()
        const handleScroll = () => closeMenu()
        const handleKey = (e: globalThis.KeyboardEvent) => {
            if (e.key === "Escape") closeMenu()
        }
        window.addEventListener("mousedown", handleClick)
        window.addEventListener("wheel", handleScroll, { passive: true })
        window.addEventListener("keydown", handleKey)

        return () => {
            window.removeEventListener("mousedown", handleClick)
            window.removeEventListener("wheel", handleScroll)
            window.removeEventListener("keydown", handleKey)
        }
    }, [menu])


    return (
        <ContextMenuContext.Provider value={{ openMenu, closeMenu, isOpen: !!menu }}>
            {children}
            {menu && (
                <ul
                    className="fixed z-50 bg-white text-black rounded-md shadow-lg p-1"
                    style={{ top: menu.y, left: menu.x }}
                    onMouseDown={(e) => e.stopPropagation()}
                >
                    {menu.items.map((item, i) => (
                        <li
                            key={i}
                            className="px-3 py-2 hover:bg-blue-100 cursor-pointer rounded-md"
                            onClick={() => {
                                item.onClick()
                                closeMenu()
                            }}
                        >{item.label}</li>
                    ))}
                </ul>
            )}
        </ContextMenuContext.Provider>
    )
}

function getSelectedText() {
    return window.getSelection()?.toString() ?? ""
}


export function useContextMenu() {
    const ctx = useContext(ContextMenuContext)
    if (!ctx) throw new Error("useContext Menu must be used inside Context MenuProvider")
    return ctx
}