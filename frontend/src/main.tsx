import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import "./styles/serviceDetail.css";
import "./styles/openPositions.css";
import "./styles/trustTap.css";
import "./styles/opsFlow.css";
import "./styles/aiOperationalAudit.css";
import "./styles/aiSolutions.css";
import "./styles/webApplications.css";
import "./styles/workflowAutomation.css";
import "./styles/seoLanding.css";
import "./styles/testimonialsPage.css";
import "./styles/siteTypeScale.css";
import "./styles/homeLeadMagnet.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

