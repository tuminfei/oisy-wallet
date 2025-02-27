import { browser } from '$app/environment';

export type HideInfoKey =
	| 'oisy_ic_hide_bitcoin_info'
	| 'oisy_ic_hide_ethereum_info'
	| 'oisy_ic_hide_erc20_info'
	| 'oisy_ic_hide_bitcoin_activity'
	| 'oisy_ic_hide_transaction_no_canister'
	| 'oisy_ic_hide_transaction_unavailable_canister';

export const saveHideInfo = (key: HideInfoKey) => {
	try {
		sessionStorage.setItem(key, 'true');
	} catch (err: unknown) {
		// We use the session storage for the operational part of the app but, not crucial
		console.error(err);
	}
};

export const shouldHideInfo = (key: HideInfoKey): boolean => {
	try {
		const store: Storage = browser ? sessionStorage : ({ [key]: 'false' } as unknown as Storage);
		return store[key] === 'true';
	} catch (err: unknown) {
		// We use the session storage for the operational part of the app but, not crucial
		console.error(err);
		return false;
	}
};
