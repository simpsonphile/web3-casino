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
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface ICasinoInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "addToAddressBalance"
      | "addToAddressBalance(address,uint256)"
      | "getBalanceOf"
      | "getBalanceOf(address)"
      | "getCasinoBalance"
      | "getCasinoBalance()"
      | "getFromAddressBalance"
      | "getFromAddressBalance(address,uint256)"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addToAddressBalance",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "addToAddressBalance(address,uint256)",
    values: [AddressLike, BigNumberish]
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

  decodeFunctionResult(
    functionFragment: "addToAddressBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addToAddressBalance(address,uint256)",
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
}

export interface ICasino extends BaseContract {
  connect(runner?: ContractRunner | null): ICasino;
  waitForDeployment(): Promise<this>;

  interface: ICasinoInterface;

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

  getBalanceOf: TypedContractMethod<[account: AddressLike], [bigint], "view">;

  "getBalanceOf(address)": TypedContractMethod<
    [account: AddressLike],
    [bigint],
    "view"
  >;

  getCasinoBalance: TypedContractMethod<[], [bigint], "nonpayable">;

  "getCasinoBalance()": TypedContractMethod<[], [bigint], "nonpayable">;

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

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

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
    nameOrSignature: "getBalanceOf"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getBalanceOf(address)"
  ): TypedContractMethod<[account: AddressLike], [bigint], "view">;
  getFunction(
    nameOrSignature: "getCasinoBalance"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
  getFunction(
    nameOrSignature: "getCasinoBalance()"
  ): TypedContractMethod<[], [bigint], "nonpayable">;
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

  filters: {};
}
