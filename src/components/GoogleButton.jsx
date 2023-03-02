import React from "react";
import { Button } from "antd";
import { useGoogleLogin } from "@react-oauth/google";

function GoogleButton({ token }) {
  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => token(tokenResponse),
    flow: "auth-code",
    redirect_uri: "http://localhost:5001",
  });

  return <Button onClick={() => login()}>Авторизация Google</Button>;
}

export default GoogleButton;
