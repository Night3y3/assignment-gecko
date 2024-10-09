import axios from "axios";
import { Response, Request } from "express";
import Coin from "../model/coin.model";

export const getStats = async (req: Request, res: Response) => {
  const coin = req.query.coin;
  try {
    const options = {
      method: "GET",
      url: `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
      },
    };

    const response = await axios.get(options.url, { headers: options.headers });

    if (typeof coin === "string") {
      const coinData = new Coin({
        name: coin,
        price: response.data[coin].usd,
        marketCap: response.data[coin].usd_market_cap,
        "24hChange": response.data[coin].usd_24h_change,
      });

      await Coin.create(coinData);
      return res.json({
        price: response.data[coin].usd,
        marketCap: response.data[coin].usd_market_cap,
        "24hChange": response.data[coin].usd_24h_change,
      });
    } else {
      return res.status(400).json({ error: "Invalid coin parameter" });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};
