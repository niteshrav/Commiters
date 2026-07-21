import { Navigate, Route, Routes } from "react-router-dom";
import { isLoggedIn } from "./lib/api";
import { ENTITY_CONFIGS, SINGLETON_CONFIGS } from "./lib/entityConfigs";
import AdminLayout from "./components/AdminLayout";
import CrudModulePage from "./components/CrudModulePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import SingletonEditorPage from "./pages/SingletonEditorPage";
import NavbarEditorPage from "./pages/NavbarEditorPage";
import FooterEditorPage from "./pages/FooterEditorPage";
import ContactQueriesPage from "./pages/ContactQueriesPage";
import AdminProfilePage from "./pages/AdminProfilePage";
import TechnicalLedgerPublishPage from "./pages/TechnicalLedgerPublishPage";
import JobsManagementPage from "./pages/JobsManagementPage";
import MediaPage from "./pages/MediaPage";

function Protected({ children }: { children: React.ReactNode }) {
  if (!isLoggedIn()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/*"
        element={
          <Protected>
            <AdminLayout />
          </Protected>
        }
      >
        <Route index element={<DashboardPage />} />
        <Route path="hero" element={<SingletonEditorPage key="hero" config={SINGLETON_CONFIGS.hero} />} />
        <Route path="navbar" element={<NavbarEditorPage />} />
        <Route path="about" element={<SingletonEditorPage key="about" config={SINGLETON_CONFIGS.about} />} />
        <Route path="contact-settings" element={<SingletonEditorPage key="contact" config={SINGLETON_CONFIGS.contact} />} />
        <Route path="footer" element={<FooterEditorPage />} />
        <Route path="website-settings" element={<SingletonEditorPage key="settings" config={SINGLETON_CONFIGS.settings} />} />
        <Route path="services" element={<CrudModulePage key="services" config={ENTITY_CONFIGS.services} />} />
        <Route path="projects" element={<CrudModulePage key="projects" config={ENTITY_CONFIGS.projects} />} />
        <Route path="blogs" element={<CrudModulePage key="blogs" config={ENTITY_CONFIGS.blogs} />} />
        <Route path="technical-ledger" element={<TechnicalLedgerPublishPage />} />
        <Route path="team" element={<CrudModulePage key="team" config={ENTITY_CONFIGS.team} />} />
        <Route path="testimonials" element={<CrudModulePage key="testimonials" config={ENTITY_CONFIGS.testimonials} />} />
        <Route path="faqs" element={<CrudModulePage key="faqs" config={ENTITY_CONFIGS.faqs} />} />
        <Route path="jobs" element={<JobsManagementPage />} />
        <Route path="contact-queries" element={<ContactQueriesPage />} />
        <Route path="profile" element={<AdminProfilePage />} />
        <Route path="media" element={<MediaPage />} />
      </Route>
    </Routes>
  );
}
