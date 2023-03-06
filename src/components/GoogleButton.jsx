import React, { useEffect, useState } from "react";
import { Button } from "antd";
import env from "react-dotenv";
import { useGetGoogleOauthTokenMutation } from "../api";

function GoogleButton({ token }) {
  const params = new URLSearchParams(window.location.search);
  const [getCode, setGetCode] = useState(false);
  const [getGoogleOauthToken] = useGetGoogleOauthTokenMutation();

  const getToken = async () => {
    await getGoogleOauthToken({
      code: "4/P7q7W91a-oMsCeLvIaQm6bTrgtp7",
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
      client_secret: process.env.REACT_APP_GOOGLE_SECRET_KEY,
      redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    })
      .unwrap()
      // .finally(() => window.location.replace("http://localhost:3000"))
      .then((response) => {
        console.log(response);
        setGetCode(true);
      })
      .catch((err) => {
        console.log(err.message);
        setGetCode(false);
      });
  };

  useEffect(() => {
    if (params.get("code") !== null && getCode) {
      console.log(params.get("code"));
      getToken();
    }
  }, [getCode]);

  return (
    <Button
      href={`https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=consent&access_type=offline&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&scope=${process.env.REACT_APP_GOOGLE_SCOPE}&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI}`}>
      Login
    </Button>
  );
}

export default GoogleButton;
