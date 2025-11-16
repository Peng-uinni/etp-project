from passlib.context import CryptContext

pwd_context = CryptContext(schemes=['bcrypt'], deprecated='auto')

def verify_password(plainPassword: str, hashedPassword: str) -> bool:
  return pwd_context.verify(plainPassword, hashedPassword)

def hash_password(plainPassword: str) -> str:
  return pwd_context.hash(plainPassword)