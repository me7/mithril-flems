#!/usr/bin/python

import os

# traverse root directory, and list directories as dirs and files as files
for root, dirs, files in os.walk("."):
    path = root.split(os.sep)
    print((len(path) - 1) * '---', os.path.basename(root))
    for file in files:
    	print
    	print('--------------------------------------------')
        print(len(path) * '---', file)
        with open(file, 'r') as fin:
    		print fin.read()