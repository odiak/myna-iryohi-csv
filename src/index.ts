import fs from 'fs/promises';
import { parse, stringify } from 'csv';

async function main() {
  const [file] = process.argv.slice(2);
  if (file === undefined) {
    console.error('File is not specified');
    process.exit(1);
  }
  const raw = await fs.readFile(file, 'utf-8');

  const rows: [[string, string]] = await new Promise((resolve) => {
    parse(
      raw,
      { fromLine: 31, columns: false, relaxColumnCount: true },
      (err, rows) => {
        resolve(rows);
      }
    );
  });

  const items: Array<{ type: string; name: string; amount: string }> = [];
  let type = '';
  let name = '';
  let amount = '';
  for (const [key, value] of rows) {
    switch (key) {
      case '診療区分': {
        type = value;
        break;
      }
      case '医療機関等名称': {
        name = value;
        break;
      }
      case '窓口相当負担額（円）': {
        amount = value.replace(/,/g, '');
        items.push({ type, name, amount });
        break;
      }
    }
  }

  const out = items.map(({ type, name, amount }) => [
    name,
    type === '医科外来' ? '○' : '',
    type === '調剤' ? '○' : '',
    '',
    '',
    amount,
    '0',
  ]);

  stringify(out, (err, data) => {
    process.stdout.write(data);
  });
}
main();
