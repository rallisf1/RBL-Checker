<script lang="ts">
    import {type Color} from './types';
    import {type Size} from './types';
    import {type FormElementAttributes, type FixedArray} from '$lib/components/types'

    type Switch = {
        name:string,
        text?:string
        type?:string,
        id?:string,
        checked?:boolean,
        switchcolor?:Color
        switchSize?:Size,
        switchOuline?:boolean,
        valid?:boolean | null,
        labels:FixedArray<string | null, 2>,
        value?:string
    }


    let {type="checkbox",id,text,checked=false,switchcolor,switchSize,switchOuline,valid,labels,name,value}:Switch=$props()

    let switch_color = $derived(`text-${switchcolor}`)
    let switch_size = $derived(`btn-${switchSize}`)
    let switch_style = $state(``)
    switchOuline ? switch_style = `switch-outline`:``
</script>

<div class="flex items-center gap-1">
    
    <label class="label-text text-base" for={id}> {text} </label>
    <input type={type} name={name} class="switch  {switch_style} {switch_color} {switch_size}"class:is-invalid={valid === false} class:is-valid={valid === true} id={id} checked={checked} value={value}/>
    {#if labels[0] || labels[1]}
    <span class="label cursor-pointer flex-col items-start">
        {#if labels[0]}
            <span class="label-text text-{switch_size}">{labels[0]}</span>
        {/if}
        {#if labels[1]}
            <span class="text-sm">{labels[1]}</span>
        {/if}
    </span>
    {/if}
</div>