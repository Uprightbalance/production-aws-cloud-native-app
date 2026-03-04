## MR. BAFFO Dry Cleaning – Frontend

A production-ready React (Vite) frontend for **MR. BAFFO Dry Cleaning – Toronto**, built to integrate directly with the existing FastAPI backend.

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Language**: JavaScript (no TypeScript)

The app is designed for clean architecture, maintainability, and compatibility with the backend’s response contract.

---

## Project Structure

```bash
src/
├── api/
│   └── client.js          # Axios clients and API helpers
├── components/
│   ├── Navbar.jsx         # Top navigation bar
│   ├── Container.jsx      # Centered responsive container
│   ├── Button.jsx         # Reusable button component
│   └── Input.jsx          # Reusable input/textarea component
├── layouts/
│   └── MainLayout.jsx     # Layout with navbar and footer
├── pages/
│   ├── Home.jsx           # Company overview from GET /
│   ├── Services.jsx       # Services list from GET /api/v1/services
│   ├── Areas.jsx          # Service areas from GET /api/v1/areas
│   ├── Contact.jsx        # Contact form -> POST /api/v1/contact
│   └── Pickup.jsx         # Pickup form -> POST /api/v1/pickup-request
├── App.jsx                # Route configuration
├── main.jsx               # React entrypoint
└── index.css              # Tailwind entry + base styles
```
