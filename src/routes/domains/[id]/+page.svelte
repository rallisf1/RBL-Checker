<script lang="ts">
import type { RecordModel } from "pocketbase"
import { enhance, applyAction } from '$app/forms'
import Input from "$lib/components/Input.svelte"
import type { PageProps } from "./$types"
import { goto } from "$app/navigation"
import TextArea from "$lib/components/TextArea.svelte"
import Checkbox from "$lib/components/Checkbox.svelte"
import Btn from "$lib/components/Btn.svelte"
import { showToast } from "$lib/Toast"
import Icon from "@iconify/svelte"

let { data }: PageProps = $props()
const recordId = data.record.id

const getFullRecord = async (recordId: string|number):Promise<RecordModel> => {
    const getRes = await fetch(`/api/domains/${recordId}`)
    const record = await getRes.json()
    return record
}
async function digestDomainValidation(domainId: string, createdAt: string) {
    const encoder = new TextEncoder()
    const data = encoder.encode(`${domainId}_${createdAt}`)
    const hashBuffer = await window.crypto.subtle.digest("SHA-256", data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("")
    return hashHex
}

const verifyDomain = async (domainId: string|number) => {
    // TODO
}

const copy = (el: HTMLElement) => {
    const target = el.getAttribute('data-clipboard-target')
    if (!target) return;
    const copyText = document.getElementById(target) as HTMLInputElement
    if(copyText) {
        copyText.select()
        copyText.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(copyText.value)
        el.children[0].classList.toggle('hidden')
        el.children[1].classList.toggle('hidden')
        setTimeout(function() {
            el.children[0].classList.toggle('hidden')
            el.children[1].classList.toggle('hidden')
        }, 1000)
    }
}
</script>



<div class="flex justify-between items-center">
    <h1 class="text-base-content text-4xl m-4 ml-0 flex">
        <span class="mr-2">
            <Icon icon={data.activeMenu!.icon} height=36 />
        </span>
        {#if recordId}
        Edit domain
        {:else}
        New domain
        {/if}
    </h1>
   <!-- svelte-ignore a11y_consider_explicit_label -->
    <a href={data.activeMenu!.link} title="Back to list" class="btn btn-secondary btn-circle"><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg></a>

</div>

{#if recordId}
{#await getFullRecord(recordId)}
    <p>Loading data...</p>
{:then record}
    <form onsubmit={(e) => e.preventDefault() } class="grid gap-4">
        <div class="flex w-full">
            <div class="join items-center justify-between gap-2 w-full">
                <div class="join-item w-10/12"><Input labels={["Please enter domain",null,null,null]} floatingLabel name="domain" value={record.name} disabled /></div>
                <div class="join-item"><Checkbox text={"Verified"} name="verified" checked={record.verified.includes('ownership')} disabled /></div>
                <div class="join-item"><Btn Event={() => verifyDomain(record[0])} text="Verify" name="verify" btnColor="primary" btnSize="sm" /></div>
            </div>
        </div>
        <div class="flex w-full">
            {#await digestDomainValidation(record.id, record.created)}
                <pre>Loading...</pre>
            {:then hash}
                <div class="relative w-full">
                    <TextArea id="txt_record" name="txt_record" labels={["TXT Verification Record", null, null, null]} defaultValue={`email4.dev-verification=${hash}`} resizeable={false} readonly />
                    <button onclick={(e) => copy(e.currentTarget)} type="button" class="js-clipboard btn btn-square btn-text absolute right-4 top-8" aria-label="Copy text to clipboard" data-clipboard-target="txt_record" data-clipboard-action="copy">
                        <span class="js-clipboard-default icon-[tabler--clipboard] size-5 transition"></span>
                        <span class="js-clipboard-success icon-[tabler--clipboard-check] text-primary hidden size-5"></span>
                    </button>
                </div>
            {/await}
        </div>
    </form>
{:catch error}
    <p>Whoops! {error.message}</p>
{/await}
{:else}
<form method="POST" action="?/create" use:enhance={() => {
    return async ({ result, update }) => {
        if (result.type === 'success') {
            await update()
            goto('/domains')
        } else {
            await applyAction(result)
        }
    }
}}>
    <div class="flex gap-4">
        <Input labels={["Please enter domain",null,null,null]} name="domain" minlength={3} required />
    </div>
    <div class="modal-footer">
        <button class="btn btn-primary" type="submit" onclick={() => {  
            showToast({
                type: 'success',
                message: 'Record Created',
                duration: 100000,
                dismissible: true,
                positionX: 'right',
                positionY: 'top'
            })
        }}>Submit</button>
    </div>
</form>
{/if}