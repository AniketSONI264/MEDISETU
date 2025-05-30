
// import { useEffect, useState } from "react";
// import { getUser } from "../utils/api"; // Adjust path if needed

// export const useUser = () => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);  // optional: expose loading
//   const [error, setError] = useState(null);      // optional: expose error if needed

//   useEffect(() => {
//     let isMounted = true;

//     const fetchUser = async () => {
//       try {
//         const res = await getUser();
//         if (isMounted && res?.data?.loggedIn) {
//           setUser(res.data.user);
//         } else {
//           setUser(null); 
//         }
//       } catch (err) {
//         if (isMounted) {
//           setUser(null);
//           setError("Could not fetch user"); 
//         }
//       } finally {
//         if (isMounted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchUser();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return { user, loading, error }; 
// };



import { useEffect, useState } from "react";
import { getUser } from "../utils/api";

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await getUser();
        if (isMounted && res?.data?.user) {
          setUser(res.data.user);
        } else {
          setUser(null);
        }
      } catch (err) {
        if (isMounted) {
          console.error("Fetch User Error:", err);
          setError("Could not fetch user");
          setUser(null);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();
    return () => { isMounted = false };
  }, []);

  return { user, loading, error };
};
