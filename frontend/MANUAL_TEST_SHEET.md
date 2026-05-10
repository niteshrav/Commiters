# Commiters Manual Test Sheet

## 1) Test Run Metadata
- Project: Commiters (Frontend + Backend)
- Environment: Local (Development)
- Frontend URL: `http://localhost:5173`
- Backend URL: `http://localhost:4000`
- Build/Commit: latest workspace + valid `DATABASE_URL`
- Tester: Automated regression + API smoke + user confirmation (`CNT-07`)
- Date: 2026-04-22
- Browser + Version: _Optional manual spot-check — not required for automation row_
- Device / Viewport: _See cases marked NOT RUN below_

## 2) Status and Severity Legend
- Status: `PASS`, `FAIL`, `BLOCKED`, `NOT RUN`
- Severity: `S1-Blocker`, `S2-High`, `S3-Medium`, `S4-Low`

## 3) Testing Process (Execution Order)
1. **Environment checks**
   - Start backend and frontend.
   - Verify API health endpoint.
2. **Desktop functional flow**
   - Validate routes, page content, contact form, thank-you flow.
3. **Responsive checks**
   - Re-run key journeys at tablet and mobile viewports.
4. **Accessibility basics**
   - Keyboard tab order, focus visibility, form accessibility.
5. **Regression checks**
   - Run automated tests and typecheck.
6. **Defect logging and sign-off**
   - Log defects with severity and final go/no-go status.

## 4) Preconditions
- Backend running on `:4000`
- Frontend running on `:5173`
- `.env` values point frontend to backend
- Internet available (for external map links)
- Browser DevTools available (Console + Network tabs)

## 5) Device Matrix
| Profile | Resolution | Browser |
|---|---|---|
| Desktop | 1440x900 | Chrome latest |
| Laptop | 1280x800 | Safari latest |
| Tablet Portrait | 768x1024 | Safari/Chrome |
| Tablet Landscape | 1024x768 | Safari/Chrome |
| Mobile Large | 430x932 | Safari/Chrome |
| Mobile Small | 360x640 | Chrome |

## 6) Detailed Test Cases

| ID | Module | Preconditions | Steps | Expected Result |
|---|---|---|---|---|
| ENV-01 | Environment | App servers started | Open `http://localhost:4000/api/health` | JSON response contains `ok: true` |
| NAV-01 | Header/Nav | Home page opened | Verify brand + primary links on desktop | `COMMITERS`, Home, About, Services, Contact are visible/clickable |
| NAV-02 | Header/Nav | Mobile viewport | Verify menu button and hidden desktop nav | Menu button visible; desktop inline nav hidden |
| NAV-03 | Header/Nav | Mobile viewport | Tap `Menu`, tap again to close | Mobile nav opens and closes without overlap |
| NAV-04 | Routing | Any viewport | Navigate to Home/About/Services/Contact from nav | Correct page content appears for each route |
| NAV-05 | 404 | Any viewport | Open `/this-route-does-not-exist` | Not Found page loads with recovery action |
| HOM-01 | Home | Home opened | Validate hero title/subtext/actions | Hero content visible, no clipping or overlap |
| ABT-01 | About | About opened | Scroll through sections | Content readable and consistently spaced |
| SRV-01 | Services | Services opened | Inspect service rows/cards | Cards render cleanly, no clipped text |
| CNT-01 | Contact UI | Contact opened | Check all form fields/labels | Name, Email, Service, Budget, Timeline, Reference, Message present |
| CNT-02 | Contact UI | Contact opened | Verify phone, both emails (`hello@commiters.com`, `commitersudaipur@gmail.com`), address, map embed | Contact links and map are visible and usable |
| CNT-03 | Validation | Contact opened | Click `Send Message` with empty required fields | Validation error shown; form not submitted |
| CNT-04 | Validation | Contact opened | Enter invalid email (e.g. `abc@`), submit | Email validation error shown |
| CNT-05 | Sanitization | Contact opened | Type `Jane123@` in Name | Disallowed chars removed; only allowed chars remain |
| CNT-06 | Sanitization | Contact opened | Type `₹50k and change` in Budget | Budget retains digits/commas only |
| CNT-07 | Submission | Backend healthy | Submit valid form data | Successful submit and redirect to thank-you page |
| CNT-08 | API | Submit valid form | Check Network tab for `POST /api/leads` | Request sent once; 2xx response |
| THX-01 | Thank You | Reached thank-you page | Click `Back to Home`, then `Contact` | Both links navigate correctly |
| MAP-01 | Maps | Contact opened | Click `Open in Google Maps` | Google Maps opens in new tab with office query |
| MAP-02 | Maps | Contact opened | Click `Get Directions` | Google Maps opens in new tab with office query |
| LEG-01 | Legal | Any viewport | Open Privacy Policy page | Page loads and legal text is readable |
| LEG-02 | Legal | Any viewport | Open Terms page | Page loads and legal text is readable |
| RSP-01 | Responsive | Desktop viewport | Test Home, Services, Contact at 1440x900 | No horizontal scroll or overlap |
| RSP-02 | Responsive | Tablet landscape | Test Home, Contact at 1024x768 | Layout adapts; controls remain usable |
| RSP-03 | Responsive | Tablet portrait | Test Home, Contact at 768x1024 | Layout stacks correctly, readable text |
| RSP-04 | Responsive | Mobile large | Test nav + contact form at 430x932 | Mobile menu and form are usable |
| RSP-05 | Responsive | Mobile small | Test nav + contact form at 360x640 | No clipping; controls remain tappable |
| A11Y-01 | Keyboard | Any viewport | Use Tab/Shift+Tab through header and form | Logical focus order with visible focus ring |
| A11Y-02 | Accessibility | Contact opened | Trigger validation errors and read labels | Labels are clear; errors are readable and non-overlapping |
| REG-01 | Regression | Dependencies installed | Run `npm run test:run` | All test files pass |
| REG-02 | Regression | Dependencies installed | Run `npm run typecheck` | No TypeScript errors |

## 7) Execution Log (Fill During Run)
| ID | Status | Severity (if FAIL) | Evidence (screenshot/video/log) | Notes |
|---|---|---|---|---|
| ENV-01 | PASS | - | `curl http://localhost:4000/api/health` → `{"ok":true}` | Backend up |
| NAV-01 | PASS | - | `Navbar.test.tsx` | Brand + primary nav links |
| NAV-02 | PASS | - | Manual (device toolbar / ~390px) | Menu visible; desktop inline nav hidden |
| NAV-03 | PASS | - | Manual | Menu opens/closes; navigation works without layout break |
| NAV-04 | PASS | - | `siteConsistency.test.tsx` — `APP_ROUTE_PATHS` | Each route renders with shell |
| NAV-05 | PASS | - | `siteConsistency.test.tsx` — unknown URL | Not-found heading + shell |
| HOM-01 | PASS | - | `HomePage.test.tsx` | Hero / actions |
| ABT-01 | PASS | - | `AboutPage.test.tsx` | About page renders |
| SRV-01 | PASS | - | `ServicesPage.test.tsx` | Services layout |
| CNT-01 | PASS | - | `ContactPage.test.tsx` | All form fields |
| CNT-02 | PASS | - | `ContactPage.test.tsx` | Strip + map + links |
| CNT-03 | PASS | - | `ContactPage.test.tsx` | Empty submit → error |
| CNT-04 | PASS | - | `ContactPage.test.tsx` | Invalid email |
| CNT-05 | PASS | - | `ContactPage.test.tsx` | Name sanitization |
| CNT-06 | PASS | - | `ContactPage.test.tsx` | Budget sanitization |
| CNT-07 | PASS | - | User confirmed in browser after DB fix | E2E submit → thank-you |
| CNT-08 | PASS | - | `POST /api/leads` → `HTTP 201` + `{"ok":true}` (curl) | Matches Network 2xx expectation |
| THX-01 | PASS | - | `ThankYouPage.test.tsx` | Home + Contact links |
| MAP-01 | NOT RUN | - | - | **Manual:** external Google Maps tab |
| MAP-02 | NOT RUN | - | - | **Manual:** same as MAP-01 |
| LEG-01 | PASS | - | `PrivacyPolicyPage.test.tsx` | Policy page |
| LEG-02 | PASS | - | `TermsPage.test.tsx` | Terms page |
| RSP-01 | NOT RUN | - | - | **Manual:** DevTools viewport 1440×900 |
| RSP-02 | NOT RUN | - | - | **Manual:** 1024×768 |
| RSP-03 | NOT RUN | - | - | **Manual:** 768×1024 |
| RSP-04 | NOT RUN | - | - | **Manual:** 430×932 |
| RSP-05 | NOT RUN | - | - | **Manual:** 360×640 |
| A11Y-01 | NOT RUN | - | - | **Manual:** keyboard-only pass |
| A11Y-02 | NOT RUN | - | - | **Manual:** focus + error readability |
| REG-01 | PASS | - | Frontend: `npm run test:run` — 19 files, 68 tests. Backend: 8 tests. | Full Vitest suites |
| REG-02 | PASS | - | `npm run typecheck` (frontend + backend) | No TS errors |

## 8) Defect Log
| Defect ID | Linked Test ID | Severity | Summary | Steps to Reproduce | Status |
|---|---|---|---|---|---|
| - | - | - | - | - | - |

## 9) Final Sign-Off
- Total cases: 31
- Passed: 22
- Failed: 0
- Blocked: 0
- Not run: 9 _(MAP-01/02, RSP-01–05, A11Y-01/02 — manual remaining)_
- Recommendation: **`GO`** for coverage so far; complete the **9** remaining **NOT RUN** rows before full manual sign-off.
- QA Sign-off: _NAV-02/03 done; pending MAP-01/02, RSP-01–05, A11Y-01/02_

