import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useGetGoogleOauthTokenMutation } from "../api";

function GoogleButton({ token }) {
  const params = new URLSearchParams(window.location.search);
  const [getCode, setGetCode] = useState();
  const [getGoogleOauthToken] = useGetGoogleOauthTokenMutation();

  const getToken = async () => {
    await getGoogleOauthToken(
      `code=${params.get("code")}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GOOGLE_SECRET_KEY
      }&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_PROD}&grant_type=authorization_code`
    )
      .unwrap()
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response));
        localStorage.setItem("refresh_token", JSON.stringify(response.refresh_token));
        setGetCode(false);
        window.location.replace(process.env.REACT_APP_GOOGLE_REDIRECT_URI_PROD);
      })
      .catch((err) => {
        if (err) {
          console.log(err.message);
          setGetCode(false);
        }
      });
  };

  useEffect(() => {
    if (params.get("code")) setGetCode(true);
    if (getCode) getToken();
  }, [getCode]);

  return (
    <Button
      style={JSON.parse(localStorage.getItem("refresh_token")) ? { display: "none" } : { marginLeft: 0 }}
      href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=consent&access_type=offline&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=${process.env.REACT_APP_GOOGLE_SCOPE}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_PROD}`}>
      авторизация
    </Button>
  );
}

export default GoogleButton;
