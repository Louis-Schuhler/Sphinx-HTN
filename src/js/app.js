App = {
  web3Provider: null,
  contracts: {},

  init: function() {
    // Load questioin

    return App.initWeb3();
  },

  initWeb3: function() {
    // Is there an injected web3 instance?
    if (typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
    } else {
      // If no injected web3 instance is detected, fall back to Ganache
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);
    return App.initContract();
  },

  initContract: function() {
    $.getJSON('Game.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var GameArtifact = data;
      App.contracts.Game = TruffleContract(GameArtifact);

      // Set the provider for our contract
      App.contracts.Game.setProvider(App.web3Provider);
      App.getAward();
    });
    return App.bindEvents();
  },


  bindEvents: function() {
    $(document).on('click', '.btn-register', App.handleRegister);
    $(document).on('click', '#btnSubmit', App.submit);
    $(document).on('click', '#btnHome', App.getHome);
  },

  getHome: function(event) {
    if (typeof event !== "undefined") event.preventDefault();
    swapInHome()
  },

  getAward: function() {
    var gameInstance;

    // Once the contract instance is deployed...
    App.contracts.Game.deployed().then(function(instance) {
      gameInstance = instance;
      // Call the function that will retrieve the adopters for us.
      return gameInstance.getAward.call();
    }).then(function(award) {
      console.log(award);
      $("#textEther").text(award.c[0]/10000.0)
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  getEntryFee: function() {
    var gameInstance;

    // Once the contract instance is deployed...
    return App.contracts.Game.deployed().then(function(instance) {
      gameInstance = instance;
      // Call the function that will retrieve the adopters for us.
      return gameInstance.getEntryFee.call();
    }).catch(function(err) {
      console.log(err.message);
    });
  },

  handleRegister: function(event) {
    if (typeof event !== "undefined") event.preventDefault();
    var gameInstance;

    // Retrieve the active account (the adopter's address) for the web3 instance.
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }

      // Select the first element because `accounts` returns as an array.
      var account = accounts[0];

      // Retrieve the deployed contract instance...
      App.contracts.Game.deployed().then(function(instance) {
        gameInstance = instance;

        // Execute adopt as a transaction by sending account
        return App.getEntryFee()

      }).then(function(entryFee){
          console.log(entryFee);
          return gameInstance.registerPlayer({from: account, gas: 50000, value: entryFee});
      }).then(function(result) {
        swapInChallenge()
        console.log(result);
      }).catch(function(err) {
        console.log(err.message);
      });
    });
  },

  submit: function(event){
    if (typeof event !== "undefined") event.preventDefault();

    var gameInstance;
    var answer = $('.textfieldAnswer').val();

    App.contracts.Game.deployed().then(function(instance) {
      gameInstance = instance;
      // Call the function that will retrieve the adopters for us.
      return gameInstance.checkAnswer(answer);
    }).then(function(res) {
      if (res) {
        return gameInstance.submit(answer);
      } else {
        indicateError();
        throw new Exception(); // TODO fix
      }
    }).then(function(result) {
      console.log(result);
      var amountWon = result['logs'][0]['args']['amount']['c'][0]/10000.0
      swapInVictory();
      $('.amount-won').text(amountWon);
    }).catch(function(err) {
      console.log(err.message);
    });
  }

};

$(function() {
  $(window).load(function() {
    App.init();

    setInterval(App.getAward, 1000);
  });
});
