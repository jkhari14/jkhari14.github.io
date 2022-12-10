import os

#for pckle in os.listdir(os.listdir(os.listdir(os.getcwd())[9])[8]):
    #print(pckle)
#for pckle in os.listdir(os.path.dirname(os.getcwd()))[9]:
# os.listdir(os.listdir(os.path.dirname(os.getcwd()))[9])
#print(os.listdir('/Users'))


print(os.path.abspath(os.path.join(yourpath, os.pardir)))
