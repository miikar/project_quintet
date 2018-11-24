import numpy as np
import pandas as pd
import sklearn

import pymongo
import sys
import json
from pymongo import MongoClient
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import linear_kernel
# from surprise import 


#Read data from stdin
def read_in():
    lines = sys.stdin.readlines()
    #Since our input would only be having one line, parse our JSON data from that
    return json.loads(lines[0])

def main():

    # db connection
    client = MongoClient('mongodb://localhost:27017/')
    db = client['test']
    collection = db['profiles']

    #get our data as an array from read_in()
    #profile_id = read_in()

    profiles = collection.find({})
    desc_data = {}

    for profile in profiles:
        desc_data[profile['name']] = profile['description']

    y = desc_data.keys()
    # extract tf-idf features
    X = TfidfVectorizer().fit_transform(desc_data.values())
    cosine_similarities = linear_kernel(X[0:1], X).flatten()
    ids = cosine_similarities.argsort()[:-5:-1]
    
    
    print(X.shape)
    print(cosine_similarities.shape)
    print(cosine_similarities)

    print(desc_data[y[ids[0]]])
    print(y[ids[0]])
    print(desc_data[y[ids[1]]])
    print(y[ids[1]])


if __name__ == "__main__":
    main()
