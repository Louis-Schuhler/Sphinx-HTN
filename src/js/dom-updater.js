function getChallengeTemplate() {
  return `<div class="content">
              <p class="topTextBold" id='textQuestionOfTheDay'>Question of the day</p>
              <p class="topTextBold" id="textQuestion">What is the meaning of life?</p>
              <input class='textfieldAnswer' type='text' placeholder="Your answer">
          </div>
          <div class="bottomContent">
                  <button class="btnBottom" id="btnSubmit"><span id="btnBottomText">Submit</span></button>
          </div>
          `
}

function getVictoryTemplate() {
  return `<div class="content">
              <p class="topTextBold" id="textWin">You Won</p>
              <div id="winAmountDiv">
                  <img src="images/ether.png" class="imgEther"> <span class="topTextBold" id="textAmountWon"> <span class="amount-won">0</span> Ethereum </span> <img src="images/ether.png" class="imgEther">
              </div>
          </div>
          <div class="bottomContent" id="victory-bottom-content">
              <button class="btnBottom" id="btnHome"><span id="btnBottomText">Home</span></button>
          </div>
         `
}

function getHomeTemplate() {
  return  `<div class="content">
              <p class="topTextBold">Solve the new Sphinx</p>
              <p class="topTextBold" id="topTextSecondLine">puzzle from</p>
              <p class="topTextBold" id="topTextBigger">Today</p>
              <p id="textPrize">The Prize Pool is <img src="images/ether.png" class="imgEther"> <span id="textEther"></span></p>
              <p></p>

          </div>

          <div class="bottomContent">
              <p id="textTerms">The cost of entry is 1 Ethereum. By entering you agree to our
                <span id="textTermsWhite">terms and services</p>
                <button class="btnBottom"><span id="btnBottomText">Get In</span></button>
            </div>
          `
}

function swapInHome() {
  const container = document.getElementById("content-wrapper");
  container.innerHTML= getHomeTemplate();
}

function swapInChallenge() {
  const container = document.getElementById("content-wrapper");
  container.innerHTML= getChallengeTemplate();
}

function swapInVictory() {
  const container = document.getElementById("content-wrapper");
  container.innerHTML = getVictoryTemplate();
}

function indicateError() {
  const buttonText = document.getElementById("btnBottomText");
  const tmp = buttonText.innerText;

  buttonText.innerText = `Wrong !`;
  setTimeout(() => buttonText.innerText = tmp, 2000)
}
