<script lang="ts">
	import Card from '$lib/components/Card.svelte';
    import Badge from '$lib/components/Badge.svelte';
    import Alert from '$lib/components/Alert.svelte';
	import Header from '$lib/components/Header.svelte';
    import Cardhelp from '$lib/components/Cardhelp.svelte';
	import Btn from '$lib/components/Btn.svelte';
</script>

<div class="max-w-5xl mx-auto px-4 py-10 space-y-10">

	<!-- Header -->
	<Header 
        title="Help & Tutorial" 
        Description="Αυτό το tutorial εξηγεί πώς χρησιμοποιείτε το app για να δημιουργήσετε domains, handlers και forms και πώς να ενσωματώσετε ένα form στο site σας." 
        fontSize="4xl">
	</Header>

    <Cardhelp title="Δημιουργία Domain" icon="tabler:number-1" desc="Πηγαίνετε στη σελίδα" desc2="και δημιουργήστε το domain στο οποίο θα χρησιμοποιηθεί το form." textColor="primary" color="primary">
        {#snippet badge()}
            <span class="badge badge-soft badge-primary rounded-full">/domains</span>
        {/snippet}
    </Cardhelp>
    <Btn btnColor="primary" Event={() => window.location.href = '/domains'} text="Πηγαίνετε στο domains" ghost={true} soft={true}>	
	</Btn>

    <Alert title="info" desc="Το domain χρησιμοποιείται για λόγους ασφάλειας και tracking." icon="mdi:information-outline" colorText="info">
    </Alert>
    

    <Cardhelp title="Δημιουργία Handler" icon="tabler:number-2" desc="Στη συνέχεια μεταβείτε στη σελίδα" desc2="και δημιουργήστε έναν handler." textColor="primary" color="primary">
        {#snippet badge()}
            <span class="badge badge-soft badge-primary rounded-full">/handlers</span>
        {/snippet}
    </Cardhelp>
    <Btn btnColor="primary" Event={() => window.location.href = '/handlers'} text="Πηγαίνετε στο handlers" soft={true}>	
	</Btn>

    <Alert title="info" desc="Ο handler είναι υπεύθυνος για την επεξεργασία των δεδομένων που αποστέλλονται από το form." icon="mdi:information-outline" colorText="info">
    </Alert>


    <Cardhelp title="Δημιουργία Form" icon="tabler:number-3" desc="Πηγαίνετε στη σελίδα" desc2="και δημιουργήστε ένα νέο form συνδέοντάς το με domain και handler." textColor="primary" color="primary">
        {#snippet badge()}
            <span class="badge badge-soft badge-primary rounded-full">/forms</span>
        {/snippet}
    </Cardhelp>
    <Btn btnColor="primary" Event={() => window.location.href = '/forms'} text="Πηγαίνετε στο forms" soft={true}>    
    </Btn>

    <Alert title="warning" desc="Αποθηκεύστε το Form ID – θα το χρειαστείτε στο επόμενο βήμα." icon="mdi:information-outline" colorText="warning">
    </Alert>


    <Cardhelp title="Ενσωμάτωση στο site σας" icon="tabler:number-4" desc="Χρησιμοποιήστε το Form ID στο HTML σας:" textColor="primary" color="primary">
        {#snippet badge()}
            <pre data-prefix="$"><code>&lt;form action="https://api.yourapp.com/forms/FORM_ID" method="POST"&gt;</code></pre> <pre data-prefix=">"><code>&lt;input type="email" name="email" required /&gt;</code></pre> <pre data-prefix=">"><code>&lt;button type="submit"&gt;Submit&lt;/button&gt;</code></pre> <pre data-prefix="$"><code>&lt;/form&gt;</code></pre>
        {/snippet}
    </Cardhelp>

</div>