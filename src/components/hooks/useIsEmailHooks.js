import { useState, useEffect } from "react";
import { isEmail } from "validator";

function useUsernameHooks() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    if (onBlur || onFocus) {
      if (!isEmail(email)) {
        setError(true);
      } else {
        setError(false);
      }
    }
  }, [email]);

  return [email, setEmail, error, setOnBlur, setOnFocus];
}

export default useUsernameHooks;
