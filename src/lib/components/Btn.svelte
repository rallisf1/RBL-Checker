<script lang="ts">
    import {type Color,type Size} from './types';
    import Icon from '@iconify/svelte'

    type Btn = {
        btnColor?:Color,
        text?:string,
        ghost?:boolean,
        Event?: () => void,
        btnSize?:Size,
        icon?:string,
        btnDisabled?:boolean,
        block?:boolean,
        name?:string,
        textColor?:Color
        soft?:boolean
        height?:number
    }

    let {btnColor,text,ghost = false, Event,btnSize,icon,btnDisabled=false,block=false,name,textColor,soft,height}:Btn = $props()

    let btn_color = `btn-${btnColor}`
    let ghost_style = $state(``)
    let button_size = `btn-${btnSize}`
    ghost? ghost_style = `btn-ghost` : ``
    let text_color = `btn-${textColor}`
    let soft_style = $state(``)
    soft? soft_style = `btn-soft`: ``
    


</script>

<button class="btn {button_size} {btn_color} {text_color} {ghost_style} {soft_style}" class:btn-block={block} onclick={Event} disabled={btnDisabled} name={name}>
    {#if text}
        {text}
    {:else if icon}
        <span><Icon height={height} icon={icon}/></span>
    {:else}
        <span></span>
    {/if}
</button>

