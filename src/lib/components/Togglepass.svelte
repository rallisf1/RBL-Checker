<script lang="ts">
type Togglepass = {
    label?:string,
    placeholder?:string
    value?:string
}
let {label,placeholder,value}:Togglepass=$props()
const options = { "target": "#toggle-password-label" }
</script>

<div class="max-w-sm">
    <label class="label-text" for="toggle-password-label">{label}</label>
    <div class="input">
        <input id="toggle-password-label" type="password" placeholder="{placeholder}" value="{value}"/>
            <button type="button" data-toggle-password={JSON.stringify(options)} class="block cursor-pointer" aria-label="password toggle" >
                <span class="icon-[tabler--eye] text-base-content/80 password-active:block hidden size-5 shrink-0"></span>
                <span class="icon-[tabler--eye-off] text-base-content/80 password-active:hidden block size-5 shrink-0"></span>
            </button>
    </div>
</div>
