/**
 * Throttle function using requestAnimationFrame for optimal performance
 * @param {Function} func - The function to throttle
 * @returns {Function} - The throttled function
 */
export function rafThrottle(func) {
  let rafId = null;
  let lastArgs = null;

  return function throttled(...args) {
    lastArgs = args;

    if (rafId === null) {
      rafId = requestAnimationFrame(() => {
        func.apply(this, lastArgs);
        rafId = null;
      });
    }
  };
}
