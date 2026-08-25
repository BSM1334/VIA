# from flask import Flask, request, jsonify
# app = Flask(__name__)


# @app.route('/estimate', methods=['POST'])
# def estimate():
#     data = request.json or {}
#     # placeholder heuristic
#     images = data.get('images', [])
#     estimate = 1000 * len(images) + 500
#     return jsonify({ 'estimate': estimate })


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000)