// A collection of enums used in Oisy's various wizards when the effective actions are being executed.
// For example, in an Ethereum transfer, when the message is first signed and then effectively sent.

export enum ProgressStepsSend {
	INITIALIZATION = 'initialization',
	SIGN_APPROVE = 'sign_approve',
	APPROVE = 'approve',
	SIGN_TRANSFER = 'sign_transfer',
	TRANSFER = 'transfer',
	APPROVE_WALLET_CONNECT = 'approve_wallet_connect',
	DONE = 'done'
}

export enum ProgressStepsConvert {
	INITIALIZATION = 'initialization',
	CONVERT = 'convert',
	UPDATE_UI = 'update_ui',
	DONE = 'done'
}

export enum ProgressStepsSwap {
	INITIALIZATION = 'initialization',
	SWAP = 'swap',
	UPDATE_UI = 'update_ui',
	DONE = 'done'
}

export enum ProgressStepsSign {
	INITIALIZATION = 'initialization',
	SIGN = 'sign',
	APPROVE = 'approve',
	APPROVE_WALLET_CONNECT = 'approve_wallet_connect',
	DONE = 'done'
}

export enum ProgressStepsLoader {
	INITIALIZATION = 'initialization',
	ADDRESSES = 'addresses',
	DONE = 'done'
}

export enum ProgressStepsAddToken {
	INITIALIZATION = 'initialization',
	SAVE = 'save',
	UPDATE_UI = 'update_ui',
	DONE = 'done'
}

export enum ProgressStepsHideToken {
	INITIALIZATION = 'initialization',
	HIDE = 'hide',
	UPDATE_UI = 'update_ui',
	DONE = 'done'
}

export enum ProgressStepsSendIc {
	INITIALIZATION = 'initialization',
	APPROVE_FEES = 'approve_fees',
	APPROVE_TRANSFER = 'approve_transfer',
	SEND = 'send',
	RELOAD = 'reload',
	DONE = 'done'
}

export enum ProgressStepsSendBtc {
	INITIALIZATION = 'initialization',
	SEND = 'send',
	RELOAD = 'reload',
	DONE = 'done'
}

export enum ProgressStepsSendSol {
	INITIALIZATION = 'initialization',
	SIGN = 'sign',
	SEND = 'send',
	RELOAD = 'reload',
	DONE = 'done'
}

export enum ProgressStepsUpdateBalanceCkBtc {
	INITIALIZATION = 'initialization',
	RETRIEVE = 'retrieve',
	RELOAD = 'reload',
	DONE = 'done'
}
