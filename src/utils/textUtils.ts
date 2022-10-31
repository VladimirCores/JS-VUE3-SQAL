import { utilMathRandomRange } from '@/utils/mathUtils';

export const utilRandomText = (wordMaxLength: number, workMinLenght = 0, words = 1) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
  const numberOfLetters = letters.length;
  const output = new Array(words);
  const word: string[] = [];
  let length = 0;
  while (words-- > 0) {
    length = utilMathRandomRange(wordMaxLength, workMinLenght);
    word.length = length;
    while (length--) word[length] = letters[(Math.random() * numberOfLetters) | 0];
    output[words] = word.join('');
  }
  return output.join(' ');
};
