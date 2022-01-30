import "./App.css";
import CustomCssConponent from "./components/TailwindComponents/CustomCssConponent";
import DemoGrid from "./components/TailwindComponents/DemoGrid";
import FlexDemo from "./components/TailwindComponents/FlexDemo";
import PaddingMarginDemo from "./components/TailwindComponents/PaddingMarginDemo";
import WidthHeightDemo from "./components/TailwindComponents/WidthHeightDemo";

function App() {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <button className="rounded-2xl bg-green-400 text-white p-5 w-40 h-40">
        Hello cybersoft
      </button>
      <p className="text-5xl  bg-red-800 text-green-100">cyberlearn frontend</p>
      {/* <DemoGrid />
      <PaddingMarginDemo />
      <WidthHeightDemo /> */}
      <FlexDemo />
      <div className="container mt-5">
        <button className="sm:bg-red-400 md:bg-green-400 lg:bg-blue-400 bg-blue-100 p-5">
          Hello
        </button>
      </div>
      <CustomCssConponent />
    </div>
  );
}

export default App;
