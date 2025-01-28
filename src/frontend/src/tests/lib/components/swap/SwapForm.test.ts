import SwapForm from '$lib/components/swap/SwapForm.svelte';
import {
	SWAP_AMOUNT_EXCHANGE_BUTTON,
	SWAP_AMOUNT_EXCHANGE_VALUE,
	SWAP_INPUT_CURRENCY_TOKEN,
	SWAP_SWITCH_TOKENS_BUTTON
} from '$lib/constants/test-ids.constants';
import {
	SWAP_AMOUNTS_CONTEXT_KEY,
	initSwapAmountsStore,
	type SwapAmountsStoreData
} from '$lib/stores/swap-amounts.store';
import { SWAP_CONTEXT_KEY, initSwapContext } from '$lib/stores/swap.store';
import { mockValidIcCkToken, mockValidIcToken } from '$tests/mocks/ic-tokens.mock';
import { fireEvent, render } from '@testing-library/svelte';
import { readable } from 'svelte/store';

describe('SwapForm', () => {
	const mockContext = new Map();
	const mockSwapAmounts: SwapAmountsStoreData = {
		amountForSwap: 1,
		swapAmounts: {
			slippage: 0,
			receiveAmount: 2000000n,
			liquidityProvidersFee: undefined,
			gasFee: undefined
		}
	};

	beforeEach(() => {
		const originalContext = initSwapContext({
			sourceToken: mockValidIcToken,
			destinationToken: mockValidIcToken
		});

		const mockSwapContext = {
			...originalContext,
			sourceTokenExchangeRate: readable(10),
			destinationTokenExchangeRate: readable(2)
		};

		mockContext.set(SWAP_CONTEXT_KEY, mockSwapContext);
	});

	const setupSwapAmountsStore = (swapAmounts?: SwapAmountsStoreData) => {
		const swapAmountsStore = initSwapAmountsStore();
		if (swapAmounts) {
			swapAmountsStore.setSwapAmounts(swapAmounts);
		}
		mockContext.set(SWAP_AMOUNTS_CONTEXT_KEY, { store: swapAmountsStore });
		return swapAmountsStore;
	};

	describe('switch tokens button', () => {
		it.each([
			{
				description: 'no swapAmount present',
				swapAmounts: undefined,
				props: { swapAmount: undefined, receiveAmount: undefined },
				expected: false
			},
			{
				description: 'swap amounts are loading',
				swapAmounts: mockSwapAmounts,
				props: { swapAmount: '2', receiveAmount: 2 },
				expected: true
			},
			{
				description: 'swap amount exists but receive amount is null',
				swapAmounts: { amountForSwap: 1, swapAmounts: undefined },
				props: { swapAmount: '1', receiveAmount: undefined },
				expected: true
			},
			{
				description: 'both amounts are set and not loading',
				swapAmounts: mockSwapAmounts,
				props: { swapAmount: '1', receiveAmount: 2 },
				expected: false
			}
		])('should handle button state when $description', ({ swapAmounts, props, expected }) => {
			setupSwapAmountsStore(swapAmounts as SwapAmountsStoreData);

			const { getByTestId } = render(SwapForm, {
				props: { ...props, slippageValue: undefined },
				context: mockContext
			});

			const button = getByTestId(SWAP_SWITCH_TOKENS_BUTTON);
			if (expected) {
				expect(button).toHaveAttribute('disabled');
			} else {
				expect(button).not.toHaveAttribute('disabled');
			}
		});
	});

	describe('display values', () => {
		beforeEach(() => {
			setupSwapAmountsStore(mockSwapAmounts);
		});

		const renderSwapForm = () =>
			render(SwapForm, {
				props: {
					swapAmount: '1',
					receiveAmount: 2,
					slippageValue: undefined
				},
				context: mockContext
			});

		it('should display initial token and USD values correctly', () => {
			const { getAllByTestId } = renderSwapForm();
			const [sourceTokenExchangeValue, destinationTokenExchangeValue] = getAllByTestId(
				SWAP_AMOUNT_EXCHANGE_VALUE
			);
			const [sourceInput, destinationInput] = getAllByTestId(SWAP_INPUT_CURRENCY_TOKEN);

			expect(sourceTokenExchangeValue).toHaveTextContent('$10.00');
			expect(destinationTokenExchangeValue).toHaveTextContent('$0.04');
			expect(sourceInput).toHaveValue('1');
			expect(destinationInput).toHaveValue('0.02');
		});

		it.each([
			{ description: 'source', buttonIndex: 0 },
			{ description: 'destination', buttonIndex: 1 }
		])(
			'should switch between USD and token values when clicking $description exchange',
			async ({ buttonIndex }) => {
				const { getAllByTestId } = renderSwapForm();
				const buttons = getAllByTestId(SWAP_AMOUNT_EXCHANGE_BUTTON);
				const [sourceTokenExchangeValue, destinationTokenExchangeValue] = getAllByTestId(
					SWAP_AMOUNT_EXCHANGE_VALUE
				);
				const [sourceInput, destinationInput] = getAllByTestId(SWAP_INPUT_CURRENCY_TOKEN);

				const button = buttons[buttonIndex];

				await fireEvent.click(button);
				expect(sourceTokenExchangeValue).toHaveTextContent(`1 ${mockValidIcToken.symbol}`);
				expect(destinationTokenExchangeValue).toHaveTextContent(`2 ${mockValidIcCkToken.symbol}`);
				expect(sourceInput).toHaveValue('1');
				expect(destinationInput).toHaveValue('0.02');

				await fireEvent.click(button);
				expect(sourceTokenExchangeValue).toHaveTextContent('$10.00');
				expect(destinationTokenExchangeValue).toHaveTextContent('$0.04');
				expect(sourceInput).toHaveValue('1');
				expect(destinationInput).toHaveValue('0.02');
			}
		);
	});
});
