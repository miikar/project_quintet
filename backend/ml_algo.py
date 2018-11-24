import numpy as np
import pandas as pd
import sklearn

import pymongo
import sys
import json
import string

from collections import OrderedDict

#from nltk.corpus import stopwords
from nltk.tokenize import wordpunct_tokenize as tokenize
from nltk.stem.porter import PorterStemmer
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
    profile_id = read_in()
    #profile_id = '5bf91436177df4775bf16be7'
    print(profile_id)

    profiles = collection.find({})
    desc_data = {}

    # build corpus
    for profile in profiles:
        data_string = ''
        if profile.get('description'):
            data_string += profile.get('description') + ' '
        if profile.get('industries'):
            data_string += ' '.join(profile.get('industries'))
        if profile.get('technologies'):
            data_string += ' '.join(profile.get('technologies'))
        desc_data[str(profile['_id'])] = data_string
        

    y = desc_data.keys()
    query_id = y.index(profile_id)

    # text preprocessing
    porter = PorterStemmer()
    modified_arr = [[porter.stem(i.lower()) for i in tokenize(d)] for d in desc_data.values()]
    modified_doc = [' '.join(i) for i in modified_arr]

    # extract tf-idf features
    vectorizer = TfidfVectorizer(stop_words='english')
    X = vectorizer.fit_transform(modified_doc)
    # compute cosine similarities and sort by the similarity score
    cosine_similarities = linear_kernel(X[query_id:query_id+1], X).flatten()
    match_scores = cosine_similarities.argsort()[:-10:-1][1:]
    
    #print(query_id)
    print(match_scores)
    print(cosine_similarities)

    # return best matches to the server backend
    res = OrderedDict()
    # _id -> match_score 
    for i in match_scores:
        res[y[i]] = cosine_similarities[i]

    print('recommendations:%s' % (json.dumps(res)))

if __name__ == "__main__":
    main()
