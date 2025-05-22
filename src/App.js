import { createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import PhoneticApp from "./components/phonetics/PhoneticApp";
import PronunciationApp from "./components/pronunciation/PronunciationApp";
import Home from "./components/Home";
import Footer from "./components/Footer";
import Error from "./components/Error";
import WordPuzzleGame from "./components/wordpuzzle/WordPuzzleGame";
import StoryReader from "./components/storyreader/StoryReader";

const App =()=> {

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 to-yellow-50">
      <Header />
      <main className="flex-grow px-4 sm:px-8 max-w-5xl mx-auto w-full">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
}

export const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Error />,
    children: [
      { 
        path: '/',
        element: <Home/> 
      },
      { 
        path: '/pronounce', 
        element: <PronunciationApp/> 
      },
      { 
        path: '/phonetics', 
        element: <PhoneticApp/> 
      },
      {
        path:'/wordpuzzle',
        element:<WordPuzzleGame/>
      },
      {
        path:'/stories',
        element:<StoryReader/>
      }
    ]
  }
]);

export default App;

