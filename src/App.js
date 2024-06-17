import React from "react";
import Homepage from "./components/Homepage";

function App() {
  return (
    <div className="flex">
      <div className="flex flex-col flex-grow">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
