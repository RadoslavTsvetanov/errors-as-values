# Philosophy behind the lib

- i dont like functions not telling me if they throw or not 
- i prefer the result appraoch

# Why are exceptions still used
- i use them as panic or os.exit

# Why are the interfaces IResult, IOptionable, ILeftRight
- well i believe i will need context specific tooling in the future using these so i will need to pass variables that are in this types and to be honest i prefer to pass an interface than a class which will force me to use the existing class (or i will need to override the existing class methods which defeats the point of a class)

# Possible questions 
## Ok no execptions then why does unpack throw an error 
Well in this case i am using it as an exit() bun instead of of it i use throw so that i dont force my decision to quit the program on you but instead give you tyhe freedom if you want to use it as a exit/panic or use a global try catch to have a graceful shudown (the orefered way for a lot of people)


## When to use just unpack() in prod code
I believe in the exit early coding strategy where the point is that you have some places where if the state is wrong you have messed up and the program needs to exit (like it just cant recover from this error or it dones not make sense to) so these are the places where i use raw `unpack()`. Here is an example:

lets say we have a cli which takes a string and returns its length.

Where do you think could happen an error which is unrecoverable?

Answer: if we dont provide a string there just isnt a way to recover so for getting the string we would use a raw unpack
