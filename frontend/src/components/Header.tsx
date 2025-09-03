import { LogOut, ShoppingCart, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
}

export default function Header({ title = "IKFome" }: HeaderProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="w-full fixed flex justify-between items-center bg-white shadow-sm p-4 mb-6">
      <div className="flex items-center gap-2">
        <img src="/ikfome.png" alt="IKFome Logo" className="h-8" />
        <h1 className="text-2xl font-bold text-yellow-500">{title}</h1>
      </div>
      <div className="flex items-center gap-6">
      <User className="cursor-pointer text-yellow-500" />
      <ShoppingCart className="cursor-pointer text-yellow-500" />
      <LogOut onClick={handleLogout} className="cursor-pointer text-red-500" />
      </div>
    </header>
  );
}
