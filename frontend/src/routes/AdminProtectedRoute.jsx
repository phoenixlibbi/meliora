// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useAdminAuth } from "../hooks/useAdminAuth";

// export default function AdminProtectedRoute({ children }) {
//   const { isAdmin } = useAdminAuth();

//   if (!isAdmin) {
//     return <Navigate to='/admin' />;
//   }

//   return children;
// }

import React from "react";

export default function AdminProtectedRoute() {
  return <div>AdminProtectedRoute</div>;
}
