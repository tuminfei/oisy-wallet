<script lang="ts">
	import IconOisyEmptyState from '$lib/components/icons/IconOisyEmptyState.svelte';
	import { i18n } from '$lib/stores/i18n.store';
</script>

<div
	class="rounded-4xl border-2 border-dashed border-brand-subtle-20 bg-brand-subtle-5 py-12"
	data-tid="no-transactions-placeholder"
>
	<div class="mb-5 flex justify-center p-2">
		<IconOisyEmptyState />
	</div>

	<div class="space-y-4">
		<p class="m-0 text-center text-lg font-bold">{$i18n.transactions.text.transaction_history}</p>
		<p class="m-0 text-center text-tertiary">
			{$i18n.transactions.text.buy_or_receive}
		</p>
	</div>
</div>
