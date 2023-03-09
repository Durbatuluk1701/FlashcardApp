/// <reference types="react-scripts" />

type bool = boolean;
type Option<T> = T | string;

type Ok<T> = {
  res: "Ok";
  val: T;
};

type Err = {
  res: "Err";
  val: string;
};

type Res<T> = Ok<T> | Err;
