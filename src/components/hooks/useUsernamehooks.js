import { useState, useEffect } from "react";
import { isAlphanumeric } from "validator";

function useUsernameHooks() {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onBlur || onFocus) {
      if (!isAlphanumeric(username)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [username]);

  return [username, setUsername, error, setOnBlur, setOnFocus];
}

export default useUsernameHooks;
