import React, { useEffect } from "react";
import { Button } from "antd";
import { useGoogleLogin } from "@react-oauth/google";

function GoogleButton({ token }) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      localStorage.setItem("google_token", JSON.stringify(tokenResponse));
    },
  });

  return <Button onClick={() => login()}>Login</Button>;
}

export default GoogleButton;
