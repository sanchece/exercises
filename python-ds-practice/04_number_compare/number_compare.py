def number_compare(a, b):
    if(a>b):
        print("first is greater")
    elif(a<b):
        print("second is greater")
    else:
        print("numbers are equal")

    """Report on whether a>b, b>a, or b==a
    
        >>> number_compare(1, 1)
        'Numbers are equal'
        
        >>> number_compare(-1, 1)
        'Second is greater'
        
        >>> number_compare(1, -2)
        'First is greater'
    """