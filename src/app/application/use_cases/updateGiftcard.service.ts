import { StatusGiftcardResponse } from "../../domain/responses/gitfcardBalance.response";
import { UpdateGifcardBalanceResponse } from "../../domain/responses/updateGiftcardBalance.response";
import { giftcardRepository, GiftcardRepository } from "../../infrastructure/database/gitcardRepository";

export class UpdateGiftcardService {

    constructor(
        private repository = giftcardRepository
    ) {
    }
    async searchGiftcard(numberGiftcard: number): Promise<StatusGiftcardResponse> {
        return await this.repository.searchGiftcard(numberGiftcard);
        // return {
        //     cardBalance: 222,
        //     cardNumber: numberGiftcard.toString(),
        //     output: "output",
        //     statusCard: true,
        //     statusQuery: "query"
        // };
    }
    async updateGiftcard(numberGiftcard: number, amount: number): Promise<UpdateGifcardBalanceResponse> {
        return await this.repository.updateGiftcard(numberGiftcard, amount);
        // return {
        //     cardBalance: 444,
        //     dateUpdated: "2021-20-12",
        //     statusQuery: "query"
        // };
    }
}


export const updateGiftcardService = new UpdateGiftcardService();

// updateGiftcardService.searchGiftcard(22323).then(console.log).catch(console.log)