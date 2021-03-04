def print_upper_words(words,must_start_with):

    for word in words:
        lower= word.lower()
        for letter in must_start_with:
            if letter==lower[0]:
                print(word.upper())

print_upper_words(["hello", "hey", "goodbye", "yo", "yes"],
                   must_start_with={"h", "y"})                