//! Bindings to the `cycles_ledger` canister, generated by `./scripts/bind/rust.sh`
//!
//! Binding configuration: `./scripts/bind/rust/cycles_ledger.types.toml`
//!
//! Adapted from: <https://github.com/dfinity/candid/blob/master/rust/candid_parser/src/bindings/rust_call.hbs>
#![allow(dead_code, unused_imports, clippy::all, clippy::missing_errors_doc)]
use candid::{self, CandidType, Deserialize, Principal};
use ic_cdk::api::call::CallResult;

#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum ChangeIndexId {
    SetTo(Principal),
    Unset,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct UpgradeArgs {
    pub change_index_id: Option<ChangeIndexId>,
    pub max_blocks_per_request: Option<u64>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct InitArgs {
    pub index_id: Option<Principal>,
    pub max_blocks_per_request: u64,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum LedgerArgs {
    Upgrade(Option<UpgradeArgs>),
    Init(InitArgs),
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct SubnetFilter {
    pub subnet_type: Option<String>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum SubnetSelection {
    Filter(SubnetFilter),
    Subnet { subnet: Principal },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct CanisterSettings {
    pub freezing_threshold: Option<candid::Nat>,
    pub controllers: Option<Vec<Principal>>,
    pub reserved_cycles_limit: Option<candid::Nat>,
    pub memory_allocation: Option<candid::Nat>,
    pub compute_allocation: Option<candid::Nat>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct CmcCreateCanisterArgs {
    pub subnet_selection: Option<SubnetSelection>,
    pub settings: Option<CanisterSettings>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct CreateCanisterArgs {
    pub from_subaccount: Option<serde_bytes::ByteBuf>,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
    pub creation_args: Option<CmcCreateCanisterArgs>,
}
pub type BlockIndex = candid::Nat;
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct CreateCanisterSuccess {
    pub block_id: BlockIndex,
    pub canister_id: Principal,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum CreateCanisterError {
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    Duplicate {
        duplicate_of: candid::Nat,
        canister_id: Option<Principal>,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    FailedToCreate {
        error: String,
        refund_block: Option<BlockIndex>,
        fee_block: Option<BlockIndex>,
    },
    TooOld,
    InsufficientFunds {
        balance: candid::Nat,
    },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct Account {
    pub owner: Principal,
    pub subaccount: Option<serde_bytes::ByteBuf>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct CreateCanisterFromArgs {
    pub spender_subaccount: Option<serde_bytes::ByteBuf>,
    pub from: Account,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
    pub creation_args: Option<CmcCreateCanisterArgs>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum RejectionCode {
    NoError,
    CanisterError,
    SysTransient,
    DestinationInvalid,
    Unknown,
    SysFatal,
    CanisterReject,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum CreateCanisterFromError {
    FailedToCreateFrom {
        create_from_block: Option<BlockIndex>,
        rejection_code: RejectionCode,
        refund_block: Option<BlockIndex>,
        approval_refund_block: Option<BlockIndex>,
        rejection_reason: String,
    },
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    InsufficientAllowance {
        allowance: candid::Nat,
    },
    Duplicate {
        duplicate_of: candid::Nat,
        canister_id: Option<Principal>,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    TooOld,
    InsufficientFunds {
        balance: candid::Nat,
    },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct DepositArgs {
    pub to: Account,
    pub memo: Option<serde_bytes::ByteBuf>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct DepositResult {
    pub balance: candid::Nat,
    pub block_index: BlockIndex,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct HttpRequest {
    pub url: String,
    pub method: String,
    pub body: serde_bytes::ByteBuf,
    pub headers: Vec<(String, String)>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct HttpResponse {
    pub body: serde_bytes::ByteBuf,
    pub headers: Vec<(String, String)>,
    pub status_code: u16,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum MetadataValue {
    Int(candid::Int),
    Nat(candid::Nat),
    Blob(serde_bytes::ByteBuf),
    Text(String),
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct SupportedStandard {
    pub url: String,
    pub name: String,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct TransferArgs {
    pub to: Account,
    pub fee: Option<candid::Nat>,
    pub memo: Option<serde_bytes::ByteBuf>,
    pub from_subaccount: Option<serde_bytes::ByteBuf>,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum TransferError {
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    BadBurn {
        min_burn_amount: candid::Nat,
    },
    Duplicate {
        duplicate_of: candid::Nat,
    },
    BadFee {
        expected_fee: candid::Nat,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    TooOld,
    InsufficientFunds {
        balance: candid::Nat,
    },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct AllowanceArgs {
    pub account: Account,
    pub spender: Account,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct Allowance {
    pub allowance: candid::Nat,
    pub expires_at: Option<u64>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct ApproveArgs {
    pub fee: Option<candid::Nat>,
    pub memo: Option<serde_bytes::ByteBuf>,
    pub from_subaccount: Option<serde_bytes::ByteBuf>,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
    pub expected_allowance: Option<candid::Nat>,
    pub expires_at: Option<u64>,
    pub spender: Account,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum ApproveError {
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    Duplicate {
        duplicate_of: candid::Nat,
    },
    BadFee {
        expected_fee: candid::Nat,
    },
    AllowanceChanged {
        current_allowance: candid::Nat,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    TooOld,
    Expired {
        ledger_time: u64,
    },
    InsufficientFunds {
        balance: candid::Nat,
    },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct TransferFromArgs {
    pub to: Account,
    pub fee: Option<candid::Nat>,
    pub spender_subaccount: Option<serde_bytes::ByteBuf>,
    pub from: Account,
    pub memo: Option<serde_bytes::ByteBuf>,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum TransferFromError {
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    InsufficientAllowance {
        allowance: candid::Nat,
    },
    BadBurn {
        min_burn_amount: candid::Nat,
    },
    Duplicate {
        duplicate_of: candid::Nat,
    },
    BadFee {
        expected_fee: candid::Nat,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    TooOld,
    InsufficientFunds {
        balance: candid::Nat,
    },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct GetArchivesArgs {
    pub from: Option<Principal>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct GetArchivesResultItem {
    pub end: candid::Nat,
    pub canister_id: Principal,
    pub start: candid::Nat,
}
pub type GetArchivesResult = Vec<GetArchivesResultItem>;
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct GetBlocksArgsItem {
    pub start: candid::Nat,
    pub length: candid::Nat,
}
pub type GetBlocksArgs = Vec<GetBlocksArgsItem>;
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum Value {
    Int(candid::Int),
    Map(Vec<(String, Box<Value>)>),
    Nat(candid::Nat),
    Nat64(u64),
    Blob(serde_bytes::ByteBuf),
    Text(String),
    Array(Vec<Box<Value>>),
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct GetBlocksResultBlocksItem {
    pub id: candid::Nat,
    pub block: Box<Value>,
}
candid::define_function!(pub GetBlocksResultArchivedBlocksItemCallback : (
    GetBlocksArgs,
  ) -> (GetBlocksResult) query);
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct GetBlocksResultArchivedBlocksItem {
    pub args: GetBlocksArgs,
    pub callback: GetBlocksResultArchivedBlocksItemCallback,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct GetBlocksResult {
    pub log_length: candid::Nat,
    pub blocks: Vec<GetBlocksResultBlocksItem>,
    pub archived_blocks: Vec<GetBlocksResultArchivedBlocksItem>,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct DataCertificate {
    pub certificate: serde_bytes::ByteBuf,
    pub hash_tree: serde_bytes::ByteBuf,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct SupportedBlockType {
    pub url: String,
    pub block_type: String,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct WithdrawArgs {
    pub to: Principal,
    pub from_subaccount: Option<serde_bytes::ByteBuf>,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum WithdrawError {
    FailedToWithdraw {
        rejection_code: RejectionCode,
        fee_block: Option<candid::Nat>,
        rejection_reason: String,
    },
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    Duplicate {
        duplicate_of: candid::Nat,
    },
    BadFee {
        expected_fee: candid::Nat,
    },
    InvalidReceiver {
        receiver: Principal,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    TooOld,
    InsufficientFunds {
        balance: candid::Nat,
    },
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub struct WithdrawFromArgs {
    pub to: Principal,
    pub spender_subaccount: Option<serde_bytes::ByteBuf>,
    pub from: Account,
    pub created_at_time: Option<u64>,
    pub amount: candid::Nat,
}
#[derive(CandidType, Deserialize, Debug, Eq, PartialEq, Clone)]
pub enum WithdrawFromError {
    GenericError {
        message: String,
        error_code: candid::Nat,
    },
    TemporarilyUnavailable,
    InsufficientAllowance {
        allowance: candid::Nat,
    },
    Duplicate {
        duplicate_of: BlockIndex,
    },
    InvalidReceiver {
        receiver: Principal,
    },
    CreatedInFuture {
        ledger_time: u64,
    },
    TooOld,
    FailedToWithdrawFrom {
        withdraw_from_block: Option<candid::Nat>,
        rejection_code: RejectionCode,
        refund_block: Option<candid::Nat>,
        approval_refund_block: Option<candid::Nat>,
        rejection_reason: String,
    },
    InsufficientFunds {
        balance: candid::Nat,
    },
}
