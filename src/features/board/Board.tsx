import React from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { increment, decrement } from './boardSlice';

export default function Board() {
  const value = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  console.log(value);

  return (
    <section>
      <button onClick={() => dispatch(decrement())}>MINUS</button>
      <span>{value}</span>
      <button onClick={() => dispatch(increment())}>PLUS</button>
    </section>
  );
}
