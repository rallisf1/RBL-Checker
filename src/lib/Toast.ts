import { Notyf } from "notyf"
import { browser } from '$app/environment'

type ToastOptions = {
    duration?: number,
    positionX?: "left" | "center" | "right",
    positionY?: "top" | "center" | "bottom",
    dismissible?: boolean,
    ripple?: boolean,
    type: "info" | "warning" | "error" | "primary" | "secondary" | "success",
    message: string
}

let notyfCustom: Notyf | null = null

if(browser && notyfCustom === null) {
    notyfCustom = new Notyf({
        duration: 3000,
        ripple: false,
        dismissible: false,
        position: {
            x: 'right',
            y: 'top'
        },
        types:[{
                type: 'info',
                className: 'bg-info',
                icon: { className: 'icon-[tabler--info-circle] !text-info-content size-6', tagName: 'span' }
            },
            {
                type: 'warning',
                className: 'bg-warning',
                icon: { className: 'icon-[tabler--alert-triangle] !text-warning-content size-6', tagName: 'span' }
            },
            {
                type: 'error',
                className: 'bg-error',
                icon: { className: 'icon-[tabler--alert-circle] !text-error-content size-6', tagName: 'span' }
            },
            {
                type: 'success',
                className: 'bg-success',
                icon: { className: 'icon-[tabler--circle-check] !text-success-content size-6', tagName: 'span' }
            },
            {
                type: 'primary',
                className: 'bg-primary',
                icon: false
            },
            {
                type: 'secondary',
                className: 'bg-secondary',
                icon: false
            }
        ] 
    })
}

export function showToast(options: ToastOptions){
    const textColor = `!text-${options.type}-content`

    const fullOptions = { ...notyfCustom!.options }

    if(options.duration) fullOptions.duration = options.duration
    if(options.positionX) fullOptions.position.x = options.positionX
    if(options.positionY) fullOptions.position.y = options.positionY
    if(options.dismissible) fullOptions.dismissible = true
    if(options.ripple) fullOptions.ripple = true

    notyfCustom!.open({
        ...fullOptions,
        type: options.type,
        message: `<div class="${textColor}">${options.message}</div>`
    })
}