import {useEffect, useState} from "react";

export const useResizeWindow = () => {

    const [size, setSize] = useState<{windowInnerWidth:number,windowInnerHeight:number} | null>(null)

    useEffect(() => {
        const listener = () => {
            setSize({
                windowInnerWidth: window.innerWidth,
                windowInnerHeight: window.innerHeight,
            })
        }
        if (size === null) listener()
        window.addEventListener('resize', listener)
        return () => {
            window.removeEventListener('resize', listener)
        }
    }, [])

    return size ?? {windowInnerWidth: 0,windowInnerHeight: 0}
}
