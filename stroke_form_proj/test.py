import sys
import ast  # abstract syntax tree
import json;
import pandas as pd;
import scipy;
from scipy import stats as st;
import matplotlib.pyplot as plt;
import numpy as np;
import sklearn
from sklearn.datasets import load_iris
from sklearn import tree
from sklearn.model_selection import train_test_split
from sklearn.model_selection import GridSearchCV
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.ensemble import BaggingClassifier
from sklearn.ensemble import VotingClassifier
from sklearn import tree
from sklearn.metrics import precision_score
from sklearn.metrics import recall_score   
import os
from bs4 import BeautifulSoup
from sklearn import preprocessing
label_encoder = preprocessing.LabelEncoder()
from joblib import Parallel, delayed
import joblib

input_data = ast.literal_eval(sys.argv[1]) # accept dictionary

element_vals = input_data['evs']
element_ids = input_data['eids']

user_name = element_vals[0]        

df_d = {}
for i in range(1, len(element_vals)):
    df_d[element_ids[i]] = [element_vals[i]]

df_clean = pd.DataFrame(data=df_d)
df_clean['gender'] = label_encoder.fit_transform(df_clean['gender'])
df_clean['gender'].unique()

df_clean['marriage-status'] = label_encoder.fit_transform(df_clean['marriage-status'])
df_clean['marriage-status'].unique()

df_clean_ohe = pd.get_dummies(data=df_clean, columns=['work-type', 'residence-type', 'smoke'])
X = df_clean_ohe.values

verdict = []
for i in range(40):
    # Load the model from the file
    stroke_pickle = joblib.load( f'stroke_model{i}.pkl')

    # Use the loaded model to make predictions
    verdict.append(stroke_pickle.predict(X))

if np.mean(verdict) > 0.667:
    answer = f"Hi {user_name}, According to our Machine Learning model you appear to be at Substantial Risk for having a stroke, over 6% of those with similar criteria to yours have suffered from one according to our database."
else:
    answer = f"Hi {user_name}, According to our Machine Learning model you appear to not be at Risk for having a stroke with chances as low as 0.46% of getting one."

#  list
'''
input_data = ast.literal_eval(sys.argv[1])
output = input_data
output.append(data_to_pass_back)
print(json.dumps(output))
'''


output = input_data #set output to dictionary
output['data_returned'] = answer
# print(json.dumps(output)) # print output
sys.stdout.flush()  # executes all the collected data on the terminal w/ appropriate commands

