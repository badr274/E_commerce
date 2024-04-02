import axios from "axios";
import { useEffect } from "react";
import { GOOGLECALLBACK, baseUrl } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallback() {
  const cookie = Cookie();
  const location = useLocation();
  console.log(location.search);
  useEffect(() => {
    async function GoogleCall() {
      try {
        const res = await axios.get(
          `${baseUrl}/${GOOGLECALLBACK}${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("e-commerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    GoogleCall();
  }, []);

  return <h1>Test</h1>;
}
