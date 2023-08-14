import { transactionsStore } from '$lib/stores/transactions.store';
import type { ECDSA_PUBLIC_KEY } from '$lib/types/address';
import { isNullish } from '@dfinity/utils';
import { InfuraWebSocketProvider } from 'ethers';

export type WebSocketListener = { destroy: () => Promise<void> };

const API_KEY = import.meta.env.VITE_INFURA_API_KEY;
const wsProvider = new InfuraWebSocketProvider('sepolia', API_KEY);

// Optimistic implementation with no-reconnection in case the connection is being closed
export const initTransactionsListener = (address: ECDSA_PUBLIC_KEY): WebSocketListener => {
	// Listen to all pending transactions
	wsProvider.on('pending', async (tx: string) => {
		// const transaction = await wsProvider.getTransaction(tx);
		//
		// if (isNullish(transaction)) {
		// 	return;
		// }
		//
		// const { from, to } = transaction;
		//
		// if (![from, to].includes(address)) {
		// 	return;
		// }
		//
		// transactionsStore.add([
		// 	{
		// 		...transaction,
		// 		pendingTimestamp: Date.now()
		// 	}
		// ]);
		//
		// await transaction.wait();
		//
		// const minedTransaction = await wsProvider.getTransaction(transaction.hash);
		//
		// if (isNullish(minedTransaction)) {
		// 	// TODO: handle issue
		// 	return;
		// }
		//
		// transactionsStore.update(minedTransaction);
	});

	// TODO: improve performance by listening to a single address
	// Not sure what abi to use. I read maybe ERC721Abi.
	// const contract = new Contract(address, abi, wsProvider);
	// contract.on('pending', (tx) => console.log('Tx', tx));

	wsProvider.websocket.onerror = (err: unknown) => console.error('Websocket error', err);

	return {
		destroy: async () => await wsProvider.destroy()
	};
};
