import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useMobileDetect } from "@/hooks/use-mobile-detect";

export default function Resources() {
  const navigate = useNavigate();
  const isMobile = useMobileDetect();

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Theme Toggle */}
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      
      {/* Navigation */}
      <div className="flex items-center justify-start p-4 space-x-4">
        <button 
          className="px-3 py-1 text-sm rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => navigate('/')}
        >
          Back
        </button>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-black dark:text-white">
          Zasoby
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Documentation */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Dokumentacja</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Pełna dokumentacja naszego API i instrukcje integracji dla deweloperów.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Zobacz dokumentację →</a>
          </div>
          
          {/* Tutorials */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Poradniki</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Krok po kroku instrukcje jak stworzyć i wdrożyć własnego chatbota.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Zobacz poradniki →</a>
          </div>
          
          {/* Blog */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Blog</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Najnowsze wiadomości, aktualizacje i porady dotyczące AI i chatbotów.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Czytaj blog →</a>
          </div>
          
          {/* Community */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Społeczność</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Dołącz do naszej społeczności, aby uzyskać pomoc i dzielić się pomysłami.
            </p>
            <a href="#" className="text-blue-500 hover:underline">Dołącz do społeczności →</a>
          </div>
          
          {/* FAQ */}
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl p-6 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 text-black dark:text-white">Często zadawane pytania</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-black dark:text-white">Jak stworzyć własnego chatbota?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Możesz łatwo stworzyć chatbota korzystając z naszego intuicyjnego interfejsu. Wystarczy zarejestrować się, 
                  wybrać szablon i dostosować go do swoich potrzeb.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Czy mogę zintegrować chatbota z moją stroną?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Tak, oferujemy prosty kod do wklejenia, który pozwala na łatwą integrację z dowolną stroną internetową.
                </p>
              </div>
              <div>
                <h3 className="font-medium text-black dark:text-white">Jakie modele AI są wspierane?</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Wspieramy najnowsze modele od OpenAI, Anthropic, Google i innych wiodących dostawców AI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
