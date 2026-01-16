<script lang="ts">
    type Radio = {
        text?:string
        type?:string,
        id?:string,
        name?:string,
        cont?:string,
        checked?:boolean
    }

    let {type,id,text,name,cont,checked=false}:Radio=$props()
</script>

<div class="flex items-center gap-1">
    <input type={type} name={name} class={type} id={id}  checked={checked}/>
    <label class="label-text text-base" for={cont}> {text} </label>
</div>
