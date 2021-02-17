const SETTINGS = {
    numPlayers: 2,
    makeQuestionToDraw: false,
    // makeQuestionToDraw: true,
    cardCharacters: [
        'X',
        'O',
        'Y',
        '@',
        '■',
        '┼',
        '®',
        '#',
        '$',
        '&'
    ],
    playersData: [],
    maySeparatorSymbol: '______________________________________________________________',
    lowSeparatorSymbol: '..............................................................',
    lowSeparatorSymbol2: '¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯¯'
}

function chainTime() {
    // Start text
    console.log(`WELCOME TO THE WK'S CHAIN CARD GAME`);
    console.log(SETTINGS.lowSeparatorSymbol2);
    console.log('Draw the higher number of cards with different symbols to win');
    console.log('Press Enter to DRAW!!');

    // Main game flow
    for (let i = 0; i < SETTINGS.numPlayers; i++) {
        // Initialize players data structures
        SETTINGS.playersData[i] = {
            'id': i + 1,
            'cards': [],
            'score': undefined
        };

        // Player main flow
        playerTurn(i);
    }

    gameOver();
}

function playerTurn(playerId) {
    // Start player turn text
    console.log(SETTINGS.maySeparatorSymbol);
    console.log(`It's the player ${playerId + 1} turn`);

    // Initialize player turn values
    let continueGame = true;
    let continueGameQuestion = true;
    let chainNum = 0;

    // Draw cards until some player draw a duplicate
    do {
        // Get the number to generate card and check game state
        const randomNum = randomNumGenerator(SETTINGS.cardCharacters.length);

        // Normal turn flow
        drawCard(playerId, randomNum);
        continueGame = checkGameState(playerId, randomNum);
        chainNum++;

        // Question mode
        if (SETTINGS.makeQuestionToDraw && continueGame) {
            const continueGameQuestionPrompt = prompt("Do you want draw other card? y/n");
            continueGameQuestion = (continueGameQuestionPrompt === 'n' || continueGameQuestionPrompt === 'N') ? false : true;

            // Add +1 to compensate the next -1
            if (!continueGameQuestion) chainNum++;
        }

        if (SETTINGS.makeQuestionToDraw && !continueGame) {
            chainNum = 1;
            console.log('Game Over, you lose all the points');
        }

    } while (continueGame && continueGameQuestion)

    // End of the turn
    console.log(`The player ${playerId + 1} has scored ${chainNum - 1} points with ${chainNum - 1} different card(s)`);
    SETTINGS.playersData[playerId].score = chainNum - 1;
}

function drawCard(playerId, randomNum) {
    prompt("DRAAAAW!");

    // Generate the new card
    printCard(SETTINGS.cardCharacters[randomNum]);
}

function checkGameState(playerId, randomNum) {
    // Evaluate is the new element is in array
    const isDuplicate = !SETTINGS.playersData[playerId].cards.includes(randomNum);

    // Add the new element after determinate duplicate
    SETTINGS.playersData[playerId].cards.push(randomNum);

    return isDuplicate;
}

function printCard(cardCharacter) {
    // Draw the card by console
    console.log('_____');
    console.log(`| ${cardCharacter} |`);
    console.log('¯¯¯¯¯');
}

function gameOver() {
    // Print game over texts
    console.log(SETTINGS.maySeparatorSymbol);
    console.log('GAME OVER - FINAL SCORE \n');

    // Set values to define winner
    let highScore = SETTINGS.playersData[0].score;
    let winner = SETTINGS.playersData[0].id;

    for (let i = 0; i < SETTINGS.numPlayers; i++) {
        // Print individual scores
        console.log(`Player ${SETTINGS.playersData[i].id}: ${SETTINGS.playersData[i].score}`);

        if (SETTINGS.playersData[i].score > highScore) {
            highScore = SETTINGS.playersData[i].score;
            winner = SETTINGS.playersData[i].id;
        }
    }

    console.log(SETTINGS.lowSeparatorSymbol2);
    if (checkTie(highScore)) {
        console.log(`IT'S A TIE WITH ${highScore} POINTS`);
    } else {
        console.log(`THE WINNER IS THE PLAYER ${winner} WITH ${highScore} POINT(S)`);
    }
}

function randomNumGenerator(max) {
    return Math.floor(Math.random() * max);
}

function checkTie(highScore) {
    // Check if there are at least 2 winners, so it will be a tie
    let highScoreCounter = 0;

    for (let i = 0; i < SETTINGS.numPlayers; i++) {
        if (SETTINGS.playersData[i].score === highScore) highScoreCounter++;
    }

    if (highScoreCounter > 1) {
        return true;
    } else {
        return false;
    }
}

chainTime();

// Chain
// Higher
// Duplicate