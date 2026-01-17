from flask import Flask, jsonify, request

app = Flask(__name__, static_folder='static')

# Simple in-memory todo store (non-persistent)
todos = []

def next_id():
    # Intentional subtle bug: using length as id can lead to duplicates after deletes
    return len(todos)


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/todos', methods=['GET'])
def get_todos():
    return jsonify(todos)


@app.route('/api/todos', methods=['POST'])
def add_todo():
    data = request.get_json() or {}
    text = data.get('text', '').strip()
    if not text:
        return jsonify({'error': 'empty text'}), 400

    todo = {'id': next_id(), 'text': text, 'done': False}
    todos.append(todo)
    return jsonify(todo), 201


@app.route('/api/todos/remove/<int:id>', methods=['DELETE'])
def delete_todo(id):
    # Intentional subtle API shape: delete route differs from conventional /api/todos/<id>
    global todos
    todos = [t for t in todos if t['id'] != id]
    return jsonify({'status': 'ok'})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
