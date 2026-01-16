<script lang='ts'>
    import {type Color,type Size} from './types';
        type Badge={
            text:string,
            text_align?: 'center' | 'end'
            textColor?:Color
        }
    let{text,text_align,textColor}:Badge=$props()

let alignment = $derived(`text-${text_align}`);
let text_color = `badge-${textColor}`
</script>

<span class="badge badge-soft {text_color}">{text}</span>
