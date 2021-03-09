def same_frequency(num1, num2):
    """Do these nums have same frequencies of digits?
    
        >>> same_frequency(551122, 221515)
        True
        
        >>> same_frequency(321142, 3212215)
        False
        
        >>> same_frequency(1212, 2211)
        True
    """

    return count(str(num1))==count(str(num2))

    
def count(nums):
    count={}
    for num in nums:
        count[num]=count.get(num,0)+1
    return count




  