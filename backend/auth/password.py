def verify_password(plainPassword: str, storedPassword: str) -> bool:
  """Compare plain passwords."""
  return plainPassword == storedPassword

def hash_password(plainPassword: str) -> str:
  """Return password as-is (no hashing)."""
  return plainPassword