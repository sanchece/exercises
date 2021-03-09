def sum_up_diagonals(matrix):
    """Given a matrix [square list of lists], return sum of diagonals.

    Sum of TL-to-BR diagonal along with BL-to-TR diagonal:

        >>> m1 = [
        ...     [1,   2],
        ...     [30, 40],
        ... ]
        >>> sum_up_diagonals(m1)
        73

        >>> m2 = [
        ...    [1, 2, 3],
        ...    [4, 5, 6],
        ...    [7, 8, 9],
        ... ]
        >>> sum_up_diagonals(m2)
        30

        
        >>> m3 = [
        ...    [1, 2, 3,1],
        ...    [4, 5, 6,1],
        ...    [7, 8, 9,1],
        ...    [1, 1, 1,1],        
        ... ]
        >>> sum_up_diagonals(m3)
    """

    total=0

    for i in range(0,len(matrix)):
        total+=matrix[i][i]
        total+=matrix[i][-1-i]
    return total

