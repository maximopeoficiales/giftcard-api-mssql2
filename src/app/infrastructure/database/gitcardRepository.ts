import { giftcardMssqlIntance } from './gitcardMssql/gitcardMssql'
import { ConnectionPool } from 'mssql'
import { StatusGiftcardResponse } from '../../domain/responses/gitfcardBalance.response'
import { UpdateGifcardBalanceResponse } from '../../domain/responses/updateGiftcardBalance.response';


export class GiftcardRepository {
    constructor(
        private conn: ConnectionPool = giftcardMssqlIntance
    ) {

    }

    async searchGiftcard(numberGiftcard: number): Promise<StatusGiftcardResponse> {
        try {
            let giftcard = await this.conn.query(`SELECT number,netAmount,"status" FROM giftcard.Giftcards where number = ${numberGiftcard}`);
            // falta parseo de datos
            let giftcardFormated = giftcard[0]

            return giftcardFormated as StatusGiftcardResponse;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async updateGiftcard(numberGiftcard: number, amount: number): Promise<UpdateGifcardBalanceResponse> {
        try {
            let updatedSuccess = await this.conn.query(`update giftcard.Giftcards set netAmount = 'netAmount-${amount}' where number = ${numberGiftcard} and status = 'AC`);
            if (updatedSuccess) {
                let giftcard = await this.searchGiftcard(numberGiftcard);
                // falta parsear al objeto respectivo 
                let outputBalace = {};
                return outputBalace as UpdateGifcardBalanceResponse;
            }
            return null;
        } catch (error) {
            console.log(error);
            return null;
        }
    }



}

export const giftcardRepository = new GiftcardRepository();