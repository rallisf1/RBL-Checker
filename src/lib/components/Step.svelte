<script lang="ts">
    import {type Color,type Size} from './types';
    import Icon from '@iconify/svelte'

    type Step = {
        text?:string,
        stepSize?:Size,
        page?:number
    }

    let {text,stepSize,page}:Step = $props()
    let step_size = `btn-${stepSize}`

</script>

<ul class="relative flex h-96 flex-col gap-y-2">
    <li class="group flex flex-1 shrink basis-0 flex-col w-fit">
        <div class="flex items-center justify-center gap-2.5 {step_size}">
        <span class="text-bg-soft-neutral size-7.5 flex shrink-0 items-center justify-center rounded-full text-sm font-medium" >
            {page}
        </span>
        <div class="text-base-content block">{text}</div>
        </div>
        <div class="bg-neutral/20 ms-3.5 mt-2 h-full w-px justify-self-start group-last:hidden"></div>
    </li>
</ul>