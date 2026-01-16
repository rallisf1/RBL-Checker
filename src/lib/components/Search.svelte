<script lang="ts">
    import Icon from '@iconify/svelte'
	import type { Size } from './types';

    type Search = {
        icon:string,
        height?:number,
        type:string,
        placeholder?:string,
        id?:string,
        text:string,
    }
    let {icon,height,type,placeholder,id,text}: Search = $props()
</script>
<div class="input no-focus border-0 px-0">
    <span class="text-base-content/80 my-auto me-2 shrink-0"><Icon {height} icon={icon}/></span>
    <input
        type={type}
        class="grow placeholder:text-sm"
        placeholder={placeholder}
        id={id}
    />
    <label class="sr-only" for={id}>{text}</label>
</div>