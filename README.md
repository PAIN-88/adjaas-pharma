# Company Website — React + Django

A pharma/healthcare-style company website (matching the layout of hero slider →
trust/quality/satisfaction icons → welcome section → why-choose-us → product
category grid → footer with links & address), built with a Django REST API
backend and a React frontend, styled with:

- `#F29191` — primary (buttons, headings, accents)
- `#F7ADAD` — secondary (hover states)
- `#B1E5E6` — light teal (section backgrounds)
- `#CCFBFA` — pale teal (page background)

> Note: this is an original template inspired by that page's *layout*
> (slider, icon row, product grid, footer structure) — not a copy of any
> real company's name, logo, or written content. Placeholder text/company
> name is used throughout; edit it via the Django admin or `seed_data.py`.

## Backend (Django)

```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt

python manage.py migrate
python manage.py createsuperuser
python manage.py seed_data          # loads placeholder categories/features/company info
python manage.py runserver          # http://127.0.0.1:8000
```

Admin panel: http://127.0.0.1:8000/admin — add your real company name, logo,
slider images, and products here.

API endpoints:
- `GET /api/categories/`
- `GET /api/products/?category=<slug>`
- `GET /api/slides/`
- `GET /api/features/`
- `GET /api/company/`
- `POST /api/contact/`

## Frontend (React)

```bash
cd frontend
npm install
npm start          # http://localhost:3000
```

The frontend reads `REACT_APP_API_URL` (defaults to `http://127.0.0.1:8000/api`).
Create `frontend/.env` to point elsewhere:

```
REACT_APP_API_URL=http://127.0.0.1:8000/api
```

## Images already added

- `frontend/src/assets/lab-research.jpg`, `pharmacy-shelf.jpg`, `doctors-team.jpg`
  are used directly in `Home.jsx` (welcome + why-choose-us sections) and
  `About.jsx` (team section).
- The same 3 images are auto-loaded as **homepage hero slider** slides the
  first time you run `python manage.py seed_data` (via `backend/seed_images/`).
  If you re-run seed_data later, delete the old SliderImage rows in
  `/admin` first, or it will skip re-adding ones with matching titles.

## Customizing

1. Log into `/admin`, edit **Company Info** with your real name, address,
   phone, email, and logo.
2. Add **Slider Images** for the homepage hero.
3. Add **Products** under each **Category**.
4. Swap colors in `frontend/src/index.css` (`:root` variables) if needed.
