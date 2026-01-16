export type Color = "primary" | "primary-content" | "secondary" | "secondary-content" | "accent" | "accent-content" | "neutral" | "neutral-content" | "base-100" | "base-200" | "base-300" | "base-content" | "base-shadow" | "info" | "info-content" | "success" | "success-content" | "warning" | "warning-content" | "error" | "error-content";

export type Size = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "default" | "wide" | "block"

export type FormElementAttributes = {
    id?: string | null,
    name: string,
    size?: Size,
    label?: string,
    color?: Color,
    disabled?: boolean,
    readonly?: boolean,
    isValid?: boolean | null
    events?: {
        change?: (e: Event) => void,
        blur?: (e: Event) => void,
        keyUp?: (e: Event) => void
    },
    value?:string | boolean
}

export type FixedArray<TType, TLength extends number> = TType[] & { length: TLength };

