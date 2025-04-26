import { useState, useEffect } from "react";
import { access_token } from "../config";

const useFetchData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${access_token}` },
        });

        const text = await res.text(); //  ناخد الرد كنص 

        let result;

        try {
          result = JSON.parse(text);  //  نحوله لـ JSON
        } catch (jsonErr) {
          console.error("❌ Failed to parse JSON. Raw response:", text);
          throw new Error("الرد من السيرفر مش بصيغة JSON صحيحة.");
        }

        if (!res.ok) {
          throw new Error(result.message || "حدث خطأ غير معروف");
        }

        setData(result.data);
        setLoading(false);
      } catch (err) {
        console.error("❌ Fetch Error:", err);
        setLoading(false);
        setError(err.message);
      }
    };

    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
  };
};

export default useFetchData;
