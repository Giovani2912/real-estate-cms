import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-50 flex-grow-0 border-t-2 ">
      <div className="py-10 md:flex md:items-center md:justify-between lg:mx-6">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} All Rights Reserved
          </p>
        </div>

        <div className="mt-4 flex items-center justify-center md:mt-0">
          <div className="flex space-x-8">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:text-gray-600"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
