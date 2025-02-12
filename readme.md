# Philosophy behind the lib

- i dont like functions not telling me if they throw or not 
- i prefer the result appraoch

# Why are exceptions still used
- i use them as panic or os.exit

# Why are the interfaces IResult, IOptionable, ILeftRight
- well i believe i will need context specific tooling in the future using these so i will need to pass variables that are in this types and to be honest i prefer to pass an interface than a class which will force me to use the existing class (or i will need to override the existing class methods which defeats the point of a class)