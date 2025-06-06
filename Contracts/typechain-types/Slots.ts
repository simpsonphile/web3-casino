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
} from "./common";

export interface SlotsInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "bet"
      | "bet(uint256)"
      | "mainContractAddress"
      | "mainContractAddress()"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "onGameFinish"
      | "onGameFinish(address,uint256,string,string,string,uint8,uint256)"
  ): EventFragment;

  encodeFunctionData(functionFragment: "bet", values: [BigNumberish]): string;
  encodeFunctionData(
    functionFragment: "bet(uint256)",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "mainContractAddress",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "mainContractAddress()",
    values?: undefined
  ): string;

  decodeFunctionResult(functionFragment: "bet", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "bet(uint256)",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mainContractAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "mainContractAddress()",
    data: BytesLike
  ): Result;
}

export namespace onGameFinishEvent {
  export type InputTuple = [
    player: AddressLike,
    arg1: BigNumberish,
    arg2: string,
    arg3: string,
    arg4: string,
    status: BigNumberish,
    arg6: BigNumberish
  ];
  export type OutputTuple = [
    player: string,
    arg1: bigint,
    arg2: string,
    arg3: string,
    arg4: string,
    status: bigint,
    arg6: bigint
  ];
  export interface OutputObject {
    player: string;
    arg1: bigint;
    arg2: string;
    arg3: string;
    arg4: string;
    status: bigint;
    arg6: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface Slots extends BaseContract {
  connect(runner?: ContractRunner | null): Slots;
  waitForDeployment(): Promise<this>;

  interface: SlotsInterface;

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

  bet: TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;

  "bet(uint256)": TypedContractMethod<
    [amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  mainContractAddress: TypedContractMethod<[], [string], "view">;

  "mainContractAddress()": TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "bet"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "bet(uint256)"
  ): TypedContractMethod<[amount: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "mainContractAddress"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "mainContractAddress()"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "onGameFinish"
  ): TypedContractEvent<
    onGameFinishEvent.InputTuple,
    onGameFinishEvent.OutputTuple,
    onGameFinishEvent.OutputObject
  >;
  getEvent(
    key: "onGameFinish(address,uint256,string,string,string,uint8,uint256)"
  ): TypedContractEvent<
    onGameFinish_address_uint256_string_string_string_uint8_uint256_Event.InputTuple,
    onGameFinish_address_uint256_string_string_string_uint8_uint256_Event.OutputTuple,
    onGameFinish_address_uint256_string_string_string_uint8_uint256_Event.OutputObject
  >;

  filters: {
    "onGameFinish(address,uint256,string,string,string,uint8,uint256)": TypedContractEvent<
      onGameFinishEvent.InputTuple,
      onGameFinishEvent.OutputTuple,
      onGameFinishEvent.OutputObject
    >;
    onGameFinish: TypedContractEvent<
      onGameFinishEvent.InputTuple,
      onGameFinishEvent.OutputTuple,
      onGameFinishEvent.OutputObject
    >;
  };
}
