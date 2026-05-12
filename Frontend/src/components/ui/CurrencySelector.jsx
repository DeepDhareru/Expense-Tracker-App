import {

  useCurrency,

} from "../../context/CurrencyContext";

export default function CurrencySelector() {

  const {

    currency,
    setCurrency,

  } = useCurrency();

  return (

    <select
      value={currency}
      onChange={(e) =>
        setCurrency(
          e.target.value
        )
      }
      className="border p-2 rounded-xl bg-white text-black"
    >

      <option value="INR">
        INR ₹
      </option>

      <option value="USD">
        USD $
      </option>

      <option value="EUR">
        EUR €
      </option>

      <option value="GBP">
        GBP £
      </option>

    </select>
  );
}