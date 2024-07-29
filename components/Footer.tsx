import Link from "next/link";

const Footer = () => {
  return (
    <footer className='fixed flex justify-center items-center bottom-4 w-full h-10 z-20'>
      <Link className="border bg-slate-200 px-5 py-2 rounded-full shadow-md flex justify-center items-center w-auto" href='/'>
        Home
      </Link>
    </footer>
  );
}
 
export default Footer;