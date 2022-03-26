const XLSX = require('xlsx');
const sqlite3 = require('sqlite3').verbose();

const dbName = 'suivi_prod.db';

const maj = [];
let items = [];

const readExcel = (file) => {
	const xlsFile = XLSX.readFile(file);
	const tab = xlsFile.SheetNames;
	const affectation = tab.filter(s => s === 'Affectation_Parc');
	let one = affectation.length === 1 ? affectation.join('') : undefined;
	if (one) {
		const excelSheet = xlsFile.Sheets[one];
		items = XLSX.utils.sheet_to_json(excelSheet);
		return items.map(row => {
			return jsonToObject(row);
		})
	} else {
		throw new Error("Il n'existe pas de de table : Affectation_Parc");
	}
}

const rames = readExcel('./Test.xlsx');

const db = new sqlite3.Database('./suivi_prod.db');

db.serialize(() => {
	db.run('DROP TABLE IF EXISTS gerance');
});

db.serialize(() => {
	db.run(`
		CREATE TABLE IF NOT EXISTS gerance (
			id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
			rame INTEGER,
			a VARCHAR(6),
			b VARCHAR(6),
			c VARCHAR(6),
			d VARCHAR(6),
			annee INTEGER(4))`)
});

db.serialize(() => {
	/*
	let placeholders = languages.map((language) => '(?)').join(',');
	let sql = 'INSERT INTO langs(name) VALUES ' + placeholders;
	 */
	const rameSql = rames.map(r => {
		if (r.rame === undefined) {
			console.log(r);
		}
		return `(${r.rame},${r.PeriodA}, ${r.PeriodB}, ${r.PeriodC}, ${r.PeriodD}, ${new Date().getFullYear()})`
	})
	console.log(rameSql)
	// rames.forEach(r => {
	// 	`INSERT INTO gerance (rame,a,b,c,d,annee) VALUES (${r.rame},${r.PeriodA}, ${r.PeriodB}, ${r.PeriodC}, ${r.PeriodD}, ${new Date().getFullYear()})`
	// })
})

function jsonToObject(row) {
	const obj = {};
	obj.rame = row["N° Rame"] ?? 0
	obj.PeriodA = row["Axe Période A année en cours"] ?? ""
	obj.PeriodB = row["Axe Période B année en cours"] ?? ""
	obj.PeriodC = row["Axe Période C année en cours"] ?? ""
	obj.PeriodD = row["Axe Période D année en cours"] ?? ""
	if (obj.PeriodA || obj.PeriodB || obj.PeriodC || obj.PeriodD) {
		return obj;
	}
}
