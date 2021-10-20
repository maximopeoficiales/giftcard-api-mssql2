import { getConnectionPool, } from './gitcardMssql/gitcardMssql'
import { StatusGiftcardResponse } from '../../domain/responses/gitfcardBalance.response'
import { UpdateGifcardBalanceResponse } from '../../domain/responses/updateGiftcardBalance.response';
import { getCurrentDateFormat } from '../shared/date';


export class GiftcardRepository {
    constructor(

    ) {

    }
    async getConn() {
        return await getConnectionPool()
    }

    async searchGiftcard(numberGiftcard: number): Promise<StatusGiftcardResponse> {
        let ctx = await this.getConn();
        let giftcard = await ctx.query(`SELECT number,netAmount,"status" FROM giftcard.Giftcards where number = ${numberGiftcard}`);
        // falta parseo de datos
        // log
        let giftcardFormated = giftcard.recordset[0]
        if (giftcardFormated) {
            return {
                cardBalance: giftcardFormated.netAmount,
                cardNumber: numberGiftcard.toString(),
                statusCard: giftcardFormated.status,
                statusQuery: true,
                error: null
            };
        }
        return {
            cardBalance: null,
            cardNumber: null,
            statusCard: null,
            statusQuery: false,
            error: "Giftcard does not exist"
        };

    }

    async updateGiftcard(numberGiftcard: number, amount: number): Promise<UpdateGifcardBalanceResponse> {
        let ctx = await this.getConn();
        let giftcardFind = await this.searchGiftcard(numberGiftcard);
        if (giftcardFind.statusQuery) {
            let updatedSuccess = await ctx.query(`update giftcard.Giftcards set netAmount = ${amount} where number = ${numberGiftcard} and status = 'AC' `);
            // console.log(updatedSuccess);

            if (updatedSuccess) {
                let giftcard = await this.searchGiftcard(numberGiftcard);
                if (giftcard.cardNumber) {
                    // falta parsear al objeto respectivo 
                    let outputBalace: UpdateGifcardBalanceResponse = {
                        cardBalance: giftcard.cardBalance,
                        dateUpdated: getCurrentDateFormat(),
                        statusQuery: true,
                        error: null
                    };
                    return outputBalace;
                }
            }
            return {
                cardBalance: null,
                dateUpdated: getCurrentDateFormat(),
                statusQuery: false,
                error: "Giftcard not updated"
            }
        }

        return {
            cardBalance: null,
            dateUpdated: getCurrentDateFormat(),
            statusQuery: false,
            error: "Giftcard does not exist"
        }

    }

    async listCards(): Promise<StatusGiftcardResponse> {
        try {
            let ctx = await this.getConn();
            let giftcard = await ctx.query(`SELECT * FROM giftcard.Giftcards`);
            // falta parseo de datos
            // console.log(giftcard);
            let giftcardFormated = giftcard[0]

            return giftcardFormated as StatusGiftcardResponse;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

export const giftcardRepository = new GiftcardRepository();

// giftcardRepository.searchGiftcard(2121210020000036).then(console.log).catch(console.log);

// giftcardRepository.listCards().then(console.log).catch(console.log);
// giftcardRepository.updateGiftcard(21212100200000336,800).then(console.log).catch(console.log);