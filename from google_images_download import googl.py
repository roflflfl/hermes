from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import requests
import os

def download_images(keyword, num_images=100):
    driver_path = "path/to/chromedriver"  # Update this path
    driver = webdriver.Chrome(driver_path)
    search_url = "https://www.google.com/search?q={}&source=lnms&tbm=isch".format(keyword)

    driver.get(search_url)
    img_urls = set()
    img_count = 0
    scroll_pause_time = 1

    while img_count < num_images:
        img_elements = driver.find_elements(By.CSS_SELECTOR, "img.Q4LuWd")
        for img in img_elements:
            try:
                img.click()
                time.sleep(scroll_pause_time)
                actual_images = driver.find_elements(By.CSS_SELECTOR, "img.n3VNCb")
                for actual_img in actual_images:
                    src = actual_img.get_attribute("src")
                    if src and "http" in src:
                        img_urls.add(src)
                        img_count += 1
                        if img_count >= num_images:
                            break
            except Exception as e:
                print(e)
                continue
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(scroll_pause_time)

    driver.quit()

    # Create directory for the keyword
    if not os.path.exists(keyword):
        os.makedirs(keyword)

    # Download images
    for i, url in enumerate(img_urls):
        try:
            response = requests.get(url, stream=True)
            with open(os.path.join(keyword, f"{keyword}_{i}.jpg"), "wb") as file:
                for chunk in response.iter_content(1024):
                    file.write(chunk)
        except Exception as e:
            print(f"Could not download {url}: {e}")

keywords = ["Ukraine scenery", "Ukrainian culture", "Kyiv landmarks"]

for keyword in keywords:
    download_images(keyword, num_images=100)
