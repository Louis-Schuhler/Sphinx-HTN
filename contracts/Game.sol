pragma solidity ^0.4.17;

contract Game {
    uint public entryFee;
    string correctAnswer = "42";
    mapping (address => uint256) public balances;

    event LogSubmit(address sender, address to, uint amount);

    constructor() public {
        entryFee = 20 finney; // const?
    }

    function registerPlayer() public payable {
        // requiert que l'utilisateur envoie de l'argent pour s'inscrire
        // vérifier si le joueur a déjà été enregistré ?
        require(msg.value == entryFee);

        // s'assurer de ne payer qu'une fois. TODO: renvoyer quelque chose dans ce cas
        //require(balances[msg.sender] < entryFee);
        balances[msg.sender] += msg.value;
        // enregistrer l'expéditeur peut-être?
    }

    function getAward() public view returns (uint) {
        return address(this).balance;
    }

    function getEntryFee() public view returns (uint) {
        return entryFee;
    }

    function compareStrings(string a, string b) internal returns (bool) {
        return keccak256(a) == keccak256(b);
    }

    function checkAnswer(string answer) public view returns (bool) {
        return compareStrings(answer, correctAnswer);
    }

    function submit(string answer) public {
        // utiliser require?
        uint award = getAward();
        require(compareStrings(answer, correctAnswer));
        msg.sender.transfer(award);
        LogSubmit(address(this), msg.sender, award);
    }
}
