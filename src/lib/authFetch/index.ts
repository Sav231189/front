import {ACCESS_TOKEN} from "config/constants";

const getRequest = (input: RequestInfo | URL, init?: RequestInit) => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN)
    let newRequest: Request

    if (typeof input === `string`) {
        init = {...init, headers: {...init?.headers, 'jwt': `Bearer ${accessToken}`}}
        newRequest = new Request(input, init)
    } else {
        newRequest = new Request(input)
        newRequest.headers.set('jwt', `Bearer ${accessToken}`)
    }
    return newRequest
}

export const authFetch = (checkAuth: Function) => async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {

    const newRequest = getRequest(input,init)

    const response = await fetch(newRequest.clone())

    if (response.status === 403) {
        await checkAuth()
        return await fetch(getRequest(newRequest.clone()))

        // if (auth === null) window.location.reload()
        // else return await fetch(getRequest(newRequest.clone()))
    }

    return response
}
