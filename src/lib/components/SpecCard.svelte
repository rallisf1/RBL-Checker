<script lang="ts">
	import type { Script } from 'vm';
    import {type Color,type Size} from './types';
    import Icon from '@iconify/svelte'

    type SpecCard = { 
        specColor?:Color,
        icon:string,
        height?:number,
        specSize?:Size,
        title:string,
        description:string,
        specSize2?:Size
    }

    let {specColor,specSize,icon,height,title,description,specSize2}:SpecCard = $props()


    let spec_color = `text-${specColor}`
    let spec_size = `text-${specSize}`
    let spec_size_2 = `text-${specSize2}`

</script>

<div class="card bg-base-100 shadow-sm">
    <div class="card-body flex-row items-center gap-4 p-4">
        <div class="bg-primary/10 {specColor} rounded-lg p-2">
            <span class={spec_color}><Icon {height} icon={icon}/></span>
        </div>
        <div>
            <h4 class="font-bold {specSize}">{title}</h4>
            <p class="{specSize2} text-base-content/70">{description}</p>
        </div>
    </div>
</div>