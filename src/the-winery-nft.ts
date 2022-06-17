import {
  //   TokenIPFSPathUpdated as TokenIPFSPathUpdatedEvent,
  Transfer as TransferEvent,
  TheWineryNFT as TokenContract,
} from "../generated/TheWineryNFT/TheWineryNFT";

import { WineryToken, User } from "../generated/schema";

export function handleTransfer(event: TransferEvent): void {
  let token = WineryToken.load(event.params.tokenId.toString());
  if (!token) {
    token = new WineryToken(event.params.tokenId.toString());
    token.creator = event.params.to.toHexString();
    token.tokenID = event.params.tokenId;

    let tokenContract = TokenContract.bind(event.address);
    token.contentURI = tokenContract.tokenURI(event.params.tokenId);
    // token.tokenIPFSPath = tokenContract.getTokenIPFSPath(event.params.tokenId);
    token.name = tokenContract.name();
    token.createdAtTimestamp = event.block.timestamp;
  }
  token.owner = event.params.to.toHexString();
  token.save();

  let user = User.load(event.params.to.toHexString());
  if (!user) {
    user = new User(event.params.to.toHexString());
    user.save();
  }
}


// import {
//   Approval as ApprovalEvent,
//   ApprovalForAll as ApprovalForAllEvent,
//   NewMaxElement as NewMaxElementEvent,
//   NewPriceEvent as NewPriceEventEvent,
//   OwnershipTransferred as OwnershipTransferredEvent,
//   PauseEvent as PauseEventEvent,
//   Transfer as TransferEvent
// } from "../generated/TheWineryNFT/TheWineryNFT"
// import {
//   Approval,
//   ApprovalForAll,
//   NewMaxElement,
//   NewPriceEvent,
//   OwnershipTransferred,
//   PauseEvent,
//   Transfer
// } from "../generated/schema"

// export function handleApproval(event: ApprovalEvent): void {
//   let entity = new Approval(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.owner = event.params.owner
//   entity.approved = event.params.approved
//   entity.tokenId = event.params.tokenId
//   entity.save()
// }

// export function handleApprovalForAll(event: ApprovalForAllEvent): void {
//   let entity = new ApprovalForAll(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.owner = event.params.owner
//   entity.operator = event.params.operator
//   entity.approved = event.params.approved
//   entity.save()
// }

// export function handleNewMaxElement(event: NewMaxElementEvent): void {
//   let entity = new NewMaxElement(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.max = event.params.max
//   entity.save()
// }

// export function handleNewPriceEvent(event: NewPriceEventEvent): void {
//   let entity = new NewPriceEvent(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.price = event.params.price
//   entity.save()
// }

// export function handleOwnershipTransferred(
//   event: OwnershipTransferredEvent
// ): void {
//   let entity = new OwnershipTransferred(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.previousOwner = event.params.previousOwner
//   entity.newOwner = event.params.newOwner
//   entity.save()
// }

// export function handlePauseEvent(event: PauseEventEvent): void {
//   let entity = new PauseEvent(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.pause = event.params.pause
//   entity.save()
// }

// export function handleTransfer(event: TransferEvent): void {
//   let entity = new Transfer(
//     event.transaction.hash.toHex() + "-" + event.logIndex.toString()
//   )
//   entity.from = event.params.from
//   entity.to = event.params.to
//   entity.tokenId = event.params.tokenId
//   entity.save()
// }
