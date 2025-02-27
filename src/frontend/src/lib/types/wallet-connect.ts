import type { WalletConnectEthApproveRequestMessage } from '$eth/types/wallet-connect';
import type { WebSocketListener } from '$lib/types/listener';
import type { Option } from '$lib/types/utils';
import type { WalletConnectSolApproveRequestMessage } from '$sol/types/wallet-connect';
import type { ErrorResponse } from '@walletconnect/jsonrpc-utils';
import type { PairingTypes } from '@walletconnect/types';
import type { Web3WalletTypes } from '@walletconnect/web3wallet';

export type WalletConnectApproveRequestMessage =
	| WalletConnectEthApproveRequestMessage
	| WalletConnectSolApproveRequestMessage;

export interface WalletConnectListener extends WebSocketListener {
	pair: () => Promise<PairingTypes.Struct>;
	approveSession: (proposal: Web3WalletTypes.SessionProposal) => Promise<void>;
	rejectSession: (proposal: Web3WalletTypes.SessionProposal) => Promise<void>;
	sessionProposal: (callback: (proposal: Web3WalletTypes.SessionProposal) => void) => void;
	sessionDelete: (callback: () => void) => void;
	sessionRequest: (callback: (request: Web3WalletTypes.SessionRequest) => Promise<void>) => void;
	rejectRequest: (params: { id: number; topic: string; error: ErrorResponse }) => Promise<void>;
	approveRequest: (params: {
		id: number;
		topic: string;
		message: WalletConnectApproveRequestMessage;
	}) => Promise<void>;
}

export type OptionWalletConnectListener = Option<WalletConnectListener>;
