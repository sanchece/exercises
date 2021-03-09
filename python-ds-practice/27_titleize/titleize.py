def titleize(phrase):
    """Return phrase in title case (each word capitalized).

        >>> titleize('this is awesome')
        'This Is Awesome'

        >>> titleize('oNLy cAPITALIZe fIRSt')
        'Only Capitalize First'
    """
    cut_phrase=phrase.lower().split(" ")
    for word in cut_phrase:
        cut_phrase[cut_phrase.index(word)]=word.capitalize()
    

    return " ".join(cut_phrase)
