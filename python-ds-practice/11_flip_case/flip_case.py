def flip_case(phrase, to_swap):
    """Flip [to_swap] case each time it appears in phrase.

        >>> flip_case('Aaaahhh', 'a')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'A')
        'aAAAhhh'

        >>> flip_case('Aaaahhh', 'h')
        'AaaaHHH'

    """
    to_swap=to_swap.lower()
    flipped_phrase=[char.swapcase() if char.lower() == to_swap else char for char in phrase]
    return "".join(flipped_phrase)
flip_case('Aaaahhh', 'a')