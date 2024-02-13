import {
	onLoadBtcStatusesError,
	syncBtcPendingUtxos,
	syncBtcStatuses
} from '$icp/services/ckbtc-listener.services';
import type { CkBTCWorker, CkBTCWorkerInitResult } from '$icp/types/ckbtc-listener';
import type { IcCkCanisters, IcToken } from '$icp/types/ic';
import { waitAndTriggerWallet } from '$icp/utils/ic-wallet.utils';
import type {
	PostMessage,
	PostMessageDataResponseError,
	PostMessageJsonDataResponseCkBTC,
	PostMessageSyncState
} from '$lib/types/post-message';
import { emit } from '$lib/utils/events.utils';

export const initCkBTCWalletWorker: CkBTCWorker = async ({
	minterCanisterId,
	id: tokenId
}: IcToken & Partial<IcCkCanisters>): Promise<CkBTCWorkerInitResult> => {
	const CkBTCWalletWorker = await import('$icp/workers/ckbtc-wallet.worker?worker');
	const worker: Worker = new CkBTCWalletWorker.default();

	worker.onmessage = async ({
		data
	}: MessageEvent<
		PostMessage<
			PostMessageJsonDataResponseCkBTC | PostMessageSyncState | PostMessageDataResponseError
		>
	>) => {
		const { msg } = data;

		switch (msg) {
			case 'syncBtcStatuses':
				syncBtcStatuses({
					tokenId,
					data: data.data as PostMessageJsonDataResponseCkBTC
				});
				return;
			case 'syncBtcPendingUtxos':
				syncBtcPendingUtxos({
					tokenId,
					data: data.data as PostMessageJsonDataResponseCkBTC
				});
				return;
			case 'syncCkBtcUpdateBalanceStatus':
				emit({
					message: 'oisyCkBtcUpdateBalance',
					detail: (data.data as PostMessageSyncState).state
				});
				return;
			case 'syncCkBtcUpdateOk':
				await waitAndTriggerWallet();
				return;
			case 'syncBtcStatusesError':
				onLoadBtcStatusesError({
					tokenId,
					error: (data.data as PostMessageDataResponseError).error
				});
				return;
		}
	};

	return {
		start: () => {
			worker.postMessage({
				msg: 'startCkBTCWalletTimer',
				data: {
					minterCanisterId
				}
			});
		},
		stop: () => {
			worker.postMessage({
				msg: 'stopCkBTCWalletTimer'
			});
		},
		trigger: () => {
			worker.postMessage({
				msg: 'triggerCkBTCWalletTimer',
				data: {
					minterCanisterId
				}
			});
		}
	};
};