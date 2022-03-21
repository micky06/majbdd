// import './App.css';

// function App() {
//   return (
//     <div className="App">
//      hello
//     </div>
//   );
// }

// export default App;
// import { useEffect, useRef, useState } from "react";
// const reader = require("xlsx");
// import "./App.css";

// export default function App() {
//   const [htmlData, setHtmlData] = useState("");
//   const [resultat, setResultat] = useState("");

//   const inputref = useRef();
//   const containerRef = useRef();
//   let parsedData = [];

//   const handleOnChange = async (e) => {
//     e.preventDefault();

//     // console.log(e.target.files[0]);

//     const reader = new FileReader();

//     reader.onload = (e) => {
//       // var data = new Uint8Array(e.target.result);
//       var data = e.target.result;
//       var workbook = XLSX.read(data, { type: "array" });
//       const name = workbook.SheetNames[4];
//       const workSheet = workbook.Sheets[name];

//       parsedData = XLSX.utils.sheet_to_json(workSheet, {
//         header: 1
//       });
//       reader.readAsArrayBuffer(e.target.files[0]);

//       setResultat((preResultat) => parsedData);

//       // setHtmlData(htmlStr);

//       // const parsedData = XLSX.utils.sheet_(workSheet);
//     };
//     // console.log(resultat);
//     for (let i of parsedData) {
//       console.log(parsedData);
//     }
//   };

//   useEffect(() => {
//     if (!containerRef) return;

//     containerRef.current.innerHTML = htmlData;
//   }, [htmlData]);

//   return (
//     <>
//       <input type="file" ref={inputref} onChange={handleOnChange} />
//       <div className="table-container" ref={containerRef}></div>
//     </>
//   );
// }

// Requiring the module
const reader = require('xlsx')
  
// Reading our test file
const file = reader.readFile('../Test.xlsx')
  
let data = []
  
const sheets = file.SheetNames
  
// for(let i = 0; i < sheets.length; i++)
// {
   const temp = reader.utils.sheet_to_json(
        file.Sheets[file.SheetNames[4]])
   temp.forEach((res) => {
      data.push(res)
   })
// }
  
// Printing data
console.log(data)