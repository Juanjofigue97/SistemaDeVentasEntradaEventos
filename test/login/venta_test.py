from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time

# Inicia el navegador
driver = webdriver.Firefox()
driver.get("https://eventia-venta-entradas.up.railway.app/")
time.sleep(3)

# Login
try:
    driver.find_element(By.XPATH, '//a[@href="/login"]').click()
    print("Clic en 'Iniciar sesión'")
except:
    print("❌ No se encontró el botón de login")
    driver.quit()
    exit()

time.sleep(2)

try:
    driver.find_element(By.ID, "email").send_keys("adminweb@cofinal.com.co")
    driver.find_element(By.ID, "password").send_keys("123")
    driver.find_element(By.XPATH, '//button[@type="submit"]').click()
    print("✅ Login enviado")
except Exception as e:
    print("❌ Error en login:", e)
    driver.quit()
    exit()

time.sleep(3)

# Ir a /dashboard/eventos
try:
    driver.find_element(By.XPATH, '//a[@href="/dashboard/eventos"]').click()
    print("✅ Ingresó a sección de eventos")
except:
    print("❌ No se encontró el botón de eventos")
    driver.quit()
    exit()

time.sleep(3)

# Clic en la imagen del evento "Feria del Libro 2025"
try:
    imagen_evento = driver.find_element(By.XPATH, '//img[@alt="Feria del Libro 2025"]')
    imagen_evento.click()
    print("✅ Clic en imagen del evento")
except:
    print("❌ No se encontró la imagen del evento")
    driver.quit()
    exit()

time.sleep(3)

# Seleccionar la primera opción del selector
try:
    selector = Select(driver.find_element(By.TAG_NAME, "select"))
    selector.select_by_index(1)
    print("✅ Primera opción del selector seleccionada")
except:
    print("❌ No se encontró el selector")

time.sleep(1)

# Ingresar cantidad = 3
try:
    input_cantidad = driver.find_element(By.XPATH, '//input[@type="number"]')
    input_cantidad.clear()
    input_cantidad.send_keys("3")
    print("✅ Cantidad ingresada: 3")
except:
    print("❌ No se encontró el input de cantidad")

time.sleep(1)

# Clic en botón Comprar
try:
    boton_comprar = driver.find_element(By.XPATH, '//button[contains(text(), "Comprar")]')
    boton_comprar.click()
    print("✅ Clic en botón Comprar")
except:
    print("❌ No se encontró el botón de Comprar")

# Esperar 10 segundos para ver el resultado
time.sleep(10)

# Cerrar navegador
driver.quit()
