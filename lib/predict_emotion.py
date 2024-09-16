# from flask import Flask, request, jsonify
# from time import time
# from flask_cors import CORS
# from pymongo import MongoClient
# import pandas as pd
# import numpy as np
# import re
# import pickle
# import nltk
# from sklearn.pipeline import Pipeline
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.svm import LinearSVC
# from nltk.stem import PorterStemmer
# from nltk import word_tokenize
# from character_bot import get_character_reply
# from julep import Client
# from dotenv import load_dotenv
# import os
# import textwrap
# from character_info import characters_info
# from flask import Flask, request, jsonify
# from flask_socketio import SocketIO, emit
# from pymongo import MongoClient
# # from main_script import get_character_reply

import os
from dotenv import load_dotenv

load_dotenv()

# nltk.download('punkt')

# # Function for text preprocessing
# def preprocess_and_tokenize(data):
#     # Remove html markup
#     data = re.sub("(<.*?>)", "", data)
#     # Remove urls
#     data = re.sub(r'http\S+', '', data)
#     # Remove hashtags and @names
#     data = re.sub(r"(#[\d\w\.]+)", '', data)
#     data = re.sub(r"(@[\d\w\.]+)", '', data)
#     # Remove punctuation and non-ascii digits
#     data = re.sub("(\\W|\\d)", " ", data)
#     # Remove whitespace
#     data = data.strip()
#     # Tokenization with nltk
#     data = word_tokenize(data)
#     # Stemming with nltk
#     porter = PorterStemmer()
#     stem_data = [porter.stem(word) for word in data]
#     return stem_data

# # Load the model from file
# model_filename = 'tfidf_svm.sav'  # Change the path if necessary
# loaded_model = pickle.load(open(model_filename, 'rb'))

# # Function to predict emotion using the loaded model
# def predict_emotion(message, model):
#     if model:
#         return model.predict([message])
#     else:
#         return None

# @app.route('/predict_sentiment', methods=['POST'])
# def predict_sentiment():
#     if request.method == 'POST':
#         try:
#             # Parse username and title from request body
#             data = request.get_json()
#             print(data)
#             user = data.get('user')
#             title = data.get('title')

#             # Check if required fields are present
#             if not user or not title:
#                 return jsonify({'message': 'Missing required fields: username or title'}), 400

#             # Fetch text from MongoDB based on username and title (adjust query as needed)
#             query = {'user': user, 'title': title}
#             print(query)
#             document = collection.find_one(query)

#             if not document:
#                 return jsonify({'message': 'Document not found'}), 404

#             text = document.get('text')
#             print(text)

#             if not text:
#                 return jsonify({'message': 'Text field missing in document'}), 400

#             try:
#                 message = text
#                 predicted_emotion = predict_emotion(message, loaded_model)
#                 return jsonify({'emotion': predicted_emotion[0]})
#             except Exception as e:
#                 return jsonify({'error': str(e)})

#         except Exception as e:
#             print(f"Error processing request: {e}")
#             return jsonify({'message': 'Internal server error'}), 500

#     return jsonify({'message': 'Invalid request method'}), 405


# character_bot.py

import google.generativeai as genai
from dotenv import load_dotenv
import os
import json

# Load environment variables
load_dotenv()

def predict_sentiment(text):

    genai.configure()
    model = genai.GenerativeModel('gemini-pro')
    
    prompt = f"""
    Analyze the emotions in the following text and categorize it as one or more of 'joy', 'sadness', 'fear', 'anger', or 'neutral'.
    Return only the emotions that are present in the text.

    Text: {text}

    Format your response as a JSON array of emotions:
    ["emotion1", "emotion2", ...]
    """

    response = model.generate_content(prompt)
    result = response.text.strip()
    
    emotions = json.loads(result)
    return {"emotions": emotions}

# # testing the code-
# print(predict_sentiment("I am in love"))