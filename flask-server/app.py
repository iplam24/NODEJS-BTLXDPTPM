from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Cho phép CORS để kết nối từ frontend

# URL của Rasa server (chạy trên port 5005)
RASA_SERVER_URL = "http://localhost:5005/webhooks/rest/webhook"

@app.route('/webhook', methods=['POST'])
def webhook():
    try:
        # Nhận message từ frontend
        data = request.json
        sender = data.get('sender', 'default_user')
        message = data['message']
        
        # Gửi đến Rasa server
        rasa_response = requests.post(
            RASA_SERVER_URL,
            json={"sender": sender, "message": message}
        )
        
        # Trả về response từ Rasa
        return jsonify(rasa_response.json())
    
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(port=5001, debug=True)