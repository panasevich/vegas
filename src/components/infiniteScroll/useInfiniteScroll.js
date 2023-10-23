import { useDebouncedCallback } from 'use-debounce';

export default function useInfiniteScroll({
  callback,
  callDataPosition,
  debounce,
  isHorizontal,
}) {
  const handleInfinite = useDebouncedCallback((e) => {
    const target = e.target;
    if (
      isHorizontal &&
      target.scrollWidth - target.clientWidth - callDataPosition <= target.scrollLeft
    ) {
      callback();
    }
    if (
      !isHorizontal &&
      target.scrollTop + target.offsetHeight + callDataPosition >= target.scrollHeight
    ) {
      callback();
    }
  }, debounce);
  return { handleInfinite };
}
