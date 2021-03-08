def reverse_string(phrase):
    phrase_rev=""
    for i in range(len(phrase)-1,0,-1):
        phrase_rev+=phrase[i]
    return phrase_rev
        

    """Reverse string,

        >>> reverse_string('awesome')
        'emosewa'

        >>> reverse_string('sauce')
        'ecuas'
    """

