import React from 'react';
import useInfiniteScroll from './useInfiniteScroll';
import './styles.scss'


export default function InfiniteScroll({
  callback,
  children,
  debounce = 10,
  callDataPosition = 50,
  onScroll,
  isHorizontal = false,
}) {
  const { handleInfinite } = useInfiniteScroll({
    callback,
    debounce,
    callDataPosition,
    isHorizontal,
  });
  return (
    <div className="infiniteScroll__list">
      <div className="infiniteScroll__wrapper"
        aria-label="infinite scroll"
        onScroll={(e) => {
          handleInfinite(e);
          onScroll?.(e);
        }}
      >
        {children}
      </div>
    </div>
  );
}
