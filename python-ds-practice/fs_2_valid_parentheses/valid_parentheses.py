def valid_parentheses(parens):
    """Are the parentheses validly balanced?

        >>> valid_parentheses("()")
        True

        >>> valid_parentheses("()()")
        True

        >>> valid_parentheses("(()())")
        True

        >>> valid_parentheses(")()")
        False

        >>> valid_parentheses("())")
        False

        >>> valid_parentheses("((())")
        False

        >>> valid_parentheses(")()(")
        False
    """
    for i in range(len(parens)):
        if parens[i]=="(":
            for j in range(i+1,len(parens)):
                if parens[j]==")":
                    parens= parens[:i]+"x"+parens[i+1:]
                    parens= parens[:j]+"x"+parens[j+1:]
                    break
                
    print(parens)
    for char in parens:
        if char=="(" or char==")":
            return False
    return True




            
