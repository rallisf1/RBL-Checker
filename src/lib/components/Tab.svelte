<script lang='ts'>
import Icon from '@iconify/svelte'

type Tab = {
	icon:string,
	title:string,
	active:boolean,
	Event: () => void
}

let{icon,title,active,Event}:Tab=$props()

</script>


<button
	role="tab"
	class="tab h-12 gap-2"
	class:tab-active={active}
	onclick={Event} 
>
	<span class=""><Icon height={20} icon={icon}/></span>
	{title}
</button>
