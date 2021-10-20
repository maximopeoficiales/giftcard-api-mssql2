import { StatusGiftcardResponse } from "../../domain/responses/gitfcardBalance.response";
import { UpdateGifcardBalanceResponse } from "../../domain/responses/updateGiftcardBalance.response";

export interface IGiftcardRepository {
    searchGiftcard(numberGiftcard: number): Promise<StatusGiftcardResponse>;
    updateGiftcard(numberGiftcard: number, amount: number): Promise<UpdateGifcardBalanceResponse>
}