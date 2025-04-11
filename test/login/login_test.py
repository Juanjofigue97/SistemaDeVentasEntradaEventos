from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
import time

# Ruta a geckodriver
service = Service("E:/geckodriver.exe")
driver = webdriver.Firefox(service=service)

# 1. Abre la app
driver.get("https://eventia-venta-entradas.up.railway.app/")
time.sleep(3)  # Espera a que cargue la página

# 2. Busca y hace clic en el botón de "Iniciar sesión"
try:
    boton_login = driver.find_element(By.XPATH, '//a[@href="/login"]')
    boton_login.click()
    print("Clic en 'Iniciar sesión'")
except:
    print("❌ No se encontró el botón de login")
    driver.quit()
    exit()

time.sleep(3)  # Espera a que cargue el formulario de login

# 3. Escribe el correo electrónico en el input con id="email"
try:
    input_email = driver.find_element(By.ID, "email")
    input_email.send_keys("adminweb@cofinal.com.co")
    print("Correo ingresado")
except:
    print("❌ No se encontró el campo de correo")

# 4. Escribe la contraseña en el input con id="password"
try:
    input_password = driver.find_element(By.ID, "password")
    input_password.send_keys("123")
    print("Contraseña ingresada")
except:
    print("❌ No se encontró el campo de contraseña")

# 5. Hace clic en el botón de submit (puede ser <button type="submit">)
try:
    boton_submit = driver.find_element(By.XPATH, '//button[@type="submit"]')
    boton_submit.click()
    print("Formulario enviado")
except:
    print("❌ No se encontró el botón de enviar")

# 6. Espera para ver si la sesión fue exitosa
time.sleep(5)

# 7. Cierra el navegador
driver.quit()
