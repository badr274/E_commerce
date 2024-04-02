import "./home.css";
import Landing from "../../Components/Website/Landing/Landing";
import LatestSale from "../../Components/Website/Products/LatestSale";

export default function HomePage() {
  return (
    <div>
      <Landing />
      <LatestSale />
    </div>
  );
}
