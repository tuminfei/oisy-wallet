<script lang="ts">
	import type { Identity } from '@dfinity/agent';
	import { assertNonNullish } from '@dfinity/utils';
	import { onMount } from 'svelte';
	import { loadErc20UserTokens } from '$eth/services/erc20.services';
	import type { OptionErc20UserToken } from '$eth/types/erc20-user-token';
	import { setUserToken } from '$icp-eth/services/user-token.services';
	import HideTokenModal from '$lib/components/tokens/HideTokenModal.svelte';
	import { i18n } from '$lib/stores/i18n.store';
	import { toastsError } from '$lib/stores/toasts.store';
	import { token } from '$lib/stores/token.store';
	import { isNullishOrEmpty } from '$lib/utils/input.utils';

	let selectedToken: OptionErc20UserToken;

	// We must clone the reference to avoid the UI to rerender once we remove the token from the store.
	onMount(() => (selectedToken = $token as OptionErc20UserToken));

	const assertHide = (): { valid: boolean } => {
		const contractAddress = selectedToken?.address;

		if (isNullishOrEmpty(contractAddress)) {
			toastsError({
				msg: { text: $i18n.tokens.error.invalid_contract_address }
			});
			return { valid: false };
		}

		return { valid: true };
	};

	const hideToken = async (params: { identity: Identity }) => {
		assertNonNullish(selectedToken);

		await setUserToken({ ...params, token: selectedToken, enabled: false });
	};

	// TODO(GIX-2740): no call to Infura - remove only the selected token from stores
	const updateUi = (params: { identity: Identity }): Promise<void> => loadErc20UserTokens(params);
</script>

<HideTokenModal {assertHide} {hideToken} {updateUi} />
