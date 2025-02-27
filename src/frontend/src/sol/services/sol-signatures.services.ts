import { WALLET_PAGINATION } from '$lib/constants/app.constants';
import type { SolAddress } from '$lib/types/address';
import { fetchSignatures } from '$sol/api/solana.api';
import { fetchSolTransactionsForSignature } from '$sol/services/sol-transactions.services';
import type { GetSolTransactionsParams } from '$sol/types/sol-api';
import type { SolSignature, SolTransactionUi } from '$sol/types/sol-transaction';
import type { SplTokenAddress } from '$sol/types/spl';
import { nonNullish } from '@dfinity/utils';
import { findAssociatedTokenPda } from '@solana-program/token';
import { assertIsAddress, address as solAddress } from '@solana/addresses';
import { signature } from '@solana/keys';

/**
 * Fetches transactions without an error for a given wallet address.
 */
export const getSolTransactions = async ({
	address,
	network,
	tokenAddress,
	tokenOwnerAddress,
	before,
	limit = Number(WALLET_PAGINATION)
}: GetSolTransactionsParams & {
	tokenAddress?: SplTokenAddress;
	tokenOwnerAddress?: SolAddress;
}): Promise<SolTransactionUi[]> => {
	if (nonNullish(tokenAddress)) {
		assertIsAddress(tokenAddress);
	}

	if (nonNullish(tokenOwnerAddress)) {
		assertIsAddress(tokenOwnerAddress);
	}

	const [relevantAddress] =
		nonNullish(tokenAddress) && nonNullish(tokenOwnerAddress)
			? await findAssociatedTokenPda({
					owner: solAddress(address),
					tokenProgram: solAddress(tokenOwnerAddress),
					mint: solAddress(tokenAddress)
				})
			: [address];

	const wallet = solAddress(relevantAddress);

	const beforeSignature = nonNullish(before) ? signature(before) : undefined;

	const signatures: SolSignature[] = await fetchSignatures({
		network,
		wallet,
		before: beforeSignature,
		limit
	});

	return await signatures.reduce(
		async (accPromise, signature) => {
			const acc = await accPromise;
			const parsedTransactions = await fetchSolTransactionsForSignature({
				signature,
				network,
				address,
				tokenAddress,
				tokenOwnerAddress
			});

			return [...acc, ...parsedTransactions];
		},
		Promise.resolve([] as SolTransactionUi[])
	);
};
