import sys
import whisper
import yake
import pandas as pd
import json

model = whisper.load_model("base")

def extract_keywords(text):
    kw_extractor = yake.KeywordExtractor(lan="en", n=2, top=10)
    keywords = kw_extractor.extract_keywords(text)
    return [kw for kw, score in keywords]

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
