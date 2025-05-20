export async function asyncGet(api: string, Auth: boolean) {
    try {
        const res: Response = await fetch(api, {
            headers: new Headers(
                Auth ? {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                } : undefined
            )
        })
        try {
            let data = res.json()
            return data
        } catch (error) {
            console.log(error)
            return error
        }
    } catch (error) {
        console.log(error)
        return error
    }
}

export async function asyncPost(api: string, body: {} | FormData, Auth: boolean) {
    const res: Response = await fetch(api, {
        method: 'POST',
        headers: new Headers(
            Auth ? {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'content-Type':"application/json"
            } : {
                'content-Type':"application/json"
            }
        ),
        body: body instanceof FormData ? body : JSON.stringify(body),
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

export async function asyncPatch(api: string, body: {} | FormData) {
    const res: Response = await fetch(api, {
        method: 'PATCH',
        headers: new Headers({
            'Access-Control-Allow-Origin': "http://localhost:5173/",
        }),
        body: body instanceof FormData ? body : JSON.stringify(body),
        mode: "cors"
    })
    try {
        let data = res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}