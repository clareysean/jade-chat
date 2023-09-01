import { checkToken } from "../../utilities/users-service.js";

export default function OrderHistoryPage() {
  async function handleCheckToken() {
    const expDate = await checkToken();
    console.log(expDate);
  } // convert ms to hrs

  return (
    <>
      <h1>OrderHistoryPage</h1>
      <button onClick={handleCheckToken}>Check when my login expires</button>
    </>
  );
}
