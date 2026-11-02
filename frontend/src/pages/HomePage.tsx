import HomeDemoPage from "../components/home-demo/HomeDemoPage";
import { usePageSeo } from "../hooks/usePageSeo";
import { homePageSeo } from "../lib/sitePageSeo";
import "../styles/homeDemo.css";

export default function HomePage() {
  usePageSeo(homePageSeo());

  return (
    <div className="home-page" data-testid="home-page">
      <HomeDemoPage />
    </div>
  );
}
