"use client";
import { useRouter } from 'next/navigation'
import { Button } from './ui/button';

interface ButtonMenuNavigationProps {
    title: string;
    search: string;
}   

const ButtonMenuNavigation = ({title, search}: ButtonMenuNavigationProps) => {
  const router = useRouter()

  const handleClick = () => {
    // Adiciona a string `?search=banana` à URL
    router.push(`${search}`)
  }

  return (
    <Button
        onClick={handleClick}
        variant={"ghost"}
    >
        {title}
    </Button>
  );
};

export default ButtonMenuNavigation;
