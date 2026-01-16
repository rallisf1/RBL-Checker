<script lang="ts">
    import Icon from '@iconify/svelte'
    import { type Color } from './types';

    type Card = { 
        value?:string,
        title:string,
        icon:string,
        color?:Color,
        textColor?:Color
    }

    let {value,title,icon,color,textColor}:Card = $props()

    let bg_icon_color = `bg-${color}/10`
    let text_color = `text-${textColor}`
</script>




<div class="card bg-base-100 shadow-sm">
    <div class="card bg-primary/20 border-primary text-primary border shadow-none p-7">
        <div class="card-title text-primary-content mb-2.5 flex items-center gap-4">
            <div class="avatar placeholder">
                <div class="{bg_icon_color} {text_color} rounded-full p-3 ">
                    <span><Icon height={35} icon={icon}/></span>
                </div>
            </div>
            <div>
                <p class="text-base-content/80 text-sm font-medium ">{title}</p>
                <h4 class="text-base-content text-2xl font-bold">{value}</h4>
            </div>
        </div>
    </div>
</div>