import cron from "node-cron";
import axios from "axios";
import Coin from "../model/coin.model";
import dotenv from "dotenv";

dotenv.config();

const fetchAndStoreCryptoData = async () => {
  const coins = ["bitcoin", "matic-network", "ethereum"];

  try {
    const responses = await Promise.all(
      coins.map((coin) =>
        axios.get(
          `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`,
          {
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": process.env.COINGECKO_API_KEY,
            },
          }
        )
      )
    );

    const coinData = responses.map((response, index) => {
      const coin = coins[index];
      return new Coin({
        name: coin,
        price: response.data[coin].usd,
        marketCap: response.data[coin].usd_market_cap,
        "24hChange": response.data[coin].usd_24h_change,
      });
    });

    await Coin.insertMany(coinData);
    console.log("Cryptocurrency data fetched and stored successfully.");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Error fetching cryptocurrency data:",
        error.response?.data
      );
    } else {
      console.error("Unexpected error:", error);
    }
  }
};

// Schedule the job to run every 2 hours
cron.schedule("0 */2 * * *", fetchAndStoreCryptoData);

fetchAndStoreCryptoData();
