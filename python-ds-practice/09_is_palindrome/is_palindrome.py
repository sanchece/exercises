def is_palindrome(phrase):
    reversed_phrase=""
    for i in range(len(phrase)-1,-1,-1):
        reversed_phrase+=phrase[i]
        print(i)
    print(reversed_phrase)
    return reversed_phrase==phrase

    
    """Is phrase a palindrome?

    Return True/False if phrase is a palindrome (same read backwards and
    forwards).

        >>> is_palindrome('tacocat')
        True

        >>> is_palindrome('noon')
        True

        >>> is_palindrome('robert')
        False

    Should ignore capitalization/spaces when deciding:

        >>> is_palindrome('taco cat')
        True

        >>> is_palindrome('Noon')
        True
    """
