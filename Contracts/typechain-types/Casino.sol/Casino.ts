/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface CasinoInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addSubOwner"
      | "addSubOwner(address)"
      | "addToAddressBalance"
      | "addToAddressBalance(address,uint256)"
      | "balance"
      | "balance()"
      | "deposit"
      | "deposit()"
      | "games"
      | "games(uint256)"
      | "getBalance"
      | "getBalance()"
      | "getBalanceOf"
      | "getBalanceOf(address)"
      | "getCasinoBalance"
      | "getCasinoBalance()"
      | "getFromAddressBalance"
      | "getFromAddressBalance(address,uint256)"
      | "getSubowners"
      | "getSubowners(address)"
      | "owner"
      | "owner()"
      | "withdraw"
      | "withdraw(uint256)"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Deposit"
      | "Deposit(address,uint256)"
      | "GameAdded"
      | "GameAdded(address)"
      | "Withdraw"
      | "Withdraw(address,uint256)"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "addSubOwner",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addSubOwner(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "addToAddressBalance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addToAddressBalance(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "balance", values?: undefined): string;
  encodeFunctionData(functionFragment: "balance()", values?: undefined): string;
  encodeFunctionData(functionFragment: "deposit", values?: undefined): string;
  encodeFunctionData(functionFragment: "deposit()", values?: undefined): string;
  encodeFunctionData(functionFragment: "games", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "games(uint256)",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBalance()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceOf",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getBalanceOf(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getCasinoBalance",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getCasinoBalance()",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getFromAddressBalance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getFromAddressBalance(address,uint256)",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubowners",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getSubowners(address)",
    values: [AddressLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner()", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw(uint256)",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "addSubOwner",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addSubOwner(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addToAddressBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addToAddressBalance(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "balance()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "deposit()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "games", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "games(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getBalance", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getBalance()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceOf",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getBalanceOf(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCasinoBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getCasinoBalance()",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFromAddressBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getFromAddressBalance(address,uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubowners",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getSubowners(address)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner()", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdraw(uint256)",
    data: BytesLike
  ): Result;
}

export namespace DepositEvent {
  export type InputTuple = [account: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, amount: bigint];
  export interface OutputObject {
    account: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace GameAddedEvent {
  export type InputTuple = [gameAddress: AddressLike];
  export type OutputTuple = [gameAddress: string];
  export interface OutputObject {
    gameAddress: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace WithdrawEvent {
  export type InputTuple = [account: AddressLike, amount: BigNumberish];
  export type OutputTuple = [account: string, amount: bigint];
  export interface OutputObject {
    account: string;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Casino extends BaseContract {
  connect(runner?: ContractRunner | null): Casino;
  waitForDeployment(): Promise<this>;

  interface: CasinoInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  addSubOwner: TypedContractMethod<
    [_newSubownerAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  "addSubOwner(address)": TypedContractMethod<
    [_newSubownerAddress: AddressLike],
    [void],
    "nonpayable"
  >;

  addToAddressBalance: TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  "addToAddressBalance(address,uint256)": TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  balance: TypedContractMethod<[], [bigint], "view">;

  "balance()": TypedContractMethod<[], [bigint], "view">;

  deposit: TypedContractMethod<[], [void], "payable">;

  "deposit()": TypedContractMethod<[], [void], "payable">;

  games: TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  "games(uint256)": TypedContractMethod<[arg0: BigNumberish], [string], "view">;

  getBalance: TypedContractMethod<[], [bigint], "view">;

  "getBalance()": TypedContractMethod<[], [bigint], "view">;

  getBalanceOf: TypedContractMethod<[_account: AddressLike], [bigint], "view">;

  "getBalanceOf(address)": TypedContractMethod<
    [_account: AddressLike],
    [bigint],
    "view"
  >;

  getCasinoBalance: TypedContractMethod<[], [bigint], "view">;

  "getCasinoBalance()": TypedContractMethod<[], [bigint], "view">;

  getFromAddressBalance: TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  "getFromAddressBalance(address,uint256)": TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getSubowners: TypedContractMethod<[_address: AddressLike], [boolean], "view">;

  "getSubowners(address)": TypedContractMethod<
    [_address: AddressLike],
    [boolean],
    "view"
  >;

  owner: TypedContractMethod<[], [string], "view">;

  "owner()": TypedContractMethod<[], [string], "view">;

  withdraw: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  "withdraw(uint256)": TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "addSubOwner"
  ): TypedContractMethod<
    [_newSubownerAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addSubOwner(address)"
  ): TypedContractMethod<
    [_newSubownerAddress: AddressLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addToAddressBalance"
  ): TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "addToAddressBalance(address,uint256)"
  ): TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "balance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "balance()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "deposit"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "deposit()"
  ): TypedContractMethod<[], [void], "payable">;
  getFunction(
    nameOrSignature: "games"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "games(uint256)"
  ): TypedContractMethod<[arg0: BigNumberish], [string], "view">;
  getFunction(
    nameOrSignature: "getBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getBalance()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getBalanceOf"
  ): TypedContractMethod<[_account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getBalanceOf(address)"
  ): TypedContractMethod<[_account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCasinoBalance"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCasinoBalance()"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "getFromAddressBalance"
  ): TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getFromAddressBalance(address,uint256)"
  ): TypedContractMethod<
    [_account: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getSubowners"
  ): TypedContractMethod<[_address: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "getSubowners(address)"
  ): TypedContractMethod<[_address: AddressLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "owner()"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdraw"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "withdraw(uint256)"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  getEvent(
    key: "Deposit"
  ): TypedContractEvent<
    DepositEvent.InputTuple,
    DepositEvent.OutputTuple,
    DepositEvent.OutputObject
  >;
  getEvent(
    key: "Deposit(address,uint256)"
  ): TypedContractEvent<
    Deposit_address_uint256_Event.InputTuple,
    Deposit_address_uint256_Event.OutputTuple,
    Deposit_address_uint256_Event.OutputObject
  >;
  getEvent(
    key: "GameAdded"
  ): TypedContractEvent<
    GameAddedEvent.InputTuple,
    GameAddedEvent.OutputTuple,
    GameAddedEvent.OutputObject
  >;
  getEvent(
    key: "GameAdded(address)"
  ): TypedContractEvent<
    GameAdded_address_Event.InputTuple,
    GameAdded_address_Event.OutputTuple,
    GameAdded_address_Event.OutputObject
  >;
  getEvent(
    key: "Withdraw"
  ): TypedContractEvent<
    WithdrawEvent.InputTuple,
    WithdrawEvent.OutputTuple,
    WithdrawEvent.OutputObject
  >;
  getEvent(
    key: "Withdraw(address,uint256)"
  ): TypedContractEvent<
    Withdraw_address_uint256_Event.InputTuple,
    Withdraw_address_uint256_Event.OutputTuple,
    Withdraw_address_uint256_Event.OutputObject
  >;

  filters: {
    "Deposit(address,uint256)": TypedContractEvent<
      DepositEvent.InputTuple,
      DepositEvent.OutputTuple,
      DepositEvent.OutputObject
    >;
    Deposit: TypedContractEvent<
      DepositEvent.InputTuple,
      DepositEvent.OutputTuple,
      DepositEvent.OutputObject
    >;

    "GameAdded(address)": TypedContractEvent<
      GameAddedEvent.InputTuple,
      GameAddedEvent.OutputTuple,
      GameAddedEvent.OutputObject
    >;
    GameAdded: TypedContractEvent<
      GameAddedEvent.InputTuple,
      GameAddedEvent.OutputTuple,
      GameAddedEvent.OutputObject
    >;

    "Withdraw(address,uint256)": TypedContractEvent<
      WithdrawEvent.InputTuple,
      WithdrawEvent.OutputTuple,
      WithdrawEvent.OutputObject
    >;
    Withdraw: TypedContractEvent<
      WithdrawEvent.InputTuple,
      WithdrawEvent.OutputTuple,
      WithdrawEvent.OutputObject
    >;
  };
}
