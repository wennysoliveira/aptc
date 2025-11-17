const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(process.cwd(), 'data', 'associados.json');

console.log('Arquivo existe:', fs.existsSync(DATA_FILE));
console.log('Caminho do arquivo:', DATA_FILE);

if (fs.existsSync(DATA_FILE)) {
  const data = fs.readFileSync(DATA_FILE, 'utf8');
  const parsed = JSON.parse(data);
  console.log('Dados do arquivo:', parsed.length, 'associados');
  console.log('Primeiro associado:', parsed[0]?.nome);
}
