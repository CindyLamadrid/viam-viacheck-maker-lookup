import { useRef, useEffect } from "react";

const useEventListener = (eventName, handler, element = window) => {
  const savedHandler = useRef();
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) {
      return;
    }
    const eventListener = event => savedHandler.current(event);
    // Add event listener
    element.addEventListener(eventName, eventListener);
    // eslint-disable-next-line consistent-return
    return () => {
      // Remove event listener
      element.removeEventListener(eventName, eventListener);
    };
  }, [eventName, element]);
};

export default useEventListener;
