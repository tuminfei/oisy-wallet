// @ts-ignore
export const idlFactory = ({ IDL }) => {
	const CandidDuration = IDL.Variant({
		Minutes: IDL.Nat64,
		Seconds: IDL.Nat64,
		Days: IDL.Nat64,
		Forever: IDL.Null,
		Hours: IDL.Nat64,
		Nanoseconds: IDL.Nat64
	});
	const Account = IDL.Record({
		owner: IDL.Principal,
		subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
	});
	const TokenConfig = IDL.Record({
		amount_per_user: IDL.Nat,
		account: Account,
		ledger_canister: IDL.Principal
	});
	const UsageAwardEvent = IDL.Record({
		name: IDL.Text,
		num_events_per_cycle: IDL.Nat32,
		awards: IDL.Vec(TokenConfig),
		num_users_per_event: IDL.Nat32
	});
	const UsageCriteria = IDL.Record({
		measurement_duration: CandidDuration,
		min_transactions: IDL.Nat32,
		min_logins: IDL.Nat32,
		min_valuation_usd: IDL.Nat64
	});
	const UsageAwardConfig = IDL.Record({
		cycle_duration: CandidDuration,
		awards: IDL.Vec(UsageAwardEvent),
		eligibility_criteria: UsageCriteria
	});
	const BatchSizes = IDL.Record({
		user_fetching: IDL.Nat16,
		sprinkle: IDL.Nat16,
		block_processing: IDL.Nat16,
		airdrop: IDL.Nat16,
		block_fetching: IDL.Nat16
	});
	const AirDropConfig = IDL.Record({
		number_of_participants: IDL.Nat64,
		start_timestamp_ns: IDL.Nat64,
		token_configs: IDL.Vec(TokenConfig)
	});
	const VipConfig = IDL.Record({
		code_validity_duration: IDL.Nat64,
		vips: IDL.Vec(IDL.Principal),
		rewards: IDL.Vec(TokenConfig)
	});
	const Config = IDL.Record({
		usage_awards_config: IDL.Opt(UsageAwardConfig),
		batch_sizes: IDL.Opt(BatchSizes),
		airdrop_config: IDL.Opt(AirDropConfig),
		index_canisters: IDL.Vec(IDL.Principal),
		vip_config: IDL.Opt(VipConfig),
		processing_interval_s: IDL.Opt(IDL.Nat16),
		readonly_admins: IDL.Vec(IDL.Principal),
		oisy_canister: IDL.Opt(IDL.Principal)
	});
	const VipReward = IDL.Record({ code: IDL.Text });
	const ClaimVipRewardResponse = IDL.Variant({
		AlreadyClaimed: IDL.Null,
		Success: IDL.Null,
		InvalidCode: IDL.Null
	});
	const NewVipRewardResponse = IDL.Variant({
		Anonymous: IDL.Null,
		NotImportantPerson: IDL.Null,
		VipReward: VipReward
	});
	const PublicAirdropStatus = IDL.Variant({
		Ongoing: IDL.Record({
			remaining_airdrops: IDL.Nat64,
			total_airdrops: IDL.Nat64
		}),
		Completed: IDL.Record({ total_airdrops: IDL.Nat64 }),
		Upcoming: IDL.Null
	});
	const PublicSprinkleInfo = IDL.Record({
		timestamp_ns: IDL.Nat64,
		total_amount: IDL.Nat,
		n_sprinkled_users: IDL.Nat64,
		ledger: IDL.Principal
	});
	const PublicRewardsInfo = IDL.Record({
		airdrop: IDL.Opt(PublicAirdropStatus),
		last_sprinkle: IDL.Opt(PublicSprinkleInfo)
	});
	const TransactionType = IDL.Variant({
		Send: IDL.Null,
		Receive: IDL.Null
	});
	const Transaction_Icrc = IDL.Record({
		transaction_type: TransactionType,
		network: IDL.Record({}),
		counterparty: IDL.Principal,
		timestamp: IDL.Nat64,
		amount: IDL.Nat64
	});
	const AccountSnapshot_Icrc = IDL.Record({
		decimals: IDL.Nat8,
		token_address: IDL.Principal,
		network: IDL.Record({}),
		approx_usd_per_token: IDL.Float64,
		last_transactions: IDL.Vec(Transaction_Icrc),
		account: IDL.Principal,
		timestamp: IDL.Nat64,
		amount: IDL.Nat64
	});
	const Transaction_Spl = IDL.Record({
		transaction_type: TransactionType,
		network: IDL.Record({}),
		counterparty: IDL.Text,
		timestamp: IDL.Nat64,
		amount: IDL.Nat64
	});
	const AccountSnapshot_Spl = IDL.Record({
		decimals: IDL.Nat8,
		token_address: IDL.Text,
		network: IDL.Record({}),
		approx_usd_per_token: IDL.Float64,
		last_transactions: IDL.Vec(Transaction_Spl),
		account: IDL.Text,
		timestamp: IDL.Nat64,
		amount: IDL.Nat64
	});
	const AccountSnapshotFor = IDL.Variant({
		Icrc: AccountSnapshot_Icrc,
		SplDevnet: AccountSnapshot_Spl,
		SplMainnet: AccountSnapshot_Spl
	});
	const UserSnapshot = IDL.Record({
		accounts: IDL.Vec(AccountSnapshotFor),
		timestamp: IDL.Opt(IDL.Nat64)
	});
	const LedgerConfig = IDL.Record({
		ledger_index: IDL.Principal,
		ledger: IDL.Principal,
		ledger_account: Account
	});
	const SetSprinkleTimestampArg = IDL.Record({
		total_sprinkle_amount: IDL.Nat,
		min_account_amount: IDL.Nat,
		user_sprinkle_amount: IDL.Nat,
		timestamp: IDL.Nat64,
		ledger_config: LedgerConfig
	});
	const SprinkleEvent = IDL.Record({
		n_sprinkled_users: IDL.Nat64,
		timestamp_scheduled: IDL.Nat64,
		n_eligible_users: IDL.Nat64,
		n_selected_users: IDL.Nat64
	});
	const SprinkleStatus = IDL.Record({
		next_timestamp: IDL.Opt(IDL.Nat64),
		past_events: IDL.Vec(SprinkleEvent)
	});
	const StatusResponse = IDL.Record({
		latest_oisy_user_timestamp: IDL.Opt(IDL.Nat64),
		last_block_fetch_timestamp: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
		num_buffered_blocks: IDL.Nat64,
		processed_block_height: IDL.Vec(IDL.Tuple(IDL.Principal, IDL.Nat64)),
		sprinkle_status: SprinkleStatus
	});
	const UsageAwardStats = IDL.Record({
		user_count: IDL.Nat64,
		eligible_user_count: IDL.Nat64,
		snapshot_count: IDL.Nat64,
		awarded_count: IDL.Nat64,
		award_events: IDL.Nat64,
		eligible_snapshots: IDL.Nat64
	});
	const RewardInfo = IDL.Record({
		name: IDL.Opt(IDL.Text),
		ledger: IDL.Principal,
		timestamp: IDL.Nat64,
		amount: IDL.Nat
	});
	const UserData = IDL.Record({
		airdrops: IDL.Vec(RewardInfo),
		usage_awards: IDL.Opt(IDL.Vec(RewardInfo)),
		last_snapshot_timestamp: IDL.Opt(IDL.Nat64),
		is_vip: IDL.Opt(IDL.Bool),
		sprinkles: IDL.Vec(RewardInfo)
	});
	const UsageAwardState = IDL.Record({ snapshots: IDL.Vec(UserSnapshot) });
	const VipStats = IDL.Record({
		total_rejected: IDL.Nat32,
		total_redeemed: IDL.Nat32,
		total_issued: IDL.Nat32
	});
	return IDL.Service({
		claim_usage_award: IDL.Func([UsageAwardEvent, IDL.Principal], [], []),
		claim_vip_reward: IDL.Func([VipReward], [ClaimVipRewardResponse], []),
		config: IDL.Func([], [Config]),
		configure_usage_awards: IDL.Func([UsageAwardConfig], [], []),
		configure_vip: IDL.Func([VipConfig], [], []),
		new_vip_reward: IDL.Func([], [NewVipRewardResponse], []),
		public_rewards_info: IDL.Func([], [PublicRewardsInfo]),
		register_airdrop_recipient: IDL.Func([UserSnapshot], [], []),
		register_snapshot_for: IDL.Func([IDL.Principal, UserSnapshot], [], []),
		set_sprinkle_timestamp: IDL.Func([SetSprinkleTimestampArg], [], []),
		status: IDL.Func([], [StatusResponse]),
		trigger_usage_award_event: IDL.Func([UsageAwardEvent], [], []),
		usage_eligible: IDL.Func([IDL.Principal], [IDL.Bool]),
		usage_stats: IDL.Func([], [UsageAwardStats]),
		user_info: IDL.Func([], [UserData]),
		user_stats: IDL.Func([IDL.Principal], [UsageAwardState]),
		vip_stats: IDL.Func([], [VipStats])
	});
};
// @ts-ignore
export const init = ({ IDL }) => {
	const CandidDuration = IDL.Variant({
		Minutes: IDL.Nat64,
		Seconds: IDL.Nat64,
		Days: IDL.Nat64,
		Forever: IDL.Null,
		Hours: IDL.Nat64,
		Nanoseconds: IDL.Nat64
	});
	const Account = IDL.Record({
		owner: IDL.Principal,
		subaccount: IDL.Opt(IDL.Vec(IDL.Nat8))
	});
	const TokenConfig = IDL.Record({
		amount_per_user: IDL.Nat,
		account: Account,
		ledger_canister: IDL.Principal
	});
	const UsageAwardEvent = IDL.Record({
		name: IDL.Text,
		num_events_per_cycle: IDL.Nat32,
		awards: IDL.Vec(TokenConfig),
		num_users_per_event: IDL.Nat32
	});
	const UsageCriteria = IDL.Record({
		measurement_duration: CandidDuration,
		min_transactions: IDL.Nat32,
		min_logins: IDL.Nat32,
		min_valuation_usd: IDL.Nat64
	});
	const UsageAwardConfig = IDL.Record({
		cycle_duration: CandidDuration,
		awards: IDL.Vec(UsageAwardEvent),
		eligibility_criteria: UsageCriteria
	});
	const BatchSizes = IDL.Record({
		user_fetching: IDL.Nat16,
		sprinkle: IDL.Nat16,
		block_processing: IDL.Nat16,
		airdrop: IDL.Nat16,
		block_fetching: IDL.Nat16
	});
	const AirDropConfig = IDL.Record({
		number_of_participants: IDL.Nat64,
		start_timestamp_ns: IDL.Nat64,
		token_configs: IDL.Vec(TokenConfig)
	});
	const VipConfig = IDL.Record({
		code_validity_duration: IDL.Nat64,
		vips: IDL.Vec(IDL.Principal),
		rewards: IDL.Vec(TokenConfig)
	});
	const Config = IDL.Record({
		usage_awards_config: IDL.Opt(UsageAwardConfig),
		batch_sizes: IDL.Opt(BatchSizes),
		airdrop_config: IDL.Opt(AirDropConfig),
		index_canisters: IDL.Vec(IDL.Principal),
		vip_config: IDL.Opt(VipConfig),
		processing_interval_s: IDL.Opt(IDL.Nat16),
		readonly_admins: IDL.Vec(IDL.Principal),
		oisy_canister: IDL.Opt(IDL.Principal)
	});
	return [IDL.Opt(Config)];
};
