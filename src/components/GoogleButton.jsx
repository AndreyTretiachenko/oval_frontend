import React, { useEffect, useState } from "react";
import { Button } from "antd";
import { useGetGoogleOauthTokenMutation, useLazyGetGoogleProfileQuery } from "../api";

function GoogleButton({ token }) {
  const params = new URLSearchParams(window.location.search);
  const [getCode, setGetCode] = useState();
  const [getGoogleOauthToken] = useGetGoogleOauthTokenMutation();
  const [getGooglePrifile] = useLazyGetGoogleProfileQuery();

  const getToken = async () => {
    await getGoogleOauthToken(
      `code=${params.get("code")}&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&client_secret=${
        process.env.REACT_APP_GOOGLE_SECRET_KEY
      }&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_DEV}&grant_type=authorization_code`
    )
      .unwrap()
      .then(async (response) => {
        localStorage.setItem("token", JSON.stringify(response));
        localStorage.setItem("refresh_token", JSON.stringify(response.refresh_token));
        localStorage.setItem("auth", JSON.stringify(response));
        await getGooglePrifile(response.access_token)
          .unwrap()
          .then((res) => localStorage.setItem("profile", JSON.stringify(res)));
        setGetCode(false);
        window.location.replace(process.env.REACT_APP_GOOGLE_REDIRECT_URI_DEV);
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
    <>
      <span style={!JSON.parse(localStorage.getItem("refresh_token")) ? { display: "none" } : { marginLeft: 10 }}>
        пользователь: {JSON.parse(localStorage.getItem("profile"))?.name}
      </span>
      <Button
        style={JSON.parse(localStorage.getItem("refresh_token")) ? { display: "none" } : { marginLeft: 20 }}
        href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=consent&access_type=offline&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=${process.env.REACT_APP_GOOGLE_SCOPE}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI_DEV}`}>
        авторизация
      </Button>
    </>
  );
}

export default GoogleButton;
