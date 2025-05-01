import Home from "./pages/Home";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-600 text-white py-4 shadow-md">
        {/* <h1 className="text-3xl font-bold text-center">🌍 WorldWhiz</h1> */}
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
};

export default App;