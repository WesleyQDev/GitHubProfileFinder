import axios from "axios";
import { useState } from "react";

export default function App() {
  const [user, setUser] = useState({});
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGithubUser = (username) => {
    if (username.trim() === "") return;

    setLoading(true);
    axios
      .get(`https://api.github.com/users/${username}`, {
        headers: {
          "User-Agent": "request",
        },
      })
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser({});
      })
      .finally(() => {
        setLoading(false);
        console.log("Request completed");
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      fetchGithubUser(inputText);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            GitHub Profile Finder
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Pesquise usuários do GitHub facilmente
          </p>
        </div>

        {/* Campo de busca */}
        <div className="bg-white shadow-sm rounded-lg p-4 mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nome de usuário
          </label>
          <div className="flex">
            <input
              type="text"
              id="nickname"
              className="flex-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-800 focus:border-blue-800"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite um username do GitHub"
              required
            />
            <button
              onClick={() => fetchGithubUser(inputText)}
              className="ml-2 bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 rounded-lg"
            >
              Buscar
            </button>
          </div>
          {inputText.trim() && !loading && !user.login && (
            <p className="mt-2 text-sm text-gray-500">
              Pressione Enter ou clique em Buscar
            </p>
          )}
        </div>

        {/* Área de resultado */}
        {loading ? (
          <div className="bg-white shadow-sm rounded-lg p-8 text-center">
            <div className="inline-block h-8 w-8 border-4 border-gray-200 border-t-blue-800 rounded-full animate-spin"></div>
            <p className="mt-2 text-gray-700">Carregando informações...</p>
          </div>
        ) : user.login ? (
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <div className="h-2 bg-blue-800"></div>
            <div className="md:flex">
              <div className="md:w-1/3 bg-gray-50">
                <img
                  src={user.avatar_url}
                  className="w-full object-cover"
                  alt={`${user.login} avatar`}
                />
                <div className="p-4 border-t border-gray-100">
                  <div className="font-medium text-gray-800">@{user.login}</div>
                  {user.name && (
                    <div className="text-sm text-gray-600">{user.name}</div>
                  )}
                </div>
              </div>

              <div className="p-6 md:w-2/3">
                <div className="mb-4 pb-4 border-b border-gray-100">
                  {user.location && (
                    <div className="flex items-center mb-2 text-sm text-gray-600">
                      <svg
                        className="h-4 w-4 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"></path>
                      </svg>
                      {user.location}
                    </div>
                  )}

                  <p className="text-gray-700">
                    {user.bio || "Nenhuma biografia disponível"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-medium text-blue-800">
                      {user.followers}
                    </div>
                    <div className="text-sm text-gray-600">Seguidores</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-medium text-blue-800">
                      {user.following}
                    </div>
                    <div className="text-sm text-gray-600">Seguindo</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-medium text-blue-800">
                      {user.public_repos}
                    </div>
                    <div className="text-sm text-gray-600">Repositórios</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="text-lg font-medium text-blue-800">
                      {new Date(user.created_at).toLocaleDateString("pt-BR", {
                        year: "numeric",
                      })}
                    </div>
                    <div className="text-sm text-gray-600">Membro desde</div>
                  </div>
                </div>

                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Ver Perfil no GitHub
                </a>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Footer com informações do criador e propósito */}
      <footer className="mt-12 text-center max-w-2xl mx-auto">
        <div className="border-t border-gray-200 pt-6 pb-4">
          <a
            href="https://github.com/WesleyQDev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-800 hover:text-blue-900 font-medium"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            WesleyQDev
          </a>
          <p className="mt-3 text-gray-500 text-sm">
            Este projeto foi desenvolvido com o propósito de aprender a utilizar
            o Axios para fazer requisições a APIs externas.
          </p>
          <p className="mt-2 text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} • WesleyQDev
          </p>
        </div>
      </footer>
    </div>
  );
}
