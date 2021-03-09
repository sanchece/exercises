def reverse_vowels(s):
    """Reverse vowels in a string.

    Characters which re not vowels do not change position in string, but all
    vowels (y is not a vowel), should reverse their order.

    >>> reverse_vowels("Hello!")
    'Holle!'

    >>> reverse_vowels("Tomatoes")
    'Temotaos'

    >>> reverse_vowels("Reverse Vowels In A String")
    'RivArsI Vewols en e Streng'

    reverse_vowels("aeiou")
    'uoiea'

    reverse_vowels("why try, shy fly?")
    'why try, shy fly?''
    """
    s=[char for char in s]
    vowels="aeiouAEIOU"
    vowels_s=[]

    for char in s:
        if char in vowels:
            vowels_s.append(char)

    vowels_s.reverse()
    for i in range(0,len(s)):
        if s[i] in vowels:
            s[i]=vowels_s[0]
            vowels_s.pop(0)

    return "".join(s)


 