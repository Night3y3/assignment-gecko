import mongoose, { Document, Model, Schema } from "mongoose";

type CoinDocument = Document & {
  name: string;
  price: number;
  marketCap: number;
  "24hChange": number;
};

const coinSchema = new Schema<CoinDocument>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  "24hChange": { type: Number, required: true },
});

const Coin: Model<CoinDocument> = mongoose.model("Coin", coinSchema);

export default Coin;
