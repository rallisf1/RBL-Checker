<script lang="ts">
import type { RecordModel } from "pocketbase"
import type { PageProps } from '../$types';
import { slide } from 'svelte/transition';
import { enhance, applyAction } from '$app/forms'
import Input from "$lib/components/Input.svelte"
import Checkbox from "$lib/components/Checkbox.svelte"
import Select from "$lib/components/Select.svelte"
import Switch from "$lib/components/Switch.svelte"
import { goto } from "$app/navigation"
import { showToast } from "$lib/Toast"
import Icon from "@iconify/svelte"

let { data }: PageProps = $props()
const recordId = data.record.id
const getFullRecord = async (recordId: string|number):Promise<RecordModel> => {
    const getRes = await fetch(`/api/handlers/${recordId}`)
    const record = await getRes.json()
    return record
}
let fromemail = $state(false)

function ActivateInput(){
    fromemail = !fromemail
}
</script>
<svelte:head>
    <link rel="stylesheet" href="/notyf.min.css">
    <script src="/notyf.min.js"></script>
</svelte:head>
<div class="max-w-5xl mx-auto p-6">
    <div class="flex justify-between items-center mb-8 pb-4 border-b border-base-200">
        <h1 class="text-base-content text-3xl font-bold flex items-center gap-3">
            <span class="p-3 bg-primary/10 rounded-xl text-primary">
                <Icon icon={data.activeMenu!.icon} height=32 />
            </span>
            {#if recordId}
                <span>Edit Handler</span>
            {:else}
                <span>New Handler</span>
            {/if}
        </h1>
        <a href={data.activeMenu!.link} title="Back to list" class="btn btn-ghost btn-circle hover:bg-base-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11l-4 4l4 4m-4 -4h11a4 4 0 0 0 0 -8h-1" /></svg>
        </a>
    </div>

    {#if recordId}
        {#await getFullRecord(recordId)}
            <div class="flex flex-col items-center justify-center py-20 opacity-50">
                <span class="loading loading-spinner loading-lg text-primary"></span>
                <p class="mt-4 text-sm font-semibold">Fetching full record data...</p>
            </div>
        {:then record}
            <div class="card bg-base-100 shadow-xl border border-base-200">
                <div class="card-body p-8">
                    <form method="POST" action="?/edit" use:enhance={() => {
                        return async ({ result, update }) => {
                            if (result.type === 'success') {
                                await update()
                                goto('handler')
                            } else {
                                await applyAction(result)
                            }
                        }
                    }}>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                            
                            <div class="col-span-1 md:col-span-2 pb-2 border-b border-base-200 mb-2">
                                <h3 class="text-sm font-bold text-base-content/60 uppercase tracking-widest">General Configuration</h3>
                            </div>

                            <div class="md:col-span-1">
                                <Input labels={["Handler Name",null,null,null]} name="handlername" value={record.name} minlength={3} required />
                            </div>
                            <div class="md:col-span-1">
                                <Select name="Domain" labels={["Select Domains",null,null,null]} value={record.domains.join(',')} required Options={data.domains.map(d => { return { label: d.name, value: d.id } })} multiple />
                            </div>
                            <div class="md:col-span-1">
                                <Input type="email" labels={["Mail Forwarding To",null,null,null]} name="EmailTo" required value={record.to}/>
                            </div>
                            <div class="md:col-span-1">
                                <Input labels={["Honeypot Field Name",null,null,null]} name="honeypot" value={record.honeypot} />
                            </div>

                            <div class="col-span-1 md:col-span-2 pb-2 border-b border-base-200 mb-2 mt-4">
                                <h3 class="text-sm font-bold text-base-content/60 uppercase tracking-widest">Email Settings</h3>
                            </div>

                            <div>
                                <Input labels={["Default 'From' Name",null,null,null]} name="from_name" value={record.from_name} />
                            </div>
                            <div>
                                <Input type="email" labels={["Reply-To Address",null,null,null]} name="ReplyTo" value={record.reply_to}/>
                            </div>

                            <div class="col-span-1 md:col-span-2 bg-base-200/40 rounded-xl p-4 border border-base-200">
                                <div class="flex flex-col gap-4">
                                    <div class="font-medium">
                                        <Checkbox name="ActivateInput" label="Use Custom Email Sender" events={{change: () => ActivateInput()}} checked={record.from_email} /> 
                                    </div>
                                    {#if fromemail}
                                        <div class="pl-8 border-l-2 border-primary">
                                            <Input type="email" labels={["Enter custom from email",null,null,null]} name="EmailFrom" value={record.from_email} /> 
                                        </div>
                                    {/if}
                                </div>
                            </div>

                            <div class="col-span-1 md:col-span-2 pb-2 border-b border-base-200 mb-2 mt-4">
                                <h3 class="text-sm font-bold text-base-content/60 uppercase tracking-widest">Routing & Security</h3>
                            </div>

                            <div>
                                <Input labels={["Redirect Success URL",null,null,null]} name="RedirectSuccess" value={record.redirect_success} />
                            </div>
                            <div>
                                <Input labels={["Redirect Fail URL",null,null,null]} name="RedirectFail" value={record.redirect_fail} />
                            </div>
                            <div class="col-span-1 md:col-span-2 flex items-center gap-2 bg-base-200/40 p-4 rounded-xl border border-base-200">
                                <Switch labels={["Protect with Altcha",null]} name="altcha" checked={record.altcha} value="on" type="checkbox"></Switch>
                            </div>

                        </div>

                        <div class="card-actions justify-end mt-8 pt-4 border-t border-base-200">
                            <button class="btn btn-primary px-8" type="submit" onclick={() => {  
                                showToast({
                                    type: 'success',
                                    message: 'Record Saved',
                                    duration: 100000,
                                    dismissible: true,
                                    positionX: 'right',
                                    positionY: 'top'
                                }); 
                            }}>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        {:catch error}
            <div role="alert" class="alert alert-error shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>Whoops! {error.message}</span>
            </div>
        {/await}

    {:else}
        <div class="card bg-base-100 shadow-xl border border-base-200">
            <div class="card-body p-8">
                <form method="POST" action="?/create" use:enhance={() => {
                    return async ({ result, update }) => {
                        if (result.type === 'success') {
                            await update()
                            goto('handler')
                        } else {
                            await applyAction(result)
                        }
                    }
                }}>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                        
                        <div class="col-span-1 md:col-span-2 pb-2 border-b border-base-200 mb-2">
                            <h3 class="text-sm font-bold text-base-content/60 uppercase tracking-widest">General Configuration</h3>
                        </div>

                        <div class="md:col-span-1">
                            <Input labels={["Handler Name",null,null,null]} name="handlername" minlength={3} required />
                        </div>
                        <div class="md:col-span-1">
                            <Select name="Domain" labels={["Select Domains",null,null,null]} required Options={data.domains.map(d => { return { label: d.name, value: d.id } })} multiple />
                        </div>
                        <div class="md:col-span-1">
                            <Input type="email" labels={["Mail Forwarding To",null,null,null]} required name="EmailTo" />
                        </div>
                        <div class="md:col-span-1">
                            <Input labels={["Honeypot Field Name",null,null,null]} name="honeypot" />
                        </div>

                        <div class="col-span-1 md:col-span-2 pb-2 border-b border-base-200 mb-2 mt-4">
                            <h3 class="text-sm font-bold text-base-content/60 uppercase tracking-widest">Email Settings</h3>
                        </div>

                        <div>
                            <Input labels={["Default 'From' Name",null,null,null]} name="from_name" />
                        </div>
                        <div>
                            <Input type="email" labels={["Reply-To Address",null,null,null]} name="ReplyTo" />
                        </div>

                        <div class="col-span-1 md:col-span-2 bg-base-200/40 rounded-xl p-4 border border-base-200">
                             <div class="flex flex-col gap-4">
                                <div class="font-medium">
                                    <Checkbox name="ActivateInput" label="Use Custom Email Sender" events={{change: () => ActivateInput()}} /> 
                                </div>
                                {#if fromemail}
                                    <div class="pl-8 border-l-2 border-primary">
                                        <Input type="email" labels={["Enter custom from email",null,null,null]} name="EmailFrom" /> 
                                    </div>
                                {/if}
                            </div>
                        </div>

                        <div class="col-span-1 md:col-span-2 pb-2 border-b border-base-200 mb-2 mt-4">
                            <h3 class="text-sm font-bold text-base-content/60 uppercase tracking-widest">Routing & Security</h3>
                        </div>

                        <div>
                            <Input labels={["Redirect Success URL",null,null,null]} name="RedirectSuccess" />
                        </div>
                        <div>
                            <Input labels={["Redirect Fail URL",null,null,null]} name="RedirectFail" />
                        </div>
                        <div class="col-span-1 md:col-span-2 flex items-center gap-2 bg-base-200/40 p-4 rounded-xl border border-base-200">
                            <Switch labels={["Protect with Altcha",null]} name="altcha" value="on"></Switch>
                        </div>

                    </div>

                    <div class="card-actions justify-end mt-8 pt-4 border-t border-base-200">
                        <button class="btn btn-primary px-8" type="submit" onclick={() => {  
                            showToast({
                                type: 'success',
                                message: 'Record Created',
                                duration: 100000,
                                dismissible: true,
                                positionX: 'right',
                                positionY: 'top'
                            }); 
                        }}>Create Handler</button>
                    </div>
                </form>
            </div>
        </div>
    {/if}
</div>