import { useRouter } from "next/router";
import Link from "next/link";

const ActiveLink = ({ href, children }) => {
  const router = useRouter();

  // Check if the current route matches the link's href
  const isActive = router.pathname === href;

  // Define the class names based on isActive
  const className = isActive  ? "active" : "";

  return (
    <Link
      href={href}
      className={` ${className} text-[18px]`}>
      {children}
    </Link>
  );
};


export const UserActiveLink = ({ href, children }) => {
  const router = useRouter();

  // Check if the current route matches the link's href
  const isActive = router.pathname === href;

  // Define the class names based on isActive
  const className = isActive ? "activeuser" : "";

  return (
    <Link href={href} className={` ${className} text-[18px] activeuserhover flex items-center gap-2`}>
      {children}
    </Link>
  );
};


export default ActiveLink;
