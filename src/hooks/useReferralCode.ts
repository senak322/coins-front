import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useReferralCode() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const ref = params.get("ref");
    if (ref) {
      sessionStorage.setItem("referralCode", ref);
    }
  }, [location]);
}

export default useReferralCode;
