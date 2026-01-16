<script lang='ts'>
	import Icon from '@iconify/svelte'

type Toggle = {
        icon_sun:string,
        icon_moon:string,
        active:boolean,
        Event: () => void

    }
let{icon_sun,icon_moon,active,Event}:Toggle=$props()
</script>

<label class="swap swap-rotate">
    <input
        type="checkbox"
        value="black"
        class="theme-controller"
        data-toggle-theme="black,corporate"
        checked={active}
        onclick={Event}
    />
    <span class="swap-off "><Icon height={28} icon={icon_sun}/></span>
    <span class="swap-on "><Icon height={28} icon={icon_moon}/></span>
</label>