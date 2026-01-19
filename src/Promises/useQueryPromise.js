// Implement a useQueryPromise hook that manages a promise resolution which can be used to fetch data.

// ---------------------------------------------------------
// ---------------------------------------------------------

import { useEffect, useRef, useState } from "react";

export function useQueryPromise(fn, deps = []) {
  const [state, setState] = useState({ status: "loading" });
  const callIdRef = useRef(0);

  useEffect(() => {
    let cancelled = false;
    const callId = ++callIdRef.current;

    setState({ status: "loading" });

    fn()
      .then((data) => {
        if (!cancelled || callId !== callIdRef.current) return;
        setState({
          status: "success",
          data: data,
        });
      })
      .catch((error) => {
        if (!cancelled || callId !== callIdRef.current) return;
        setState({
          status: "error",
          error: error,
        });
      });

    return () => {
      cancelled = true;
    };
  }, deps);

  return state;
}

// ---------------------------------------------------------
// ---------------------------------------------------------
