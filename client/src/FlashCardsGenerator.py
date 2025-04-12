import pandas as pd
import re
import nltk
from nltk.tokenize import sent_tokenize

# Download sentence tokenizer if not already downloaded
nltk.download('punkt')

def generate_flashcards(transcript_text, keywords_df, context_window=1):
    """
    Generate flashcards for keywords by finding relevant sentences in the transcript.
    
    Args:
        transcript_text (str): The transcript text
        keywords_df (pandas.DataFrame): DataFrame with keywords from extract_keywords()
        context_window (int): Number of sentences before/after to include for context
        
    Returns:
        pandas.DataFrame: DataFrame with flashcards (keyword, front, back)
    """
    # Tokenize transcript into sentences
    sentences = sent_tokenize(transcript_text)
    
    # Create a DataFrame to store the flashcards
    flashcards = []
    
    # Process each keyword
    for _, row in keywords_df.iterrows():
        keyword = row['keyword']
        
        # Find sentences containing the keyword
        relevant_indices = []
        for i, sentence in enumerate(sentences):
            # Case-insensitive search for the keyword as a whole word
            if re.search(r'\b' + re.escape(keyword) + r'\b', sentence, re.IGNORECASE):
                relevant_indices.append(i)
        
        if not relevant_indices:
            continue
            
        # For each occurrence, create a flashcard with context
        for idx in relevant_indices:
            # Get context sentences
            start_idx = max(0, idx - context_window)
            end_idx = min(len(sentences), idx + context_window + 1)
            
            # Create front (question) - use the keyword and its context
            context_text = " ".join(sentences[start_idx:end_idx])
            
            # Create two types of flashcards:
            
            # 1. Definition flashcard
            flashcards.append({
                'keyword': keyword,
                'front': f"What is {keyword}?",
                'back': context_text
            })
            
            # 2. Fill-in-the-blank flashcard
            # Replace the keyword with blank in the sentence
            blank_sentence = sentences[idx]
            blank_sentence = re.sub(r'\b' + re.escape(keyword) + r'\b', 
                                   '_______', 
                                   blank_sentence, 
                                   flags=re.IGNORECASE)
            
            flashcards.append({
                'keyword': keyword,
                'front': f"Fill in the blank: {blank_sentence}",
                'back': keyword
            })
    
    # Convert to DataFrame
    flashcards_df = pd.DataFrame(flashcards)
    
    # Remove duplicates
    flashcards_df = flashcards_df.drop_duplicates()
    
    return flashcards_df

def export_flashcards_to_csv(flashcards_df, output_file="flashcards.csv"):
    """Export flashcards to CSV file for import into flashcard apps"""
    flashcards_df.to_csv(output_file, index=False)
    print(f"Flashcards exported to {output_file}")

def export_flashcards_to_anki(flashcards_df, output_file="anki_flashcards.txt"):
    """Export flashcards to a text file formatted for Anki import"""
    with open(output_file, 'w') as f:
        for _, row in flashcards_df.iterrows():
            # Format: front; back
            f.write(f"{row['front']}; {row['back']}\n")
    print(f"Anki flashcards exported to {output_file}")

# Example usage
if __name__ == "__main__":
    # Sample transcript text (same as before)
    sample_transcript = """
    Machine learning is a field of study that gives computers the ability to learn without being explicitly programmed.
    It focuses on developing algorithms that can learn from and make predictions based on data.
    Deep learning is a subset of machine learning that uses neural networks with many layers.
    These neural networks are designed to model the way the human brain works, and they've been very successful
    at tasks like image recognition, natural language processing, and playing games like Go and chess.
    """
    
    # Extract keywords
    keywords_df = extract_keywords(sample_transcript, num_keywords=5)
    
    # Generate flashcards
    flashcards_df = generate_flashcards(sample_transcript, keywords_df)
    
    # Display the flashcards
    print(flashcards_df)
    
    # Export to CSV and Anki format
    export_flashcards_to_csv(flashcards_df)
    export_flashcards_to_anki(flashcards_df)