<script lang="ts">
import {type FormElementAttributes, type FixedArray} from '$lib/components/types'
import { iconHeight } from '$lib/helper'
import Icon from '@iconify/svelte'

interface Input extends FormElementAttributes {
    type?: "text" | "email" | "url" | "password" | "tel" | "number",
    placeholder?:string,
    hiddenLabel?: boolean,
    floatingLabel?: boolean,
    filledFloatingLabel?: boolean,
    labels: FixedArray<string | null, 4>,
    group?: boolean,
    icon?: string,
    iconLead?: boolean,
    value?: string,
    min?: number,
    max?: number,
    minlength?: number,
    maxlength?: number,
    required?: boolean
}

let {id=null, name, type = "text", labels = [null, null, null, null], size = 'md', icon = '',value, placeholder = '', disabled = false, readonly = false, isValid = null, hiddenLabel = false, floatingLabel = false, filledFloatingLabel = false, group = false, iconLead = false, min, max, minlength, maxlength, required=false, events = {} }: Input = $props()

const inputSize = `input-${size}`
</script>

{#if floatingLabel}
    {#if icon.length}
    <div class="w-full">
        <label class="input-group-filled">
        {#if iconLead}
            <span class="input-group-text">
                <Icon {icon} height={iconHeight(size)} />
            </span>
        {/if}
            <div class="form-control grow">
                <input {id} {name} {type} {min} {max} {minlength} {maxlength} {required} placeholder="{placeholder}" value={value} class="input input-filled peer {inputSize}"  class:input-floating={!filledFloatingLabel} class:input-filled={filledFloatingLabel}  class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled} {readonly} onkeyup={events.keyUp} onblur={events.blur} onchange={events.change} />
                <span class="input-filled-label">{labels[0]}</span>
            </div>
        {#if !iconLead}
            <span class="input-group-text">
                <Icon {icon} height={iconHeight(size)} />
            </span>
        {/if}
        </label>
        <span class="input-filled-focused"></span>
    </div>
    {:else}
    <div class="form-control w-full">
        <input {id} {name} {type} {min} {max} {minlength} {maxlength} {required} placeholder="{placeholder}" value={value} class="input peer {inputSize}"  class:input-floating={!filledFloatingLabel} class:input-filled={filledFloatingLabel}  class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled} {readonly} onkeyup={events.keyUp} onblur={events.blur} onchange={events.change} />
        <label class:input-floating-label={!filledFloatingLabel} class:input-filled-label={filledFloatingLabel} for={id}>{labels[0]}</label>
        {#if filledFloatingLabel}
        <span class="input-filled-focused"></span>
        {/if}
    </div>
    {/if}
{:else if group}
<label class="input-group w-full">
    {#if icon.length && iconLead}
    <span class="input-group-text" title={labels[0]}>
        <Icon {icon} height={iconHeight(size)} />
    </span>
    {/if}
    {#if !icon.length}
    <span class="input-group-text">{labels[0]}</span>
    {/if}
    <input {id} {name} {type} {min} {max} {minlength} {maxlength} {required} placeholder="{placeholder}" value={value} class="input grow {inputSize}" class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled} {readonly} onkeyup={events.keyUp} onblur={events.blur} onchange={events.change} />
    {#if icon.length && !iconLead}
    <span class="input-group-text" title={labels[0]}>
        <Icon {icon} height={iconHeight(size)} />
    </span>
    {/if}
</label>
{:else}
<label class="form-control w-full" for={id}>
    {#if labels[0] || labels[1]}
    <div class="label" class:sr-only={hiddenLabel}>
        {#if labels[0]}
        <span class="label-text">{labels[0]}</span>
        {/if}
        {#if labels[1]}
        <span class="label-text-alt">{labels[1]}</span>
        {/if}
    </div>
    {/if}
    <input {id} {name} {type} {min} {max} {minlength} {maxlength} {required} placeholder="{placeholder}" value={value} class="input {inputSize}" class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled} {readonly} onkeyup={events.keyUp} onblur={events.blur} onchange={events.change} />
    {#if labels[2] || labels[3]}
    <div class="label">
        {#if labels[3]}
        <span class="label-text-alt">{labels[3]}</span>
        {/if}
        {#if labels[2]}
        <span class="label-text-alt">{labels[2]}</span>
        {/if}
    </div>
    {/if}
</label>
{/if}