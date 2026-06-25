import { useEffect } from "react"

export const useTitle = (title) => {
    useEffect(() => {
        const safeTitle = title ? String(title) : 'Codebook'
        document.title = `${safeTitle} - An E-commerce application built with React.`
    }, [title])
}