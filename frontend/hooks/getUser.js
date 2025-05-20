// // hooks/useUser.js
// import { useEffect, useState } from "react";
// import { getUser } from "../utils/api.js"; // Assuming your API logic is here

// export const useUser = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getUser(); // API.get("/auth/me")
//         setUser(res.data);
//       } catch (err) {
//         console.error("Failed to fetch user", err);
//       }
//     };

//     fetchUser();
//   }, []);

//   return user;
// };

import { useEffect, useState } from "react";
import { getUser } from "../utils/api"; // Adjust path if needed

export const useUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);  // optional: expose loading
  const [error, setError] = useState(null);      // optional: expose error if needed

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await getUser();
        if (isMounted && res?.data?.loggedIn) {
          setUser(res.data.user);
        } else {
          setUser(null); // token exists but user not logged in
        }
      } catch (err) {
        if (isMounted) {
          setUser(null);
          setError("Could not fetch user"); // Don't expose full error stack
          // Log quietly (optional): send to monitoring tools instead
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading, error }; // You now get clean access to all states
};
