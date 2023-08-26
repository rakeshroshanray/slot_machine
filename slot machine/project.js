// 1. deposit money
// 2. determine no. of line to bet
// 3. collect the bet amount
// 4. spin
// 5. check the outcome
// 6. declear the result Amd money accordingly
// 7. play again


const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A : 3,
    B : 8,
    C : 4,
    D : 6,
};
const SYMBOL_VALUES = {
    A : 15,
    B : 10,
    C : 20,
    D : 10,
};

const deposit = () => {
    while (true){

        const depositAmount = prompt("Enter a deposit ammount: ");
        const numberDepositAmount = parseInt(depositAmount);
        if(isNaN(numberDepositAmount) || numberDepositAmount <=0){
            console.log("Invalid entry , try again");
        }
        else{
            return numberDepositAmount;
        }
    }
};

const getNumberOfLines = () => {

    while (true){

        const lines = prompt("Enter number of lines to bet(1-3): ");
        const numberOfLines = parseInt(lines);
        if(isNaN(numberOfLines) || numberOfLines <=0 || numberOfLines > 3){
            console.log("Invalid selection , try between '1-3");
        }
        else{
            return numberOfLines;
        }
    }
};

const getBet = (balanceAmount,lines) => {
    while (true){

        const bet = prompt("Enter the betAmount per line: ");
        const numberBet = parseInt(bet);
        if(isNaN(numberBet) || numberBet <=0 || numberBet > balanceAmount / lines){
            console.log("Invalid bet , try again");
        }
        else{
            return numberBet;
        }
    }
};

const spin = () => {

    const symbols = [];

    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){

        for(let i = 0; i<count; i++){
            symbols.push(symbol);
        }

    }

    const reels = [[],[],[]];
    
    for(let i = 0; i<COLS; i++){

        const reelSymbols = [...symbols];

        for(let j = 0; j<ROWS; j++){

            const randomIdx = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIdx];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIdx,1);
        }
    }
    return reels;

};

const transpose = (reels) => {

    const rows =[];

    for(let i = 0; i<ROWS; i++){
        rows.push([]);
        for(let j = 0; j<COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const printRows = (rows) => {

    for(const row of rows){

        let rowString = "";

        for(const [i,symbol] of row.entries()){

            rowString += symbol;

            if(i != row.length - 1){
                rowString += " | ";
            }

        }
        console.log(rowString);
    }
};

const getWinnings = (rows,bet,lines) => {
    let winnings = 0;

    for(let row = 0; row<lines; row++){

        const symbols = rows[row];
        let allSame = true; 

        for(const symbol of symbols){

            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame == true){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

const game = () => {
    
    let balanceAmount = deposit();

    while(true){

        console.log("You have a balnce of $ " + balanceAmount);

        const numberOfLines = getNumberOfLines();
        const bet = getBet(balanceAmount,numberOfLines);
        balanceAmount -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);

        const winnings = getWinnings(rows,bet,numberOfLines);
        balanceAmount += winnings;
        console.log("YOU WON : $ " + winnings);
        console.log("balance : $ " + balanceAmount);

        if(balanceAmount <= 0){
            console.log("You ran out of money!");
            break;
        }

        const playAgain = prompt("Do you want to play again (y/n)?");

        if(playAgain != "y"){
            console.log("Thank You for Playing !");
            break;
        }
         
    }

    
};

game();
