export function UploadRoleGuard ({ children }) {
  const userRole = localStorage.getItem("role");
  if (userRole === "PARTICIPANT") {
    return children;
  } else {
    return <div>Access Denied</div>;
  }
}