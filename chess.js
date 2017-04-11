/*
 * Test written by Richard Merry (07:56 11/04/2017)
 * Made on Node v.6.8.1
 *
 * Usage: node chess.js <encoding>
 * Example: node chess.js r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1
 *
 */

function printUsage() {
  console.log('USAGE: node chess <encoding>\n');
  console.log('\t<encoding>\t\t-\tA valid chess board possiton encoding');
  // Exit code here
}

function printErrorMsg(msg) {
  console.log(`Error: ${msg}`);
  process.exit(1);
}

function printChessBoard(encoding) {
  const rows = encoding.split('/')

  if (rows.length !== 8) {
    printErrorMsg('Wrong number of rows');
  }

  let chessBoard = ''

  // Loop through rows
  rows.forEach((row, rowNum) => {
    let expectedLength = 8;
    let length = 0;

    // Loop through string
    for (let i = 0; i < row.length; ++i) {
      const c = row.charAt(i);

      if (expectedLength < 1) {
        printErrorMsg(`Wrong number of squares on row ${rowNum}`);
      }

      if (isNaN(parseInt(c))) { // Chess piece
        if (/[rnbqkpRNBQKP]/.exec(c) === null) {
          printErrorMsg(`Invalid character encounterd: ${c}`);
        }

        chessBoard += c
      } else { // Number
        const run = parseInt(c);

        if (run > 8 || run < 1) {
          printErrorMsg('Run length must be between 1 and 8');
        }
        expectedLength -= run;
        chessBoard += Array(run).join('.')
      }
    }

    chessBoard += '\n';
  });

  console.log(chessBoard);
}

if (process.argc < 2) {
  printUsage();
  process.exit(1);
}

let chessBoardEncoding = process.argv[2];
printChessBoard(chessBoardEncoding);


