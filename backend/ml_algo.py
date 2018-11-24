import numpy as np
import pandas as pd
import sklearn

import pymongo

from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
# from surprise import 


def main():

    client = MongoClient('mongodb://localhost:27017/')
    db = client['test']
    collection = db['profileschemas']

    cursor = collection.find({})

    for doc in cursor:
        print(doc)


    corpus = [
        'This is the first document.',
        'This document is the second document.',
        'And this is the third one.',
        'Is this the first document?',
    ]

    # extract tf-idf features
    vectorizer = TfidfVectorizer()
    X = vectorizer.fit_transform(corpus)
    print(vectorizer.get_feature_names())
    print(X.shape)


if __name__ == "__main__":
    main()
