"""Python serial number generator."""

class SerialGenerator:
    """Machine to create unique incrementing serial numbers.
    
    >>> serial = SerialGenerator(start=100)

    >>> serial.generate()
    100

    >>> serial.generate()
    101

    >>> serial.generate()
    102

    >>> serial.reset()

    >>> serial.generate()
    100
    """
    def __init__(self,start=0):
        self.original= start
        self.start=start
    
    def generate(self):
        serial=self.start
        self.start+=1        
        return serial
    
    def reset(self):
        self.start=self.original 







