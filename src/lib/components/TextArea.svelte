<script lang="ts">
import {type FormElementAttributes, type FixedArray} from '$lib/components/types'

interface TextArea extends FormElementAttributes{
    labels: FixedArray<string | null, 4>
    hiddenLabel?: boolean,
    floatingLabel?: boolean,
    filledFloatingLabel?: boolean,
    resizeable?: boolean,
    PlaceHolder?:string,
    defaultValue?:string
}

let {labels=[null,null,null,null],name,id=null,readonly=false,isValid=null,disabled=false,floatingLabel=false,hiddenLabel=false,resizeable=true,filledFloatingLabel=false,PlaceHolder="",defaultValue=""}:TextArea = $props()
</script>

<style>
.no-resize {
    resize: none;
}
</style>


{#if floatingLabel}
<label class="form-control w-full">
    <div class="label justify-end" class:sr-only={hiddenLabel}>
        {#if labels[0]}
        <span class="label-text-alt">{labels[0]}</span>
        {/if}
    </div>
    <div class="relative">
        <textarea class="textarea textarea-floating is-valid peer" class:no-resize={!resizeable} placeholder="{PlaceHolder}" class:is-valid={isValid === true} class:is-invalid={isValid === false} {name} {disabled} {readonly} {id} >{defaultValue}</textarea>
        {#if labels[1]}
        <span class="textarea-floating-label">{labels[1]}</span>
        {/if}
    </div>
    <div class="label">
        {#if labels[2]}
        <span class="label-text-alt">{labels[2]}</span>
        {/if}
        {#if labels[3]}
        <span class="label-text-alt">{labels[3]}</span>
        {/if}
    </div>
</label>
{:else if filledFloatingLabel}
<label class="form-control w-full">
    <div class="label justify-end" class:sr-only={hiddenLabel}>
        {#if labels[0]}
        <span class="label-text-alt">{labels[0]}</span>
        {/if}
    </div>
    <div class="relative">
        <textarea class="textarea textarea-filled is-valid peer" class:no-resize={!resizeable} placeholder="{PlaceHolder}" class:is-valid={isValid === true} class:is-invalid={isValid === false} {name} {disabled} {readonly} {id}>{defaultValue}</textarea>
        {#if labels[1]}
        <span class="textarea-filled-label">{labels[1]}</span>
        {/if}
        <span class="textarea-filled-focused"></span>
    </div>
    <div class="label">
        {#if labels[2]}
        <span class="label-text-alt">{labels[2]}</span>
        {/if}
        {#if labels[3]}
        <span class="label-text-alt">{labels[3]}</span>
        {/if}
    </div>
</label>

{:else}

<label class="form-control w-full">
    <div class="label" class:sr-only={hiddenLabel}>
        {#if labels[0]}
        <span class="label-text">{labels[0]}</span>
        {/if}
        {#if labels[1]}
        <span class="label-text-alt">{labels[1]}</span>
        {/if}
    </div>
    <textarea class="textarea is-valid " placeholder="{PlaceHolder}" class:no-resize={!resizeable} class:is-valid={isValid === true} class:is-invalid={isValid === false} {name} {disabled} {readonly} {id} >{defaultValue}</textarea>
    <div class="label">
        {#if labels[2]}
        <span class="label-text-alt">{labels[2]}</span>
        {/if}
        {#if labels[3]}
        <span class="label-text-alt">{labels[3]}</span>
        {/if}
    </div>
</label>
{/if}