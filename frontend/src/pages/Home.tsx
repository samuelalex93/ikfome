import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Star } from "lucide-react";
import Conteiner from "../components/Conteiner";
import { getRestaurants } from "../services/api";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getRestaurants();
      setRestaurants(data);
    }
    fetchData();
  }, []);

  const filtered = restaurants.filter((r: any) =>
    r.name.toLowerCase().includes(query.toLowerCase())
  );
  return (
    <>
      <Conteiner>
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
                filtered.map((res: any) => (
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
                        <span className="text-sm text-gray-700">
                          {res.rating}
                        </span>
                      </div>
                      <p className="text-purple-600 font-bold">{res.price}</p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500">
                  Nenhum resultado encontrado para <b>{query}</b>
                </p>
              )
            ) : (
              <p className="text-gray-500">Digite algo para buscar 🍔🍕</p>
            )}
          </div>
        </div>
      </Conteiner>
    </>
  );
}
