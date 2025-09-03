import { useState } from "react";
import { LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Conteiner from "../components/Conteiner";
import { login } from "../services/api";
import Spinner from "../components/Spinner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Preencha email e senha!");
      return;
    }

    try {
      const data = await login(email, password);
      setIsLoading(true);
      if (!data) {
        throw new Error("Erro ao fazer login");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        navigate("/home");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Email ou senha inválidos");
      setIsLoading(false);
    }
  };

  return (
    <Conteiner>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : (
        <div>
          <h1 className="flex items-center gap-2 mb-6">
            <img src="/ikfome.png" alt="IKFome Logo" className="h-8" />
            <h1 className="text-2xl font-bold text-yellow-500">IKFome</h1>
          </h1>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 cursor-pointer bg-yellow-600 text-white rounded-xl p-3 hover:bg-yellow-700 transition"
            >
              <LogIn size={18} /> Entrar
            </button>
          </form>
        </div>
      )}
    </Conteiner>
  );
}
