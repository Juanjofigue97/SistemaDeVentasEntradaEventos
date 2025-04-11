from selenium import webdriver
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.common.by import By
import time

# Configuración
service = Service("E:/geckodriver.exe")
driver = webdriver.Firefox(service=service)

# 1. Abrir la app
driver.get("https://eventia-venta-entradas.up.railway.app/")
time.sleep(3)

# 2. Clic en "Registrarse"
try:
    boton_register = driver.find_element(By.XPATH, '//a[@href="/register"]')
    boton_register.click()
    print("✅ Clic en 'Registrarse'")
except:
    print("❌ No se encontró el botón de registro")
    driver.quit()
    exit()

time.sleep(3)

# 3. Completar el formulario de registro
try:
    driver.find_element(By.ID, "nombre").send_keys("Juan Pérez")
    email = f"juanperezs{int(time.time())}@gmail.com"
    driver.find_element(By.ID, "email").send_keys(email)
    driver.find_element(By.ID, "cedula").send_keys("1234567890")
    driver.find_element(By.ID, "celular").send_keys("3214567890")
    driver.find_element(By.ID, "password").send_keys("123")
    print("📝 Formulario llenado")

    # Enviar el formulario
    driver.find_element(By.XPATH, '//button[@type="submit"]').click()
    print("🟢 Registro enviado")

except Exception as e:
    print("❌ Error llenando el formulario:", e)
    driver.quit()
    exit()

# 4. Esperar y hacer clic en botón "OK"
time.sleep(3)
try:
    boton_ok = driver.find_element(By.XPATH, '//button[contains(text(), "OK")]')
    boton_ok.click()
    print("🔘 Clic en 'OK'")
except:
    print("⚠️ No se encontró botón 'OK'")

time.sleep(2)

# 5. Iniciar sesión con los datos recién creados
try:
    driver.find_element(By.ID, "email").send_keys(email)
    driver.find_element(By.ID, "password").send_keys("123")
    driver.find_element(By.XPATH, '//button[@type="submit"]').click()
    print("✅ Inicio de sesión realizado")
except Exception as e:
    print("❌ Error al iniciar sesión:", e)

# 6. Esperar y cerrar navegador
time.sleep(5)
driver.quit()
