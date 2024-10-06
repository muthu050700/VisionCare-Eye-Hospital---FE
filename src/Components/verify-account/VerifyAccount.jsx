import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { verifyAccountApi } from "../APIs/apis";

const VerifyAccount = () => {
  const [params] = useSearchParams();

  const [loading, setLoading] = useState(false);

  const verifyAccount = async () => {
    const res = await verifyAccountApi(params.get("token"));

    alert(res.msg);
  };

  useEffect(() => {
    setLoading(true);
    verifyAccount();
    setLoading(false);
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return "";
};

export default VerifyAccount;
