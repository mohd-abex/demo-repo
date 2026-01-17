# Demo Todo App

This is a minimal Flask-based todo demo app intended for code review exercises. It purposely contains a few subtle bugs for review.

Quick start:

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python3 app.py
```

Open http://localhost:5000 in your browser.

Intentional issues left for code review:
- Frontend `main.js` requests `/todos` (missing `/api`) so initial load won't show todos.
- The frontend DELETE uses `/api/todos/<id>` while the backend DELETE route is `/api/todos/remove/<id>`.
- Backend `next_id()` uses `len(todos)` which can produce duplicate IDs after deletions.

Feel free to run the app and submit a PR with fixes.
