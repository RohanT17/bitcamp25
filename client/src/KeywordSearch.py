import numpy as np
import pandas as pd
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sklearn.feature_extraction.text import TfidfVectorizer
from collections import Counter

# Download required NLTK resources (run once)
nltk.download('punkt')
nltk.download('stopwords')

def extract_keywords(transcript_text, num_keywords=10, min_word_length=3):
    """
    Extract important keywords from a transcript using TF-IDF.
    
    Args:
        transcript_text (str): The transcript text
        num_keywords (int): Number of keywords to extract
        min_word_length (int): Minimum length of words to consider
        
    Returns:
        pandas.DataFrame: DataFrame with keywords and their importance scores
    """
    # Tokenize and clean the text
    stop_words = set(stopwords.words('english'))
    tokens = word_tokenize(transcript_text.lower())
    
    # Filter out stopwords and short words
    filtered_tokens = [word for word in tokens 
                      if word.isalpha() and 
                      word not in stop_words and 
                      len(word) >= min_word_length]
    
    # Get word frequency
    word_freq = Counter(filtered_tokens)
    
    # If the transcript is too short, just return the most common words
    if len(set(filtered_tokens)) < 5:
        keywords_df = pd.DataFrame({
            'keyword': list(word_freq.keys()),
            'score': list(word_freq.values())
        }).sort_values(by='score', ascending=False).head(num_keywords).reset_index(drop=True)
        return keywords_df
    
    # Use TF-IDF to identify important words
    # We'll treat the transcript as a single document
    vectorizer = TfidfVectorizer(max_features=num_keywords*2)
    tfidf_matrix = vectorizer.fit_transform([' '.join(filtered_tokens)])
    
    # Get feature names and TF-IDF scores
    feature_names = vectorizer.get_feature_names_out()
    tfidf_scores = np.array(tfidf_matrix.toarray())[0]
    
    # Create a DataFrame with keywords and scores
    keywords_df = pd.DataFrame({
        'keyword': feature_names,
        'score': tfidf_scores
    }).sort_values(by='score', ascending=False).head(num_keywords).reset_index(drop=True)
    
    return keywords_df

# Example usage
if __name__ == "__main__":
    # Sample transcript text
    sample_transcript = """
    Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed.
    It focuses on developing algorithms that can learn from and make predictions based on data.
    Deep learning is a subset of machine learning that uses neural networks with many layers.
    These neural networks are designed to model the way the human brain works, and they've been very successful
    at tasks like image recognition, natural language processing, and playing games like Go and chess.
    """
    
    # Extract keywords
    keywords_df = extract_keywords(sample_transcript, num_keywords=8)
    print(keywords_df)