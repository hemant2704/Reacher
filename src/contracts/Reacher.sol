pragma solidity ^0.5.0;

contract Reacher {
  string public name="Reacher";
  uint public imageCount=0;
  // Store Posts
  mapping(uint=>Image) public images;
  
  struct Image{
    uint id;
    string hash;
    string description;
    uint tipAmount;
    address payable author;
  }

  event ImageCreated(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  event ImageTipped(
    uint id,
    string hash,
    string description,
    uint tipAmount,
    address payable author
  );

  // Create Posts
  function uploadImage(string memory _imgHash,string memory _description) public {

    require(bytes(_imgHash).length>0);
    require(bytes(_description).length>0);
    require(msg.sender!=address(0x0));
    imageCount++;

    images[imageCount]= Image(imageCount,_imgHash,_description,0,msg.sender);

    // trigger event
    emit ImageCreated(imageCount,_imgHash,_description,0,msg.sender);
  }

  // Tip Posts
  function tipImageOwner(uint _id) public payable{

    require(_id>0 && _id<=imageCount);
    
    Image memory _image=images[_id];  //fetch

    address payable _author=_image.author; //get author

    address(_author).transfer(msg.value); //transfer money

    _image.tipAmount=_image.tipAmount+msg.value; //increment tip

    images[_id]=_image; //update image

    emit ImageTipped(_id, _image.hash, _image.description, _image.tipAmount, _author);
  }
}