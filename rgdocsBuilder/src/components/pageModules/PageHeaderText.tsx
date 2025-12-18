import { useContextMenu } from "../tools/ContextMenuProvider"

//PageHeaderText.tsx - a temporary page for testing things
const PageHeaderText = ({ children, className }: {
    children: React.ReactNode
    className?: string
}) => {
    const { openMenu } = useContextMenu()
    const mainStyle = "cursor-pointer inline-block font-bold hover:text-blue-600 text-2xl"
    return (
        <div>
            <h2
                className={`${mainStyle} ${className}`}
                onContextMenu={(e) => {
                    e.preventDefault()
                    openMenu(
                        [
                            { label: "Copy header url", onClick: () => window.history.back() },
                            { label: "Copy header text", onClick: () => window.history.back() },
                        ],
                        e
                    )
                }
                }
            >{children}</h2>
        </div>
    )
}

export default PageHeaderText