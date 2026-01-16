<script lang="ts">
import { type FormElementAttributes,type FixedArray,type Size} from "$lib/components/types"
import { onMount } from "svelte"

interface Select extends FormElementAttributes {
    labels: FixedArray<string | null, 4>,
    placeholder?: string,
    floating?:boolean,
    filled?:boolean,
    pilled?:boolean,
    Options:string[]|[string, string][]|{ label: any; value: string; }[],
    multiple?:boolean,
    required?:boolean,
    value?:string,
    size?:Size,
    searchable?:boolean
}

let {labels,size="md",filled,floating,pilled,Options,isValid=null,disabled=false,name,id,multiple=false,required=false,searchable=false,placeholder="Select your option(s)",value = $bindable()}:Select = $props()



const selectStyle =  `{
    "hasSearch": ${searchable ? "true" : "false"},
    "minSearchLength": 2,
    "placeholder": "${placeholder}",
    "toggleTag": "<button type='button' aria-expanded='false'></button>",
    "toggleClasses": "advance-select-toggle advance-select-${size} select-disabled:pointer-events-none select-disabled:opacity-40",
    "dropdownClasses": "advance-select-menu max-h-52 pt-0 overflow-y-auto",
    "optionClasses": "advance-select-option selected:select-active",
    "optionTemplate": "<div class='flex justify-between items-center w-full'><span data-title></span><span class='icon-[tabler--check] shrink-0 size-4 text-primary hidden selected:block'></span></div>",
    "extraMarkup": "<span class='icon-[tabler--caret-up-down] shrink-0 size-4 text-base-content absolute top-1/2 end-3 -translate-y-1/2'></span>"
}`

const values = value?.split(',').map(v => v.trim())
</script>

{#if floating}
<div class="w-full max-w-sm">
    {#if labels[1]}
        <div class="label justify-end">
            <span class="label-text-alt">{labels[1]}</span>
        </div>
    {/if}
    <div class="relative">
    <select {name} {multiple} {required} data-select={selectStyle} class="hidden overflow select-floating max-w-sm" class:rounded-full={pilled} class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled}  aria-label="Floating select" id="{id}">
    {#each Options as Option}
        {#if typeof Option === 'string'}
        {@const selected = multiple ? values?.includes(Option) : Option === value}
        <option {selected}>{Option}</option>
        {:else if Array.isArray(Option)}
        {@const selected = multiple ? values?.some(x => Option.includes(x[0])) : Option[0] === value}
        <option value={Option[0]} {selected}>{Option[1]}</option>
        {:else}
        {@const selected = multiple ? values?.includes(Option.value) : Option.value === value}
        <option value={Option.value} {selected}>{Option.label}</option>
        {/if}
    {/each}
    </select>
    
    {#if labels[0]}
        <label class="select-floating-label" for="{id}">{labels[0]}</label>
    {/if}
    </div>
    {#if labels[2] || labels[3]}
        <div class="label">
            {#if labels[2]}
                <span class="label-text-alt">{labels[2]}</span>
            {/if}
            {#if labels[3]}
                <span class="label-text-alt">{labels[3]}</span>
            {/if}
        </div>
    {/if}
</div>
{:else if filled}
<div class="w-full max-w-sm">
    {#if labels[1]}
        <div class="label justify-end">
            <span class="label-text-alt">{labels[1]}</span>
        </div>
    {/if}
    <div class="relative">
        <select {name} {multiple} {required} data-select={selectStyle} class="hidden overflow select-filled max-w-sm"class:rounded-full={pilled} class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled}  aria-label="Floating select" id="{id}">
        {#each Options as Option}
            {#if typeof Option === 'string'}
            {@const selected = multiple ? values?.includes(Option) : Option === value}
            <option {selected}>{Option}</option>
            {:else if Array.isArray(Option)}
            {@const selected = multiple ? values?.some(x => Option.includes(x[0])) : Option[0] === value}
            <option value={Option[0]} {selected}>{Option[1]}</option>
            {:else}
            {@const selected = multiple ? values?.includes(Option.value) : Option.value === value}
            <option value={Option.value} {selected}>{Option.label}</option>
            {/if}
        {/each}
        </select>
        <span class="select-filled-focused"></span>
        {#if labels[0]}
            <label class="select-filled-label" for="{id}">{labels[0]}</label>
        {/if}
    </div>
    {#if labels[2] || labels[3]}
        <div class="label">
            {#if labels[2]}
                <span class="label-text-alt">{labels[2]}</span>
            {/if}
            {#if labels[3]}
                <span class="label-text-alt">{labels[3]}</span>
            {/if}
        </div>
    {/if}
</div>
{:else}
<div class="relative w-full max-w-sm">
    {#if labels[0]}
        <label class="label label-text" for="{id}">{labels[0]}</label>
    {/if}
        <select {name} {multiple} {required} data-select={selectStyle} class="hidden overflow max-w-sm"class:rounded-full={pilled} class:is-valid={isValid === true} class:is-invalid={isValid === false} {disabled}  aria-label=" select" id="{id}">
        {#each Options as Option}
            {#if typeof Option === 'string'}
            {@const selected = multiple ? values?.includes(Option) : Option === value}
            <option {selected}>{Option}</option>
            {:else if Array.isArray(Option)}
            {@const selected = multiple ? values?.some(x => Option.includes(x[0])) : Option[0] === value}
            <option value={Option[0]} {selected}>{Option[1]}</option>
            {:else}
            {@const selected = multiple ? values?.includes(Option.value) : Option.value === value}
            <option value={Option.value} {selected}>{Option.label}</option>
            {/if}
        {/each}
        </select>
    {#if labels[2] || labels[3]}
        <div class="label">
            {#if labels[2]}
                <span class="label-text-alt">{labels[2]}</span>
            {/if}
            {#if labels[3]}
                <span class="label-text-alt">{labels[3]}</span>
            {/if}
        </div>
    {/if}
</div>
{/if}