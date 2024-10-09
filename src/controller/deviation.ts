import { Response, Request } from "express";
import Coin from "../model/coin.model";
import * as math from "mathjs";

export const getDeviation = async (req: Request, res: Response) => {
  const coin = req.query.coin;
  try {
    const coinPrices = await Coin.find({ name: coin })
      .limit(100)
      .select("price")
      .exec();
    const prices: number[] = coinPrices.map((coinPrice) => coinPrice.price);
    console.log(prices);

    const std: math.MathNumericType[] = math.std(prices);

    return res.json({ deviation: std });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
