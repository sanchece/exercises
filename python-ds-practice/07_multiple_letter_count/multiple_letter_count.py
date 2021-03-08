def multiple_letter_count(phrase):
    letter_count={}
    for char in phrase
        if char in letter_count.keys():
            break
        else:
            letter_count[f"{char}]=:{phrase.count(char)}"
    return letter_count


    
    """Return dict of {ltr: frequency} from phrase.

        >>> multiple_letter_count('yay')
        {'y': 2, 'a': 1}

        >>> multiple_letter_count('Yay')
        {'Y': 1, 'a': 1, 'y': 1}
    """
    