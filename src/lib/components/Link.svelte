<script lang="ts">
    import {type Color} from './types';
    import Icon from '@iconify/svelte'

    type Link = {
        link:string,
        btnColor?:Color,
        icon:string,
        text:string,
        soft?:boolean,
        ghost?:boolean,
        height?:number
    }

    let {link,btnColor,icon,text,soft,ghost,height}:Link = $props()
    let soft_style = $state(``)
    let btn_color = `btn-${btnColor}`
    soft ? soft_style = `btn-soft` : ``
    let ghost_style = $state(``)
    ghost ? ghost_style = `btn-ghost`:``

</script>

<a href="{link}" class="btn {btn_color} {soft_style} {ghost_style}">
    <span><Icon height={height} icon={icon}/></span>
    {text}
</a>