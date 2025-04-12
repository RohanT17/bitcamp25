import sys
import whisper
import spacy
import pandas as pd
import json

model = whisper.load_model("base")
nlp = spacy.load("en_core_web_sm")

def extract_keywords(text):
    doc = nlp(text)
    keywords = [chunk.text for chunk in doc.noun_chunks if len(chunk.text.split()) > 1]
    df = pd.DataFrame(keywords, columns=["keyword"])
    return df["keyword"].value_counts().nlargest(10).index.tolist()

def main(audio_path):
    result = model.transcribe(audio_path)
    text = result["text"]
    keywords = extract_keywords(text)

    nodes = [{"id": kw, "label": kw} for kw in keywords]
    links = [{"source": keywords[0], "target": kw} for kw in keywords[1:]]

    mindmap_json = {
        "nodes": nodes,
        "links": links,
        "raw_text": text
    }

    print(json.dumps(mindmap_json))

if __name__ == "__main__":
    main(sys.argv[1])
