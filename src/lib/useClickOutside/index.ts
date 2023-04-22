import {useEffect} from "react";

export const useClickOutside = (handler: Function, ignoreIdList: Array<string> = [], width?: number) => {

    const ignoredAppIdList = [`Confirm`]

    useEffect(() => {
        if (width && width < window.innerWidth) return
        const listener = (e: any) => {
            const ignoreNodeList: any = [...ignoreIdList, ...ignoredAppIdList].map(id => document.getElementById(id)).filter(el => !!el)
            for (let i = 0; i < ignoreNodeList.length; i++) {
                if (ignoreNodeList[i].contains(e.target)) {
                    return
                }
            }
            handler(e)
        }
        document.addEventListener('pointerdown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('pointerdown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [])
}
