<script lang="ts">
	
    import {type Color,type Size} from './types';
    import Icon from '@iconify/svelte'

    type Avatar={
        name:string,
        textSize:Size,
        textColor:Color,
        avatarSize:number,
        avatarColor:Color
    }

    let{name,textSize,avatarSize,avatarColor,textColor}:Avatar=$props()
    let text_size=`text-${textSize}`
    let avatar_size=`w-${avatarSize}`
    let avatar_color=`border-${avatarColor}`
    let text_color=`text-${textColor}`

</script>

<div class="avatar avatar-placeholder">
<div class="{avatar_color} {text_color} {avatar_size} rounded-full border">
<span class="{text_size} uppercase">{name}</span>
</div>
</div>