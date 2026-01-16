<script lang='ts'>
    import Icon from '@iconify/svelte'
	import type { Color } from './types';
    type Alert={
            colorText?:Color
            icon:string
            type?:string[]
            plan?:string
            title:string
            desc?:string
            emailinfo?:string
            dedicated_reseller_info?:string

    }
let{colorText,icon,type,plan,title,desc,emailinfo,dedicated_reseller_info}:Alert=$props()

let alert_color = `alert-${colorText}`
</script>

<div class="alert alert-soft {alert_color} flex items-center gap-2 text-sm">
    <span class="shrink-0"><Icon height={24} icon={icon}/></span>
    <div class="flex flex-col gap-1">
        <span>{title}</span>
        <span>{desc}</span>
        {#if type && plan}
            {#if plan === type[0]}
                <span>{emailinfo}</span>
            {/if}
            {#if plan !== type[1] && plan !== type[2]}
                <span>{dedicated_reseller_info}</span>
            {/if}
        {/if}
    </div>
</div>