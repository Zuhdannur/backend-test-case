function reverseString(str) {
  return str.split('').reverse().join('');
}
function findLongestWord(sentence) {
  const words = sentence.split(' ');
  let longestWord = '';

  for (const word of words) {
    if (word.length > longestWord.length) {
      longestWord = word;
    }
  }

  return longestWord;
}
function calculateDiagonalSums(matrix) {
  let diagonal1Sum = 0;
  let diagonal2Sum = 0;
  const n = matrix.length;

  for (let i = 0; i < n; i++) {
    diagonal1Sum += matrix[i][i];
    diagonal2Sum += matrix[i][n - 1 - i];
  }

  return {
    diagonal1Sum,
    diagonal2Sum,
  };
}

console.log('soal nomor 1');
const input1 = 'NEGIE1';
console.log(`from string ${input1} reversed to :${reverseString(input1)}`);

console.log('soal nomor 2');
const sentence = 'Saya sangat senang mengerjakan soal algoritma';
const longestWord = findLongestWord(sentence);
console.log(`mengerjakan: ${longestWord.length} character`);

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];
const matchQuery = QUERY.map((query: string) => {
  return INPUT.filter((input: string) => input === query).length;
});
let message = `OUTPUT [${matchQuery.join(',')}] karena `;
QUERY.forEach(
  (input: string, index: number) => {
  const counted = matchQuery[index];
  if (counted === 0)
    message += `kata '${input}' tidak ada pada INPUT${index !== QUERY.length - 1 ? ',' : ''}`;
  else
    message += `kata '${input}' terdapat ${counted} pada INPUT${index !== QUERY.length - 1 ? ',' : ''}`;
});
console.log('soal nomor 3');
console.log(message);

const matrix = [
  [1, 2, 0],
  [4, 5, 6],
  [7, 8, 9],
];

const { diagonal1Sum, diagonal2Sum } = calculateDiagonalSums(matrix);

console.log(`Diagonal pertama = ${diagonal1Sum}`);
console.log(`Diagonal kedua = ${diagonal2Sum}`);
console.log(`maka hasilnya adalah ${diagonal1Sum} - ${diagonal2Sum} = ${(diagonal1Sum - diagonal2Sum)}`)
