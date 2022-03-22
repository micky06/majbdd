import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import sqlite3 from 'sqlite3';

function App() {
   
   const dbName = 'suivi_prod.db';
   const maj = [];
   const [items, setItems] = useState([]);
   const obj = {
      rame: '',
      PeriodA: '',
      PeriodB: '',
      PeriodC: '',
      PeriodD: '',
   }
   const readExcel = (file) => {

      const promise = new Promise((res, rej) => {

         const fileReader = new FileReader();
         fileReader.readAsArrayBuffer(file)
         fileReader.onload = (e) => {
            const bufferArray = e.target.result;

            let wsname = '';
            const wb = XLSX.read(bufferArray, { type: 'buffer' });
            for (let i = 0; i < wb.SheetNames.length; i++) {
               wsname = wb.SheetNames[i];
               if (wsname === "Affectation_Parc") {
                  console.log(`l'onglet est en position : ${i}`);
                  const ws = wb.Sheets[wsname];
                  const data = XLSX.utils.sheet_to_json(ws);

                  res(data);
               }

            }
         };

         fileReader.onerror = (error) => {
            rej(error);
         };
      });

      promise.then((d) => {
         setItems(d);

      });
   }

   // let db = new sqlite3.Database(dbName, err => {

   //    if(err)
   //       throw err
      
   //    console.log(`Database ${dbName} connected`);
   // });

   items.map((line)=>{
      obj.rame = line["N° Rame"]
      obj.PeriodA = line["Axe Période A année en cours"]
      obj.PeriodB = line["Axe Période B année en cours"]
      obj.PeriodC = line["Axe Période C année en cours"]
      obj.PeriodD = line["Axe Période D année en cours"]
      
      maj.push(obj)
      console.log(maj);
   })
   return (
      <div>
         <input type='file' onChange={(e) => {
            const file = e.target.files[0];
            readExcel(file);
         }}
         />

      </div>
   )




}

export default App;