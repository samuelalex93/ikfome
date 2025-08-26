import { useState } from "react";
import { motion } from "framer-motion";
import { Search, UtensilsCrossed, LogIn, Star } from "lucide-react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [query, setQuery] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
    }
  };

  const mockResults = [
    { id: 1, name: "Pizza da Casa", type: "Restaurante", rating: 4.5, price: "R$ 40,00", image: "https://source.unsplash.com/400x250/?pizza" },
    { id: 2, name: "Hambúrguer Artesanal", type: "Produto", rating: 4.8, price: "R$ 29,90", image: "https://source.unsplash.com/400x250/?burger" },
    { id: 3, name: "Sushi Express", type: "Restaurante", rating: 4.2, price: "R$ 55,00", image: "https://source.unsplash.com/400x250/?sushi" },
  ];

  const filtered = mockResults.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-purple-200 p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6"
      >
        {!isLoggedIn ? (
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <UtensilsCrossed className="text-purple-600" /> IKFome
            </h1>
            <form onSubmit={handleLogin} className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="password"
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-purple-600 text-white rounded-xl p-3 hover:bg-purple-700 transition"
              >
                <LogIn size={18} /> Entrar
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2 mb-6">
              <Search className="text-yellow-500" /> Buscar Restaurantes
            </h1>
            <input
              type="text"
              placeholder="Digite o nome do produto ou restaurante..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 mb-6"
            />

            <div className="space-y-4">
              {query ? (
                filtered.length > 0 ? (
                  filtered.map((res) => (
                    <motion.div
                      key={res.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex items-center gap-4 border rounded-xl p-3 shadow-sm hover:shadow-md transition"
                    >
                      <img
                        src={res.image}
                        alt={res.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h2 className="font-semibold text-lg">{res.name}</h2>
                        <p className="text-sm text-gray-500">{res.type}</p>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star size={14} />
                          <span className="text-sm text-gray-700">{res.rating}</span>
                        </div>
                        <p className="text-purple-600 font-bold">{res.price}</p>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhum resultado encontrado para <b>{query}</b></p>
                )
              ) : (
                <p className="text-gray-500">Digite algo para buscar 🍔🍕</p>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
