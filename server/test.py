from jose import jwt

SECRET_KEY = "mysecret"
ALGORITHM = "HS256"
data = {"sub": "andres@example.com"}

token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

print("Token:", token)
print("Decoded:", decoded)
