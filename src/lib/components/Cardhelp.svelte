<script lang="ts">
    import Icon from '@iconify/svelte'
    import { type Color } from './types';
import type { Snippet } from 'svelte';

    type Cardhelp = { 
        desc?:string,
        title:string,
        icon:string,
        color?:Color,
        textColor?:Color
        badge?:Snippet
        desc2?:string
    }

    let {desc,title,icon,color,textColor,badge,desc2}:Cardhelp = $props()

    let bg_icon_color = `bg-${color}/10`
    let text_color = `text-${textColor}`
</script>

    <div class="card-title text-primary-content mb-2.5 flex items-center gap-4">
        <div class="{bg_icon_color} {text_color} rounded-full p-6 flex shrink-0">
            <span><Icon height={35} icon={icon}/></span>
        </div>
    <div class="card-header">
        <h5 class="card-title text-primary mb-2.5">{title}</h5>
    </div>
    </div>
    <div class="card-body text-neutral">
        <p>{desc}
        {#if badge}
            {@render badge()}
        {/if}
        {desc2}
        </p>
    </div>

