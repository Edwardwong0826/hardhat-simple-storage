// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

// EVM, Ethereum Virtual Machine
// Avalance, Fantom, Polygon

// contract similiar like a class in other programming language
contract SimpleStorage {

    // basic types in solidity
    // boolean, uint, int, address, bytes
    // every types got its default value can check it out on the documentation 
    bool boolean = true;
    uint256 public favoriteNum = 0;
    int256  num2 = 0;
    string text = "Five"; // string is just a bytes object in String
    address myAddress = 0x1231B044eE8C03F12227eC8305fcB6Fa57d57968;
    bytes32 testBytes = "cat";

    mapping(string => uint256) public nameToFavoriteNum;

    struct People{
        uint256 favoriteNum;
        string name;
    }

    People[] public people;

    // this is a getter function for num1, because we put public visibility on num1
    // _ means this variable is different with the global variable with same name
    function store(uint256 _favoriteNum) public virtual {
        favoriteNum = _favoriteNum;

        // the more things we define in our function, the more gas it costs
    }

    // view and pure functions, when called don't spend gas
    // view function cannot update value

    function retrieve() public view returns(uint256){
        return favoriteNum;
    }

    // pure functions disallow any modification of state, and to read from blockhain state
    function add() public pure returns (uint256){
        return (1+1); 
    }

    // calldata, memory, storage
    // calldata is a temorary variable cannot be modified
    // memory a is temporary variable that can modified
    // why string need memory is because string is a array, struct, mapping and arrays need to given memory, calldata keyword
    // when adding them as a parameter in function 
    function addPerson(string memory _name, uint256 _favoriteNum) public {
        
        People memory newPerson = People(_favoriteNum, _name);
        //people.push(People(_num1, _name));
        people.push(newPerson); 

        nameToFavoriteNum[_name] = _favoriteNum;
    }

}

// 0xd9145CCE52D386f254917e481eB44e9943F39138