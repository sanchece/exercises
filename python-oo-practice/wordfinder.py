"""Word Finder: finds random words from a dictionary."""

import random

class WordFinder:
    
    def __init__(self, path):        
        file= open(path,"r")
        self.list_of_words=self.make_list(file) 
        print(f"{len(self.list_of_words)} words to read")
        # print(self.list_of_words)
        file.close()

    def random(self):
        """ gets random word"""
        return random.choice(self.list_of_words)

    def make_list(self, file):
            return [line.strip() for line in file]

class SpecialWordFinder(WordFinder):


    def make_list(self,file):
        return[line.strip() for line in file if line.strip() and not line.startswith("#")]
        
        




