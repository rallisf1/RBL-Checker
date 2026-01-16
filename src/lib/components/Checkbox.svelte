<script lang="ts">
import {type FormElementAttributes} from '$lib/components/types'

interface Checkbox extends FormElementAttributes {
    checked?: boolean | "indeterminate",
    indeterminate?: boolean
}

let { id = null, name, size = 'md', color = "neutral", label, disabled = false, readonly = false, isValid = null, checked = false, indeterminate = false, events = {} }: Checkbox = $props()

let checkbox: HTMLInputElement

const boxsize = `checkbox-${size}`
const fontsize = `text-${size}`
const colorbox = `checkbox-${color}`

$effect(() => {
    if(checked === "indeterminate") checkbox.indeterminate = true
    if(indeterminate || checked === "indeterminate") {
        checkbox.addEventListener("click", handleIndeterminate)
    }
    return () => {
        if(indeterminate || checked === "indeterminate") {
            checkbox.removeEventListener("click", handleIndeterminate)
        }
    }
})

const handleIndeterminate = (e: Event) => {
    const box = (e.target as HTMLInputElement)
    if(box.checked === false) {
        e.preventDefault()
        box.indeterminate = true
    }
}
</script>


<label class="form-control flex items-center gap-2">
    <input {id} {name} type="checkbox" bind:this={checkbox} class="checkbox {colorbox} {boxsize}" class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled} {readonly} checked={checked === true} onchange={events.change} />
    <span class="label cursor-pointer flex-row">
        <span class="{fontsize}">{label}</span>
    </span>
</label>