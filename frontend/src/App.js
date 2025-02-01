import { Route, Routes } from 'react-router-dom';
import FAQForm from "./comp/home";
import FAQGet from "./comp/get";

function App() {

  return (
    <div className='App h-lvh bg-[url("https://i.pinimg.com/564x/99/45/1e/99451ea69bb1c4991db0c0ebca045b55.jpg")] bg-center bg-cover bg-no-repeat'>
      <div className='sm:px-4 md:px-8 sm:py-2 lg:px-16 xl:px-32 2xl:px-64'>
        <Routes>
        <Route path="/" element={<FAQForm />} />
        <Route path="/faqs" element={<FAQGet />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
