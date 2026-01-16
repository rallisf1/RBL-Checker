import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {

    if (event.url.pathname === '/') {
        redirect(303, '/dashboard')
    }

    const response = await resolve(event)
    return response
}